import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Resend } from 'resend';
import { render } from '@react-email/render';
// import EmailTemplate from '@/emails'; // Adjust the path to your email template

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { firstName, lastName, email, companyCode, password }: { firstName: string; lastName: string; email: string; companyCode: string; password: string } = await request.json();

  // Validate input
  if (!firstName || !lastName || !companyCode || !email || !password) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  let user;
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists.' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await prisma.user.create({
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

    console.log("Sending email to:", email);
    await resend.emails.send({
      from: 'Fvlcon <info@fvlcon.co>',
      to: [email],
      subject: 'Welcome to Fvlcon! Verify your email',
      html: "",
    });

    // Construct the absolute URL for redirection
    const redirectUrl = `${request.headers.get('origin')}/verify-email?email=${encodeURIComponent(email)}`;

    // Redirect the user to the email verification page
    return NextResponse.redirect(redirectUrl);

  } catch (error) {
    console.error("Error creating user: ", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
