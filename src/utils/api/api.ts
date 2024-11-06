import axios from 'axios';
import { signOut } from 'next-auth/react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const baseURL = "http://localhost:5001";

const getHeaders = () => {
  return {
    Authorization: `Bearer ${cookies.get('token')}`
  };
};

type IApiOptions = {
  prevUrl?: string;
};

export class protectedAPI {
  public get = async <T>(url: string, params?: T, options?: IApiOptions) => {
    const headers = getHeaders();
    try {
      return await axios.get(`${baseURL}${url}`, { headers, params });
    } catch (error: any) {
      if (error.response?.status === 401) {
        this.handleAuthError(options);
      } else {
        throw error; // Rethrow other errors
      }
    }
  };

  public post = async <T>(url: string, body?: T, options?: IApiOptions) => {
    const headers = getHeaders();
    try {
      return await axios.post(`${baseURL}${url}`, body, { headers });
    } catch (error: any) {
      if (error.response?.status === 401) {
        this.handleAuthError(options);
      } else {
        throw error; // Rethrow other errors
      }
    }
  };

  private handleAuthError = async (options?: IApiOptions) => {
    const prevUrlParam = options?.prevUrl ? `&prevUrl=${encodeURIComponent(options.prevUrl)}` : '';
    // Sign out the user
    await signOut({ redirect: false });
    // Client-side redirect if `window` is available
    if (typeof window !== 'undefined') {
      window.location.href = `/auth/login?error=Please login${prevUrlParam}`;
    }
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