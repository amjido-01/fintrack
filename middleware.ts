import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session"

const protectedRoutes = ["/dashboard"]
const publicRoutes = ["/signin", "signup", "/"] 

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtected = protectedRoutes.includes(path)
    const isPublic = publicRoutes.includes(path);

    const sessionToken = req.cookies.get("next-auth.session-token")?.value;
    const session = await decrypt(sessionToken)

    if (isProtected && !session) {
        return NextResponse.redirect(new URL('auth/signin', req.nextUrl))
      }

    if (isPublic && session && !req.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}