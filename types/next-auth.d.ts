import "next-auth"

declare module "next-auth" {

  interface Session {
    user: {
        name: string
        email: string
        role: string
        id: string
        image: string
        username: string
    }
  }

}

declare module "next-auth/jwt" {

  interface JWT {
    user: {
        name: string
        email: string
        role: string
        id: string
        image: string
        username: string
    }
  }
}


import { User as NextAuthUser, AdapterUser as NextAuthAdapterUser } from "next-auth";

declare module "next-auth" {
  interface User extends NextAuthUser {
    role?: string;
  }

  interface AdapterUser extends NextAuthAdapterUser {
    role?: string;
  }
}