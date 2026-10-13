import { NextResponse } from "next/server";

const APP_HOSTS = new Set(["cyberai.prashantdangi.com", "cyberai.localhost"]);

export function middleware(request) {
  const headers = new Headers(request.headers);
  const host = (request.headers.get("host") || "").split(":")[0].toLowerCase();
  const { pathname, search } = request.nextUrl;
  headers.set("x-pathname", pathname);
  headers.set("x-search", search);

  if (!APP_HOSTS.has(host)) {
    if (pathname === "/cyberai" || pathname.startsWith("/cyberai/")) {
      const dest = pathname === "/cyberai" ? "/" : pathname.slice("/cyberai".length) || "/";
      const url = request.nextUrl.clone();
      url.pathname = dest;
      url.search = search;
      if (host === "localhost" || host === "127.0.0.1" || host.endsWith(".localhost")) {
        url.hostname = "cyberai.localhost";
      } else {
        url.protocol = "https:";
        url.hostname = "cyberai.prashantdangi.com";
        url.port = "";
      }
      return NextResponse.redirect(url);
    }
    return NextResponse.next({ request: { headers } });
  }

  headers.set("x-cyberai-app", "1");
  const url = request.nextUrl.clone();
  if (pathname === "/robots.txt") {
    url.pathname = "/cyberai/robots";
    return NextResponse.rewrite(url, { request: { headers } });
  }
  if (pathname === "/sitemap.xml") {
    url.pathname = "/cyberai/sitemap";
    return NextResponse.rewrite(url, { request: { headers } });
  }
  if (pathname === "/cyberai" || pathname.startsWith("/cyberai/")) {
    url.pathname = pathname === "/cyberai" ? "/" : pathname.slice("/cyberai".length) || "/";
    return NextResponse.redirect(url);
  }
  url.pathname = pathname === "/" ? "/cyberai" : `/cyberai${pathname}`;
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|assets/|resume.pdf|.*\\..*).*)",
    "/sitemap.xml",
    "/robots.txt"
  ]
};
