import prisma from '@/lib/prisma'; 
import bcrypt from 'bcryptjs';
import { Resend } from 'resend';
import dotenv from 'dotenv';
import { unprotectedAPI } from './api';

dotenv.config();
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
const publicApi = new unprotectedAPI()

export const authrorization = async ({
    email, password, companyCode
  } : {
    email : string,
    password : string,
    companyCode : string
  }) => {
    if (!email || !password || !companyCode) return null;
  
    const user = await publicApi.post("/auth/login", {
      email : "princenedjoh5@gmail.com",
      password : "Password000!",
      companyCode : "123"
    })
    if (user) return user
    return null
  }