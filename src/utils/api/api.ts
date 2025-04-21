import { message } from 'antd';
import axios, { GenericAbortSignal } from 'axios';
import { signOut, useSession } from 'next-auth/react';
import Cookies from 'universal-cookie';
import { JWT } from 'next-auth/jwt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

const cookies = new Cookies();
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

const getHeaders = async () => {
  return {
    Authorization: `Bearer ${await getToken()}`
  };
};

type IApiOptions = {
  prevUrl?: string;
};

const getSession = async () => {
  const { data } = await axios.get(`/api/auth/session`)
  return data
}

const getToken = async () => {
  const session = await getSession()
  const token =  jwt.sign(
    { email: session?.user.email, userId: session?.user.userId },
    process.env.NEXT_PUBLIC_JWT_SECRET || 'secretJWT',
    { expiresIn: '3m' }
  )
  return token
}

export class protectedAPI {
  public get = async <T>(url: string, params?: T, signal? : GenericAbortSignal, options?: IApiOptions) => {
    const headers = await getHeaders();
    try {
      return await axios.get(`${baseURL}${url}`, { headers, params, signal });
    } catch (error: any) {
      if (error.response?.status === 401) {
        // this.handleAuthError(options);
      } else {
        throw new Error(error)
      }
    }
  };

  public post = async <T>(url: string, body?: T, options?: IApiOptions) => {
    const headers = await getHeaders();
    try {
      return await axios.post(`${baseURL}${url}`, body, { headers });
    } catch (error: any) {
      if (error.response?.status === 401) {
        this.handleAuthError(options);
      } else {
        throw new Error(error)
      }
    }
  };

  private handleAuthError = async (options?: IApiOptions) => {
    const prevUrlParam = options?.prevUrl ? `&prevUrl=${encodeURIComponent(options.prevUrl)}` : '';
    message.warning("Unauthorized")
    // Sign out the user
    await signOut({ redirect: false });

    // Client-side redirect if `window` is available
    // if (typeof window !== 'undefined') {
    //   window.location.href = `/auth/login`;
    // }
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