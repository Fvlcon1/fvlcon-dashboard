import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust this import based on your setup
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Store your secret key in a .env file for security

const handler =  NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "email", type: "text", placeholder: "your-username" },
        password: { label: "password", type: "password", placeholder: "your-password" }
      },
      authorize : async (credentials) => {
        if(!credentials?.email || !credentials.password){
          console.log({credentials})
          return null
        }
        // Replace this with your own logic to find the user
        const user = await prisma.user.findUnique({
          where: { email : credentials.email }
        });

        // If user exists and passwords match, return user
        if (user && await bcrypt.compare(credentials?.password, user.password)) { // Ideally, you should hash passwords
          return user;
        } else {
          // Return null if user is not found or password doesn't match
          return null;
        }
      }
    })
  ],
  adapter: PrismaAdapter(prisma),
  // Additional NextAuth options...
});

export { handler as GET, handler as POST }