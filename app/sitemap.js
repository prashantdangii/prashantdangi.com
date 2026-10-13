import { lessons } from "@/lib/courses";
import { PUBLIC_ROUTES, SITE } from "@/lib/cyberai";
import { getPosts } from "@/lib/posts";

export default function sitemap() {
  const posts = getPosts().map((p) => ({
    url: `https://prashantdangi.com/post/${p.slug}`,
    priority: p.kind === "writeup" ? 0.5 : 0.8
  }));
  return [
    { url: "https://prashantdangi.com/", priority: 1 },
    { url: "https://prashantdangi.com/resume.pdf", priority: 0.8 },
    { url: "https://prashantdangi.com/blog", priority: 0.9 },
    { url: "https://prashantdangi.com/cyberai", priority: 0.9 },
    { url: "https://prashantdangi.com/services", priority: 0.8 },
    { url: "https://prashantdangi.com/practice", priority: 0.8 },
    { url: "https://prashantdangi.com/courses", priority: 0.8 },
    ...lessons.map((lesson) => ({
      url: `https://prashantdangi.com/courses/${lesson.slug}`,
      priority: 0.6
    })),
    { url: "https://prashantdangi.com/contact", priority: 0.8 },
    ...posts,
    ...PUBLIC_ROUTES.map(([path, priority]) => ({
      url: path === "/" ? SITE : `${SITE}${path}`,
      priority: Number(priority)
    }))
  ];
}
