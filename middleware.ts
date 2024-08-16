import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session"

const protectedRoutes = ["/dashboard", "/profile", "auth/setting", "workspaces"]
const publicRoutes = ["/auth/signin", "/auth/signup", "/"] 

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
        const res = NextResponse.redirect(new URL("/dashboard", req.nextUrl))
        res.cookies.set("prev-url", encodeURIComponent(path), { path: '/' });
        return res
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}