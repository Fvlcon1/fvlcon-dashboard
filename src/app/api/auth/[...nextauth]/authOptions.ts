// app/api/auth/[...nextauth].ts

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from '@/lib/prisma'; // Adjust based on your setup
import { Resend } from 'resend'; // Assuming you're using Resend for sending emails
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

const setTokenCookie = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set('token', token);
};

export const authOptions: NextAuthOptions = {
  debug: true,

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "your-email" },
        password: { label: "Password", type: "password", placeholder: "your-password" },
        companyCode: { label: "Company Code", type: "text", placeholder: "your-company-code" }
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password || !credentials.companyCode) {
          return null;
        }

        // Find the user with matching email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // Check if user exists, company code matches, and password is correct
        if (user && user.companyCode === credentials.companyCode) {
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

          if (isPasswordValid) {
            // Step 1: Generate a 2FA code
            const twoFactorCode = Math.floor(100000 + Math.random() * 900000).toString();

            // Step 2: Save the 2FA code in the database with an expiration time
            const twoFactorRecord = await prisma.twoFactor.create({
              data: {
                userId: user.id,
                twoFactorCode: twoFactorCode,
                expiresAt: new Date(Date.now() + 5 * 60 * 1000), // Code expires after 5 minutes
              },
            });

            // Step 3: Send the 2FA code to the user via email
            await resend.emails.send({
              from: 'Fvlcon <info@fvlcon.co>',
              to: [user.email],
              subject: 'Your 2FA Code',
              html: `<p>Your 2FA code is: <strong>${twoFactorCode}</strong></p>`,
            });

            // Return user information along with a flag indicating 2FA is required
            return { 
              ...user, 
              twoFactorId: twoFactorRecord.id, // Store the 2FA record ID in the session 
              twoFactorRequired: true // Indicate that 2FA verification is pending
            };
          }
        }
        return null; // Invalid credentials
      },
    })
  ],

  session: {
    strategy: 'jwt',
    maxAge: 60 * 60, // 1 hour
  },

  secret: process.env.JWT_SECRET,

  jwt: {
    secret: process.env.JWT_SECRET,
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        // If the user is logging in and requires 2FA, mark them as requiring 2FA
        token.twoFactorRequired = user.twoFactorRequired;
        token.twoFactorId = user.twoFactorId;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.email = token.email;
        session.user.userId = token.userId;
        session.user.twoFactorRequired = token.twoFactorRequired; // Track the 2FA status
      }
      return session;
    }
  },

  adapter: PrismaAdapter(prisma),
};
