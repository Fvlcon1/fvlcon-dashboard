import { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from '@/lib/prisma'; // Adjust this import based on your setup
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'

const setTokenCookie = async (token : string) => {
  const cookieStore = await cookies()
  cookieStore.set('token', token)
}

export const authOptions: NextAuthOptions = {
  providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
              email: { label: "email", type: "text", placeholder: "your-username" },
              password: { label: "password", type: "password", placeholder: "your-password" }
          },
          authorize: async (credentials) => {
              if (!credentials?.email || !credentials.password) {
                  return null;
              }

              const user = await prisma.user.findUnique({
                  where: { email: credentials.email }
              });

              if (user && await bcrypt.compare(credentials.password, user.password)) {
                  return user;
              } else {
                  return null;
              }
          },
      })
  ],

  session: {
      strategy: 'jwt',
      maxAge: 60 * 60 // 1h
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
              session.user.userId = token.userId; // Attach userId to session
          }
          return session;
      }
  },

  adapter: PrismaAdapter(prisma),
};