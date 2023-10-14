import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Allow access to /login and /admin with a valid token, other than /api/login
  if (pathname.startsWith('/admin') || pathname.startsWith('/api') && !pathname.startsWith('/api/login')) {
    const token = req.cookies.get('token')?.value;

    if (!token) return NextResponse.redirect(new URL('/login', req.url));

    const secret = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(process.env.JWT_SECRET),
      {
        name: "HMAC",
        hash: { name: "SHA-256" },
      },
      false,
      ["verify"]
    );

    const verified = await crypto.subtle.verify(
      "HMAC",
      secret,
      Buffer.from(token.split(".")[2], "base64url"),
      new TextEncoder().encode(token.split(".").splice(0, 2).join("."))
    );

    if (!verified) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}