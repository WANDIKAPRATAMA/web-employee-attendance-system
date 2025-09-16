// "use client";

"use client";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

export default function SessionProvider({ children }: ChildrenProps) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
