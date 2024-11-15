import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Ensure this import is correct
import { NextApiRequest } from 'next';

export async function POST(req: any) {
  try {
    // Extract email and 2FA code from request body
    const { email, code } = await req;

    // Perform the query to find the TwoFactor record based on the User's email
    const twoFactorRecord = await prisma.twoFactor.findFirst({
      where: {
        user: {
          email: email,  // Filter by user's email (through the relation to the User model)
        },
        twoFactorCode: code,  // Check if the code matches
        expiresAt: {
          gt: new Date(),  // Ensure the code has not expired
        },
      },
      orderBy: {
        createdAt: 'desc',  // Order by creation time in descending order (latest first)
      },
    });

    // Check if a valid 2FA record was found
    if (!twoFactorRecord) {
      return NextResponse.json(
        { message: 'Invalid or expired code.' },
        { status: 401 }
      );
    }

    // If successful, return a success response
    return NextResponse.json(
      { message: '2FA code verified successfully!' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error verifying 2FA:', error);
    return NextResponse.json(
      { message: 'Internal server error.' },
      { status: 500 }
    );
  }
}
