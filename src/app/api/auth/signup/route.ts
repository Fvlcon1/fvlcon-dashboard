// app/api/auth/signup/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: Request) {
  const { firstName, lastName, email, companyCode, password } = await request.json();

  // Log received data to debug missing fields
  console.log("Received data:", { firstName, lastName, email, companyCode, password });

  // Validate input
  if (!firstName || !lastName || !companyCode || !email || !password) {
    return NextResponse.json({ error: 'All fields are required.', receivedData: { firstName, lastName, email, companyCode, password } }, { status: 400 });
  }

  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists.' }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        companyCode,
        password: hashedPassword,
      },
    });
    console.log("User created with ID:", user.id);

    // Create a verification record
    const verification = await prisma.verification.create({
      data: {
        userId: user.id,
        verificationCode,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
      },
    });
    if (!verification) {
      await prisma.user.delete({ where: { id: user.id } });
      throw new Error("Failed to create verification record.");
    }

    // Send the email
    console.log("Sending email to:", email);
    await resend.emails.send({
      from: 'Fvlcon <info@fvlcon.co>',
      to: [email],
      subject: 'Welcome to Fvlcon! Verify your email',
      html: `<p>Your verification code is: <strong>${verificationCode}</strong></p>`,
    });

    // Respond with success
    return NextResponse.json({ message: 'Account created successfully', data: user }, { status: 201 });

  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
