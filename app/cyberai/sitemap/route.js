import { PUBLIC_ROUTES, SITE } from "@/lib/cyberai";

export function GET() {
  const body = PUBLIC_ROUTES.map(([path]) => {
    const loc = path === "/" ? SITE : `${SITE}${path}`;
    return `<url><loc>${loc}</loc></url>`;
  }).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>\n`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
}
