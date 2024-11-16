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

const setTokenCookie = async (token : string) => {
  const cookieStore = await cookies()
  cookieStore.set('token', token)
}

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
  
        const user = await prisma.user.findUnique({ where: { email : credentials.email } });
        if (user && user.companyCode === credentials.companyCode) {
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          if (isPasswordValid){
            return user
          };
          return null
        } else {
          return null
        }
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
          const signedToken = jwt.sign(
              { email: user.email, userId: user.id },
              process.env.JWT_SECRET || 'secretJWT',
              { expiresIn: '1h' }
          );
          await setTokenCookie(signedToken);
          token.email = user.email;
          token.userId = user.id;  // Add userId to the token
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