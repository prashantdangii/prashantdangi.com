import { NextResponse } from "next/server";

const APP_HOSTS = new Set(["cyberai.prashantdangi.com", "cyberai.localhost"]);

export function middleware(request) {
  const headers = new Headers(request.headers);
  const host = (request.headers.get("host") || "").split(":")[0].toLowerCase();
  headers.set("x-pathname", request.nextUrl.pathname);
  headers.set("x-search", request.nextUrl.search);
  if (!APP_HOSTS.has(host)) {
    return NextResponse.next({ request: { headers } });
  }
  headers.set("x-cyberai-app", "1");
  const url = request.nextUrl.clone();
  url.pathname = "/cyberai";
  url.search = "";
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|assets/|resume.pdf|.*\\..*).*)"]
};
