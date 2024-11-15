// app/api/auth/[...nextauth].ts

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from '@/lib/prisma'; // Adjust based on your setup
import { Resend } from 'resend'; // Assuming you're using Resend for sending emails
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";

dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

const setTokenCookie = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set('token', token);
};

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development', // Debugging in development only

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "your-email" },
        password: { label: "Password", type: "password", placeholder: "your-password" },
        companyCode: { label: "Company Code", type: "text", placeholder: "your-company-code" }
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password || !credentials.companyCode) return null;

        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (user && user.companyCode === credentials.companyCode) {
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          if (isPasswordValid) return user;
        }
        return null;
      },
    }),
    CredentialsProvider({
      id: 'mfa',
      name: 'Mfa',
      credentials: {
        userId: { label: "userId", type: "text" },
        email: { label: "email", type: "text" },
      },
      authorize: async (credentials) => {
        if (!credentials?.userId || !credentials.email) return null;

        const twoFactorCode = Math.floor(100000 + Math.random() * 900000).toString();

        try {
          await prisma.twoFactor.create({
            data: {
              userId: credentials.userId,
              twoFactorCode,
              expiresAt: new Date(Date.now() + 5 * 60 * 1000),
            },
          });

          await resend.emails.send({
            from: 'Fvlcon <info@fvlcon.co>',
            to: [credentials.email],
            subject: 'Your 2FA Code',
            html: `<p>Your 2FA code is: <strong>${twoFactorCode}</strong></p>`,
          });
        } catch (err) {
          console.error('Error in MFA flow:', err);
          throw new Error('Error generating or sending 2FA code');
        }

        return null;
      },
    }),
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
        token.email = user.email;
        token.userId = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.email = token.email;
        session.user.userId = token.userId;
      }
      return session;
    },
  },

  adapter: PrismaAdapter(prisma),
};