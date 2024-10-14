import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';
import { render } from '@react-email/render';
// import EmailTemplate from '@/emails'; // Adjust the path to your email template

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request : any) {
  // const { email } = await request.json();

  // // Validate input
  // if (!email) {
  //   return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
  // }

  // const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  // try {
  //   // Check if the user exists
  //   const user = await prisma.user.findUnique({
  //     where: { email },
  //   });

  //   if (!user) {
  //     return NextResponse.json({ error: 'User not found.' }, { status: 404 });
  //   }

  //   // Update the verification code in the database
  //   await prisma.verification.updateMany({
  //     where: { userId: user.id },
  //     data: {
  //       verificationCode,
  //       expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
  //     },
  //   });

  //   console.log("Sending email to:", email);
  //   await resend.emails.send({
  //     from: 'Fvlcon <info@fvlcon.co>',
  //     to: [email],
  //     subject: 'Resend: Verify your email',
  //     html: '',
  //   });

  //   return NextResponse.json({ message: 'Verification code resent successfully.' }, { status: 200 });
  // } catch (error) {
  //   console.error("Error resending verification code: ", error);
  //   return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  // } finally {
  //   await prisma.$disconnect();
  // }
}
