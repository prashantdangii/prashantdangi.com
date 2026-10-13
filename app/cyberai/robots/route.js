import { SITE } from "@/lib/cyberai";

export function GET() {
  const body = `User-agent: *\nAllow: /\nDisallow: /console\n\nSitemap: ${SITE}/sitemap.xml\n`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
