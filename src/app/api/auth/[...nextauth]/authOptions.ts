import { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions : NextAuthOptions = {
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
        },
      })
    ],
  
    // Use JSON Web Tokens for session instead of database sessions
    session: {
      strategy: 'jwt',
      maxAge: 60 * 60 // 1h
    },
  
    secret: process.env.JWT_SECRET,
  
    jwt: {
      secret: process.env.JWT_SECRET,
    },
  
    // Customize callbacks
    callbacks: {
      jwt : async ({token, user}) => {
        // Initial sign-in, add user info to the token
        if (user) {
          token.id = user.id;
          token.name = user.name;
          token.email = user.email;
        }
        return token;
      },
      session : async ({session, token}) => {
        // Add token info to the session object
        if(session?.user){
          session.user.email = token.email
          session.user.name = token.name;
        }
        return session;
      }
    },
  
    adapter: PrismaAdapter(prisma),
    // Additional NextAuth options...
  }