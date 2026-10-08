"use client";

import { useEffect, useState } from "react";

function norm(value) {
  return String(value || "").trim().replace(/\s+/g, " ").toLowerCase();
}

function visibleBlocks(step) {
  if (!step.labs?.length) return step.blocks;
  const out = [];
  let skipList = false;
  for (const block of step.blocks) {
    if (block.type === "p" && /^in the lab/i.test(block.text)) {
      skipList = true;
      continue;
    }
    if (skipList && block.type === "ul") {
      skipList = false;
      continue;
    }
    skipList = false;
    out.push(block);
  }
  return out;
}

function Blocks({ blocks }) {
  return blocks.map((block, i) => {
    if (block.type === "ul") {
      return (
        <ul key={i}>
          {block.items.map((item, n) => <li key={n}>{item}</li>)}
        </ul>
      );
    }
    return <p key={i}>{block.text}</p>;
  });
}

function Quiz({ quiz, picked, onPick }) {
  return (
    <div className="check">
      <p className="label">// check yourself</p>
      <p>{quiz.q}</p>
      <div className="qopts">
        {quiz.options.map((option, n) => {
          const answered = picked != null;
          const chosen = picked === n;
          const right = n === quiz.ok;
          const cls = answered && right ? "qopt ok" : answered && chosen ? "qopt bad" : "qopt";
          return (
            <button key={option.text} type="button" className={cls} disabled={answered} onClick={() => onPick(n)}>
              {option.text}
            </button>
          );
        })}
      </div>
      {picked != null ? <p className="qwhy">{quiz.options[picked].why}</p> : null}
    </div>
  );
}

