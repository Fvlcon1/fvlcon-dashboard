// app/api/auth/[...nextauth].ts

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from '@/lib/prisma'; // Adjust based on your setup
import dotenv from 'dotenv';

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development',

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "your-email" },
        password: { label: "Password", type: "password", placeholder: "your-password" },
        companyCode: { label: "Company Code", type: "text", placeholder: "your-company-code" }
      },
      authorize: async (credentials) => {
        try {
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
        } catch (error) {
          console.log({error})
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
          token.email = user.email;
          token.userId = user.id;  // Add userId to the token
      }
      return token;
  },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.email = token.email;
        session.user.userId = token.userId;
        session.token = token
      }
      return session;
    },
  },

  adapter: PrismaAdapter(prisma),
};
