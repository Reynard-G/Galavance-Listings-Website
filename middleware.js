import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
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

    const test = await crypto.subtle.verify(
      "HMAC",
      secret,
      Buffer.from(token.split(".")[2], "base64url"),
      new TextEncoder().encode(token.split(".").splice(0, 2).join("."))
    );

    if (!test) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}