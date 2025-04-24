import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust this import based on your setup
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { authOptions } from './authOptions';

const SECRET = process.env.JWT_SECRET || 'your-secret-key';

const handler =  NextAuth(authOptions);

export { handler as GET, handler as POST }