/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["cyberai.localhost"],
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/services.html", destination: "/services", permanent: true },
      { source: "/practice.html", destination: "/practice", permanent: true },
      { source: "/courses.html", destination: "/practice", permanent: true },
      { source: "/courses", destination: "/practice", permanent: false },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/cyberai.html", destination: "/cyberai", permanent: true },
      { source: "/blog.html", destination: "/blog", permanent: true },
      {
        source: "/post.html",
        has: [{ type: "query", key: "slug", value: "(?<slug>.*)" }],
        destination: "/post/:slug",
        permanent: true
      },
      { source: "/post.html", destination: "/blog", permanent: false }
    ];
  }
};

export default nextConfig;
