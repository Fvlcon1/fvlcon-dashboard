import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface VerificationRequest {
  email: string;
  verificationCode: string;
}

export async function POST(request: Request) {
  try {
    const { email, verificationCode }: VerificationRequest = await request.json();

    console.log("Received email:", email);
    console.log("Received verificationCode:", verificationCode);

    if (!email || !verificationCode) {
      return NextResponse.json({ error: 'Email and verification code are required.' }, { status: 400 });
    }

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: { verifications: true }, // Include all verification records
    });

    console.log("User found:", user);

    // Check if user exists and has verifications
    if (!user || user.verifications.length === 0) {
      return NextResponse.json({ error: 'Invalid verification code.' }, { status: 400 });
    }

    // Get the most recent verification record
    const latestVerification = user.verifications[user.verifications.length - 1]; // Assuming the latest is the last in the array

    // Check if the verification code matches
    if (latestVerification.verificationCode !== verificationCode) {
      return NextResponse.json({ error: 'Invalid verification code.' }, { status: 400 });
    }

    // Check if the verification code has expired
    if (new Date() > latestVerification.expiresAt) {
      return NextResponse.json({ error: 'Verification code has expired.' }, { status: 400 });
    }

    // Update user's email verification status
    const updatedUser = await prisma.user.update({
      where: { id: user.id }, // Update user by ID
      data: { emailVerified: true },
    });

    // Delete the verification record after successful verification
    await prisma.verification.delete({
      where: { id: latestVerification.id },
    });

    return NextResponse.json({ message: 'Email verified successfully!', user: updatedUser });
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json({ error: 'Internal Server Error.' }, { status: 500 });
  }
}
