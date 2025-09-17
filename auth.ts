// lib/services/next-auth-service.ts

import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import NextAuth, { NextAuthConfig } from "next-auth";
import { signInAction, signOutAction } from "@/internal/actions/auth-action";
import { cookies } from "next/headers";

const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        deviceId: { label: "Device ID", type: "text" },
        fullName: { label: "Full Name", type: "text" }, // Used for signup
        action: { label: "Action", type: "text" }, // 'login' or 'signup'
      },

      async authorize(credentials, request: Request) {
        if (!credentials?.action) {
          throw new Error("Action is required");
        }

        try {
          if (credentials.action === "login") {
            if (!credentials.email || !credentials.password) {
              throw new Error("Email and password are required for login");
            }

            const response = await signInAction(
              {
                email: credentials.email as string,
                password: credentials.password as string,
              },
              credentials.deviceId as string
            );
            const data = response?.payload.data; // Assuming this is SigninResponse
            console.log("🚀 ~ authorize ~ data:", data?.user);

            if (response.status !== "success" || !data) {
              throw new Error(
                JSON.stringify({
                  message: response.message,
                  errors: response.payload.errors,
                })
              );
            }

            return {
              id: data.user.id,
              email: data.user.full_name,
              name: data.user.full_name, // Use Email as name, since full_name isn't in UserResponse
              role: data.user.application_role?.role ?? "employee", // From JWT payload in logs; adjust if dynamic
              accessToken: data.access_token,
              refreshToken: data.refresh_token,
              accessTokenExpires: Date.now() + 3600000, // 1 hour
              user: data.user,
            };
          } else {
            throw new Error("Invalid action");
          }
        } catch (error: any) {
          let message = "An unexpected error occurred";
          let errors: string[] = [];

          if (error instanceof ZodError) {
            message = "Validation Error";
            errors = error.issues.map((e) => e.message);
          } else if (error instanceof Error) {
            try {
              const parsed = JSON.parse(error.message);
              message = parsed.message || message;
              errors = parsed.errors || errors;
            } catch {
              message = error.message || message;
            }
          } else if (
            typeof error === "object" &&
            error !== null &&
            "message" in error &&
            "errors" in error
          ) {
            message = (error as any).message;
            errors = (error as any).errors || [];
          }

          throw new Error(JSON.stringify({ message, errors }));
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // console.log("🚀 ~ jwt ~ user:", user);
      // console.log("🚀 ~ jwt ~ token:", token);

      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        // token.accessTokenExpires = user.accessToken ?? Date.now() + 3600000;
        token.user = user.user;
      }

      // Check if token is expired
      // if (Date.now() < token.accessTokenExpires) {
      //   return token;
      // }

      // // Refresh token if expired
      // return refreshAccessToken(token);
      return token;
    },
    async session({ session, token }) {
      session.user = {
        emailVerified: null,

        id: token.id,
        email: token.email,
        name: token.name,
        role: token.role,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        user: token.user,
      };

      session.accessToken = token.accessToken;
      session.error = token.error;

      return session;
    },
  },
  events: {
    // async signOut({ token }) {
    //   try {
    //     const deviceId = (await cookies()).get("device_id")?.value || "";
    //     if (!deviceId || !token.accessToken) return;
    //     await signOutAction(token.refreshToken);
    //   } catch (error) {
    //     console.error("Logout event failed", error);
    //   }
    // },
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signin",
    error: "/error",
  },
  secret: process.env.AUTH_SECRET,
};
// authConfig;
export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
