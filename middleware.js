import { NextResponse } from "next/server";

export function middleware(request) {
  const headers = new Headers(request.headers);
  headers.set("x-pathname", request.nextUrl.pathname);
  headers.set("x-search", request.nextUrl.search);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|assets/|resume.pdf|.*\\..*).*)"]
};
