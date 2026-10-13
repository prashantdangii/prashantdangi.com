"use client";

import { useState } from "react";
import { GUIDE_SAMPLES } from "@/lib/cyberai";

export function CodeBlock({ label, code }) {
  const [note, setNote] = useState("Copy");

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setNote("Copied");
    } catch {
      setNote("Copy blocked");
    }
    window.setTimeout(() => setNote("Copy"), 1600);
  }

  return (
    <figure className="cai-code">
      <figcaption>
        <span>{label}</span>
        <button type="button" onClick={onCopy}>{note}</button>
      </figcaption>
      <pre><code>{code}</code></pre>
    </figure>
  );
}

export function GuideTabs() {
  const [index, setIndex] = useState(0);
  const item = GUIDE_SAMPLES[index];
  return (
    <div className="cai-tabs">
      <div role="tablist" aria-label="Client samples">
        {GUIDE_SAMPLES.map((sample, n) => (
          <button
            key={sample.label}
            type="button"
            role="tab"
            aria-selected={n === index}
            onClick={() => setIndex(n)}
          >
            {sample.label}
          </button>
        ))}
      </div>
      <CodeBlock label={item.file} code={item.code} />
    </div>
  );
}
