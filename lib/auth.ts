import { prisma } from "./prisma";
import { compare } from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials?.email,
            },
          });
          
          if (!user) {
            console.log("User not found");
            return null;
          }
      
          const passwordCorrect = await compare(credentials?.password || "", user.password);
      
          if (!passwordCorrect) {
            console.log("Password is incorrect");
            return null;
          }
      
          return { id: user.id, email: user.email, name: user.name }; 
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      }      
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image
        };
      }
      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          email: token.email,
          id: token.id,
          name: token.name,
          createdAt: token.createdAt,
        },
      };
    },
  },
};