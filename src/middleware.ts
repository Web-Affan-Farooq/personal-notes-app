// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { token } from "./constants";

export const middleware = async (req: NextRequest) => {
  const userToken = req.cookies.get(token)?.value;
  const pathname = req.nextUrl.pathname;

  // Protect Admin Routes
  if (pathname.startsWith("/notes")) {
    if (!userToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Protect User Profile Routes
  else if (pathname.startsWith("/topics")) {
    if (!userToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }  
    return NextResponse.next();

};

export const config = {
  matcher: [
    "/notes/:path*",
    "/topics/:path*",
  ],
};