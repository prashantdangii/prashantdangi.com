export const LINKS = {
  linkedin: "https://www.linkedin.com/in/prashant-dangii/",
  x: "https://x.com/prashantdangii",
  github: "https://github.com/prashantdangii",
  upwork: "https://www.upwork.com/freelancers/~01afc8350492e022fe",
  toptal: "https://www.toptal.com/developers/resume/prashant-dangi",
  skool: "https://www.skool.com/prashantdangi",
  discord: "https://discord.gg/prashantdangi",
  youtube: "https://www.youtube.com/@prashantdangii",
  email: "prxshantdangi@gmail.com"
};

export function cyberaiHref(host) {
  const raw = host || "";
  const name = raw.split(":")[0].toLowerCase();
  if (name === "localhost" || name === "127.0.0.1" || name.endsWith(".localhost")) {
    const port = raw.includes(":") ? raw.slice(raw.indexOf(":")) : "";
    return `http://cyberai.localhost${port}`;
  }
  return "https://cyberai.prashantdangi.com";
}

export function pageId(path) {
  if (!path || path === "/") return "home";
  if (path === "/blog" || path.startsWith("/blog/") || path.startsWith("/post")) return "archives";
  if (path === "/courses" || path.startsWith("/courses/")) return "practice";
  return path.replace(/^\//, "").split("/")[0];
}