function Lab({ items, checked, onToggle }) {
  return (
    <div className="check">
      <p className="label">// lab</p>
      <ul className="chk">
        {items.map((item, n) => (
          <li key={item}>
            <label>
              <input type="checkbox" checked={!!checked[n]} onChange={() => onToggle(n)} />
              <span>{item}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Terminal({ term, done, onDone }) {
  const [lines, setLines] = useState(() => [{ text: term.welcome || "Type help.", cls: "" }]);
  const [value, setValue] = useState("");
  const [cwd, setCwd] = useState("home");
  const prompt = term.kind === "nav" ? (cwd === "lab" ? "lab@shell:~/lab$" : "lab@shell:~$") : (term.prompt || "lab@shell:~$");

  function write(list, text, cls) {
    return text ? [...list, { text, cls }] : list;
  }

  function mark(command, only) {
    const tasks = term.taskCmds || {};
    Object.keys(tasks).forEach((id) => {
      if (only && id !== only) return;
      if (tasks[id].some((alt) => norm(alt) === command)) onDone(id);
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    const raw = value;
    const command = norm(raw);
    setValue("");
    if (!command) return;
    let next = [...lines, { text: `${prompt} ${raw}`, cls: "cmd" }];

    if (term.kind === "nav") {
      if (command === "help") next = write(next, "Commands: ls · ls -la · cd lab · cd .. · pwd · clear", "ok");
      else if (command === "clear") next = [{ text: term.welcome || "Home directory. Type help.", cls: "" }];
      else if (command === "pwd") next = write(next, cwd === "home" ? "/home/lab" : "/home/lab/lab", "ok");
      else if (command === "cd lab" || command === "cd ~/lab" || command === "cd ./lab") {
        if (cwd === "lab") next = write(next, "already in lab", "err");
        else { setCwd("lab"); mark(command, "cd"); }
      } else if (command === "cd .." || command === "cd ~" || command === "cd") setCwd("home");
      else if (command === "ls" || command === "ls -la" || command === "ls -l" || command === "ls -al") {
        const long = command.includes("-l");
        next = write(next, cwd === "home"
          ? (long ? "drwxr-xr-x  lab\n-rw-r--r--  README" : "lab  README")
          : (long ? "drwxr-xr-x  .hidden\n-rw-r--r--  auth.log\n-rw-r--r--  notes.txt\n-rw-r--r--  tool.sh" : "auth.log  notes.txt  tool.sh  .hidden"), "ok");
        mark(command, cwd === "home" ? "ls" : "lslab");
      } else next = write(next, `command not found: ${raw} — try help`, "err");
      setLines(next);
      return;
    }

    if (command === "clear") {
      setLines([{ text: term.welcome || "Type help.", cls: "" }]);
      return;
    }
    if (command === "help") {
      setLines(write(next, term.help || Object.keys(term.cmds || {}).join(" · "), "ok"));
      return;
    }
    const cmds = term.cmds || {};
    const key = Object.keys(cmds).find((item) => norm(item) === command);
    if (!key) {
      setLines(write(next, `command not found: ${raw} — try help`, "err"));
      return;
    }
    setLines(write(next, cmds[key], "ok"));
    mark(command);
  }

  return (
    <div className="check">
      <p className="label">// terminal</p>
      <div className="termbox">
        <div className="term-out">
          {lines.map((line, i) => <div key={i} className={line.cls ? `term-line ${line.cls}` : "term-line"}>{line.text}</div>)}
        </div>
        <form className="term-in" onSubmit={onSubmit}>
          <span>{prompt}</span>
          <input value={value} onChange={(e) => setValue(e.target.value)} aria-label="Terminal input" autoComplete="off" spellCheck={false} />
        </form>
      </div>
      {term.tasks?.length ? (
        <ul className="term-tasks">
          {term.tasks.map((task) => <li key={task.id} className={done[task.id] ? "done" : undefined}>{task.label}</li>)}
        </ul>
      ) : null}
    </div>
  );
}

export function Walkthrough({ lesson, track, year }) {
  const [index, setIndex] = useState(0);
  const [quiz, setQuiz] = useState({});
  const [lab, setLab] = useState({});
  const [termDone, setTermDone] = useState({});
  const [ready, setReady] = useState(false);
  const step = lesson.steps[index];
  const last = lesson.steps.length - 1;
  const backHref = `/courses?track=${track.id}`;
  const storageKey = `course:${lesson.slug}`;

  useEffect(() => {
    setReady(false);
    setIndex(0);
    setQuiz({});
    setLab({});
    setTermDone({});
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
      if (saved) {
        if (Number.isInteger(saved.step)) setIndex(Math.max(0, Math.min(last, saved.step)));
        if (saved.quiz) setQuiz(saved.quiz);
        if (saved.lab) setLab(saved.lab);
        if (saved.term) setTermDone(saved.term);
      }
    } catch {
      /* storage can be blocked */
    }
    setReady(true);
  }, [storageKey, last]);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify({ step: index, quiz, lab, term: termDone }));
    } catch {
      /* ignore */
    }
  }, [ready, storageKey, index, quiz, lab, termDone]);

  useEffect(() => {
    function onKey(e) {
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight") setIndex((n) => Math.min(last, n + 1));
      if (e.key === "ArrowLeft") setIndex((n) => Math.max(0, n - 1));
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [last]);

  function pickQuiz(qi, n) {
    const key = `${index}:${qi}`;
    setQuiz((current) => current[key] != null ? current : { ...current, [key]: n });
  }

  function toggleLab(n) {
    const key = `${index}:${n}`;
    setLab((current) => ({ ...current, [key]: !current[key] }));
  }

  const labChecked = {};
  (step.labs || []).forEach((_, n) => { labChecked[n] = !!lab[`${index}:${n}`]; });

  return (
    <>
      <main className="feed" id="content">
        <a className="back" href={backHref}>../{track.name.toLowerCase()}</a>
        <article className="card">
          <p className="label">// {track.name.toLowerCase()} · {String(index + 1).padStart(2, "0")} / {String(lesson.steps.length).padStart(2, "0")}</p>
          <h2>{step.title}</h2>
          {step.desc ? <p className="lede">{step.desc}</p> : null}
          <div className="prose">
            {index === 0 && lesson.sensitive ? (
              <p>Practice this only on a lab you own, or a program whose scope you have read.</p>
            ) : null}
            <Blocks blocks={visibleBlocks(step)} />
          </div>
          {step.term ? (
            <Terminal
              key={`${lesson.slug}-${index}-${step.term.id}`}
              term={step.term}
              done={termDone[`${index}:${step.term.id}`] || {}}
              onDone={(taskId) => setTermDone((current) => ({
                ...current,
                [`${index}:${step.term.id}`]: { ...(current[`${index}:${step.term.id}`] || {}), [taskId]: true }
              }))}
            />
          ) : null}
          {step.labs?.length ? <Lab items={step.labs} checked={labChecked} onToggle={toggleLab} /> : null}
          {(step.quiz || []).map((item, qi) => (
            <Quiz key={item.q} quiz={item} picked={quiz[`${index}:${qi}`]} onPick={(n) => pickQuiz(qi, n)} />
          ))}
          <div className="tags step-jump" aria-label="Steps">
            {lesson.steps.map((item, n) => (
              <button
                key={item.title}
                type="button"
                className="tag"
                aria-current={n === index ? "step" : undefined}
                onClick={() => setIndex(n)}
              >
                {String(n + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
          <div className="actions">
            <button className="btn" type="button" disabled={index === 0} onClick={() => setIndex((n) => n - 1)}>Back</button>
            {index < last ? (
              <button className="btn btn-fill" type="button" onClick={() => setIndex((n) => n + 1)}>Next</button>
            ) : (
              <a className="btn btn-fill" href={backHref}>Done</a>
            )}
          </div>
        </article>
      </main>
      <aside className="rail" aria-label="Steps">
        <div>
          <h2>{lesson.title}</h2>
          <ul className="rail-links">
            {lesson.steps.map((item, n) => (
              <li key={item.title}>
                <button type="button" aria-current={n === index ? "step" : undefined} onClick={() => setIndex(n)}>
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <p className="quiet"><a href={backHref}>All {track.name.toLowerCase()}</a></p>
        <p className="quiet">© {year} Prashant Dangi</p>
      </aside>
    </>
  );
}
