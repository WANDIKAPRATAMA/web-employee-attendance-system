// types/next-auth.d.ts
import { UserResponse } from "@/internal/validations/user-validation";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    email: string;
    name?: string;
    role?: string;
    accessToken: string;
    refreshToken: string;
    user: UserResponse;
    error?: string;
  }

  interface Session {
    user: User;
    accessToken: string;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name?: string;
    role?: string;
    accessToken: string;
    refreshToken: string;
    user: UserResponse;
    error?: string;
    accessTokenExpires: number;
  }
}
