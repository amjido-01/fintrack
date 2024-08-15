import { decode } from "next-auth/jwt";

export async function decrypt(cookie: string | undefined) {
  if (!cookie) return null;

  const decoded = await decode({
    token: cookie,
    secret: process.env.NEXTAUTH_SECRET as string,
  });

  return decoded;
}
