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

export function pageId(path, search) {
  const view = new URLSearchParams(search || "").get("view");
  if (!path || path === "/") return "home";
  if (path === "/blog" || path.startsWith("/blog/")) {
    if (view === "writeups" || view === "archive") return view;
    return "blogs";
  }
  if (path.startsWith("/post")) return "";
  return path.replace(/^\//, "").split("/")[0];
}
