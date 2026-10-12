import { lessonsFor, tracks } from "./courses";

function labNote(lesson) {
  const lines = [lesson.title, ""];
  if (lesson.summary) lines.push(lesson.summary, "");
  lines.push("Steps");
  lesson.steps.forEach((step, i) => {
    const n = String(i + 1).padStart(2, "0");
    lines.push(`  ${n}  ${step.title}`);
  });
  lines.push("", "Read the step names, then work them on a lab you own.");
  return lines.join("\n");
}

function trackNote(track, lessons) {
  const names = lessons.map((lesson) => lesson.slug);
  const example = names[0] || "README";
  return [
    track.name,
    track.blurb,
    "",
    "Labs",
    ...names.map((name) => `  ${name}`),
    "",
    "Commands",
    "  ls",
    "  cat README",
    "  cat <lab>",
    "  cd ..",
    "  pwd",
    "",
    "Example",
    `  cat ${example}`
  ].join("\n");
}

export function labTree() {
  const dirs = {};
  const order = ["README"];
  for (const track of tracks) {
    const lessons = lessonsFor(track.id);
    const files = { README: trackNote(track, lessons) };
    const fileOrder = ["README"];
    for (const lesson of lessons) {
      files[lesson.slug] = labNote(lesson);
      fileOrder.push(lesson.slug);
    }
    dirs[track.id] = { order: fileOrder, files, dirs: {} };
    order.push(track.id);
  }
  const readme = [
    "Practice",
    "",
    "A lab shell on this page. It is not a real host.",
    "",
    "Commands",
    "  ls",
    "  cd <track>",
    "  cat README",
    "  pwd",
    "  whoami",
    "  clear",
    "  help",
    "",
    "Each track is a directory. cd into it, then cat README",
    "for the labs and the commands that work there.",
    "",
    "Example",
    "  cd foundations",
    "  cat README"
  ].join("\n");
  return {
    order,
    files: { README: readme },
    dirs
  };
}
