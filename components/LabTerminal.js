"use client";

import { useEffect, useRef, useState } from "react";
import { runCommand, shellPrompt } from "@/lib/shell";

const COMMANDS = ["ls", "cd", "cat", "pwd", "whoami", "hostname", "id", "uname", "echo", "clear", "help"];

function namesAt(tree, cwd) {
  let node = tree;
  for (const part of cwd) node = node.dirs[part];
  if (!node) return [];
  return node.order.filter((name) => node.dirs[name] || node.files[name] != null);
}

export function LabTerminal({ tree, start }) {
  const initial = start && tree.dirs[start] ? [start] : [];
  const [cwd, setCwd] = useState(initial);
  const [lines, setLines] = useState(() => ["Last login: Mon Oct 12 14:12:00 on tty1", ""]);
  const [text, setText] = useState("");
  const [history, setHistory] = useState([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const draftRef = useRef("");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, text, cwd]);

  function complete(value) {
    const match = value.match(/^(.*\s)?(\S*)$/);
    const lead = match?.[1] || "";
    const token = match?.[2] || "";
    const head = lead.trim();
    const pool = head ? [...namesAt(tree, cwd), "..", "~"] : COMMANDS;
    const hits = pool.filter((name) => name.startsWith(token));
    if (hits.length === 1) return lead + hits[0] + (head ? "" : " ");
    return value;
  }

  function submit(raw) {
    const value = raw.replace(/\s+$/, "");
    const result = runCommand(tree, cwd, value);
    const shown = value ? [`${shellPrompt(cwd)} ${value}`] : [shellPrompt(cwd)];
    setLines((list) => result.clear ? [] : [...list, ...shown, ...result.lines]);
    setCwd(result.cwd);
    setText("");
    draftRef.current = "";
    setCursor(-1);
    if (value.trim()) setHistory((list) => [...list, value]);
  }

  function onKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      submit(text);
      return;
    }
    if (event.key === "Tab") {
      event.preventDefault();
      setText(complete(text));
      return;
    }
    if (event.key === "l" && event.ctrlKey) {
      event.preventDefault();
      setLines([]);
      return;
    }
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      if (!history.length) return;
      event.preventDefault();
      if (event.key === "ArrowUp") {
        const next = cursor < 0 ? history.length - 1 : Math.max(0, cursor - 1);
        if (cursor < 0) draftRef.current = text;
        setCursor(next);
        setText(history[next]);
      } else if (cursor >= 0) {
        const next = cursor + 1;
        if (next >= history.length) {
          setCursor(-1);
          setText(draftRef.current);
        } else {
          setCursor(next);
          setText(history[next]);
        }
      }
    }
  }

  return (
    <main
      className="tty"
      id="content"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="tty-scroll" ref={scrollRef}>
        {lines.map((line, i) => (
          <div className={line.startsWith("bash:") || line.startsWith("ls:") || line.startsWith("cat:") ? "tty-err" : "tty-out"} key={i}>{line || " "}</div>
        ))}
        <form className="tty-in" onSubmit={(event) => { event.preventDefault(); submit(text); }}>
          <span className="tty-prompt">{shellPrompt(cwd)} </span>
          <input
            ref={inputRef}
            value={text}
            spellCheck={false}
            autoCapitalize="none"
            autoCorrect="off"
            aria-label="Terminal"
            onChange={(event) => { setText(event.target.value); setCursor(-1); }}
            onKeyDown={onKeyDown}
          />
        </form>
      </div>
    </main>
  );
}
