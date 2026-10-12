export function shellPrompt(cwd) {
  const path = cwd.length ? `~/${cwd.join("/")}` : "~";
  return `root@root:${path}#`;
}

function nodeAt(tree, cwd) {
  let node = tree;
  for (const part of cwd) {
    node = node.dirs[part];
    if (!node) return null;
  }
  return node;
}

function resolve(tree, cwd, raw) {
  if (raw == null || raw === "" || raw === ".") {
    return { kind: "dir", cwd: cwd.slice(), node: nodeAt(tree, cwd) };
  }
  if (raw === "~" || raw === "~/") return { kind: "dir", cwd: [] };
  let base = cwd.slice();
  let rest = raw;
  if (rest === "/") return { error: `bash: ${raw}: Permission denied` };
  if (rest.startsWith("~/")) {
    base = [];
    rest = rest.slice(2);
  } else if (rest.startsWith("/")) {
    return { error: `bash: ${raw}: No such file or directory` };
  }
  const parts = rest.split("/");
  let next = base;
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (!part || part === ".") continue;
    if (part === "..") {
      next = next.slice(0, -1);
      continue;
    }
    const here = nodeAt(tree, next);
    if (!here) return { error: `bash: ${raw}: No such file or directory` };
    const last = i === parts.length - 1;
    if (here.dirs[part]) {
      next = [...next, part];
      continue;
    }
    if (last && here.files[part] != null) {
      return { kind: "file", cwd: next, name: part, text: here.files[part] };
    }
    return { error: `bash: ${raw}: No such file or directory` };
  }
  const dir = nodeAt(tree, next);
  if (!dir) return { error: `bash: ${raw}: No such file or directory` };
  return { kind: "dir", cwd: next, node: dir };
}

function listNames(node) {
  return node.order.filter((name) => name === "README" || node.dirs[name] || node.files[name] != null);
}

function longLine(name, node) {
  const dir = Boolean(node.dirs[name]);
  const size = dir ? "4096" : String(node.files[name].length).padStart(4, " ");
  const mode = dir ? "drwxr-xr-x" : "-rw-r--r--";
  return `${mode} 1 root root ${size} Oct 12 14:12 ${name}`;
}

function ls(tree, cwd, args) {
  const flags = new Set();
  const paths = [];
  for (const arg of args) {
    if (arg.startsWith("-") && arg.length > 1) {
      for (const flag of arg.slice(1)) flags.add(flag);
    } else paths.push(arg);
  }
  const targets = paths.length ? paths : ["."];
  const blocks = [];
  for (const target of targets) {
    const hit = resolve(tree, cwd, target === "." ? "" : target);
    if (hit.error) return { lines: [`ls: cannot access '${target}': No such file or directory`], err: true };
    if (hit.kind === "file") {
      blocks.push(flags.has("l") ? longLine(hit.name, nodeAt(tree, hit.cwd)) : hit.name);
      continue;
    }
    const node = hit.node || nodeAt(tree, hit.cwd);
    const names = listNames(node);
    if (flags.has("l")) {
      const rows = [`total ${names.length}`];
      if (flags.has("a")) {
        rows.push("drwxr-xr-x 1 root root 4096 Oct 12 14:12 .");
        rows.push("drwxr-xr-x 1 root root 4096 Oct 12 14:12 ..");
      }
      for (const name of names) rows.push(longLine(name, node));
      blocks.push(rows.join("\n"));
    } else if (flags.has("a")) {
      blocks.push([".", "..", ...names].join("  "));
    } else {
      blocks.push(names.join("  "));
    }
  }
  return { lines: blocks, err: false };
}

export function runCommand(tree, cwd, raw) {
  const line = String(raw || "").trim();
  if (!line) return { cwd, lines: [], err: false, clear: false };
  const parts = line.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [];
  const argv = parts.map((part) => part.replace(/^['"]|['"]$/g, ""));
  const cmd = argv[0];
  const args = argv.slice(1);

  if (cmd === "clear") return { cwd, lines: [], err: false, clear: true };
  if (cmd === "help") {
    return {
      cwd,
      err: false,
      clear: false,
      lines: [[
        "ls [path]       list files",
        "cd <dir>        change directory",
        "cat <file>      read a file",
        "pwd             print the working directory",
        "whoami          print the user",
        "clear           clear the screen",
        "help            show this list"
      ].join("\n")]
    };
  }
  if (cmd === "pwd") {
    const path = cwd.length ? `/root/${cwd.join("/")}` : "/root";
    return { cwd, lines: [path], err: false, clear: false };
  }
  if (cmd === "whoami") return { cwd, lines: ["root"], err: false, clear: false };
  if (cmd === "hostname") return { cwd, lines: ["root"], err: false, clear: false };
  if (cmd === "id") return { cwd, lines: ["uid=0(root) gid=0(root) groups=0(root)"], err: false, clear: false };
  if (cmd === "uname") {
    const text = args.includes("-a") ? "Linux root 6.1.0-lab #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux" : "Linux";
    return { cwd, lines: [text], err: false, clear: false };
  }
  if (cmd === "echo") return { cwd, lines: [args.join(" ")], err: false, clear: false };
  if (cmd === "ls") {
    const result = ls(tree, cwd, args);
    return { cwd, lines: result.lines, err: result.err, clear: false };
  }
  if (cmd === "cd") {
    const target = args[0] ?? "~";
    if (args.length > 1) return { cwd, lines: ["bash: cd: too many arguments"], err: true, clear: false };
    const hit = resolve(tree, cwd, target);
    if (hit.error) return { cwd, lines: [`bash: cd: ${target}: No such file or directory`], err: true, clear: false };
    if (hit.kind === "file") return { cwd, lines: [`bash: cd: ${target}: Not a directory`], err: true, clear: false };
    return { cwd: hit.cwd, lines: [], err: false, clear: false };
  }
  if (cmd === "cat") {
    if (!args.length) return { cwd, lines: ["cat: missing operand"], err: true, clear: false };
    const lines = [];
    let err = false;
    for (const arg of args) {
      const hit = resolve(tree, cwd, arg);
      if (hit.error || (!hit.text && hit.kind !== "file")) {
        if (hit.kind === "dir") lines.push(`cat: ${arg}: Is a directory`);
        else lines.push(`cat: ${arg}: No such file or directory`);
        err = true;
        continue;
      }
      lines.push(hit.text);
    }
    return { cwd, lines, err, clear: false };
  }
  return { cwd, lines: [`bash: ${cmd}: command not found`], err: true, clear: false };
}
