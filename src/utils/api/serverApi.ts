import axios from 'axios';
import { signOut } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

dotenv.config();

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getSession = async () => {
  return await getServerSession(authOptions);
};

const getToken = async () => {
  const session = await getSession();
  if (!session) return null;

  const token = jwt.sign(
    { email: session.user.email, userId: session.user.userId },
    process.env.NEXT_PUBLIC_JWT_SECRET || 'secretJWT',
    { expiresIn: '3m' }
  );

  return token;
};

const getHeaders = async () => {
  const token = await getToken();
  return {
    Authorization: token ? `Bearer ${token}` : ''
  };
};

/**
 * The same as the normal api class, but this helps fetch session in server components instead of client components
 */
export class protectedAPI {
  public get = async <T>(url: string, params?: T) => {
    const headers = await getHeaders();
    try {
      return await axios.get(`${baseURL}${url}`, { headers, params });
    } catch (error: any) {
      if (error.response?.status === 401) {
        await this.handleAuthError();
      } else {
        throw error;
      }
    }
  };

  public post = async <T>(url: string, body?: T) => {
    const headers = await getHeaders();
    try {
      return await axios.post(`${baseURL}${url}`, body, { headers });
    } catch (error: any) {
      if (error.response?.status === 401) {
        await this.handleAuthError();
      } else {
        throw error;
      }
    }
  };

  private handleAuthError = async () => {
  };
}

export class unprotectedAPI {
  public get = async <T>(url: string, params?: T) => {
    return await axios.get(`${baseURL}${url}`, { params });
  };

  public post = async <T>(url: string, body?: T) => {
    return await axios.post(`${baseURL}${url}`, body);
  };
}
