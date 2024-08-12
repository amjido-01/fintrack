import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    userName?: string | null;
  }

  interface Session {
    user: {
      id: string;
      userName: string | null;
    } & DefaultSession["user"];
  }
}
