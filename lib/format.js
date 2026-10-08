export function fmtDate(s) {
  if (!s) return "";
  const p = String(s).slice(0, 10).split("-");
  if (p.length !== 3) return s;
  const d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  if (Number.isNaN(d.getTime())) return s;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function tagList(tags) {
  if (!tags) return [];
  return String(tags).split(/[·,]/).map((t) => t.trim()).filter(Boolean);
}
