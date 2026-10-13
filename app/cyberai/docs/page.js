import { CodeBlock } from "@/components/cyberai/CodeBlock";
import { SiteChrome } from "@/components/cyberai/SiteChrome";
import { API_BASE, CURL_TEXT, MODELS, meta } from "@/lib/cyberai";

export const metadata = meta({
  title: "API reference",
  description: "Cyber AI API reference. OpenAI-compatible chat completions, bearer keys, lineup ids, and the errors the host will return once inference is connected.",
  path: "/docs"
});

const TOC = [
  ["#base", "Base URL"],
  ["#auth", "Auth"],
  ["#chat", "Chat completions"],
  ["#models", "Lineup ids"],
  ["#errors", "Errors"],
  ["#retention", "Retention"]
];

export default function DocsPage() {
  return (
    <SiteChrome active="/docs">
      <main id="content" className="cai-wrap cai-page">
        <p className="cai-kicker">Reference</p>
        <h1>API reference</h1>
        <p className="cai-lede">The host and path are the contract. Auth is the API key. The live host answers these routes when inference is connected. Until then, keys exist only in your browser.</p>
        <div className="cai-doc">
          <nav className="cai-doc-side" aria-label="On this page">
            {TOC.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
          </nav>
          <article className="cai-prose">
            <h2 id="base">Base URL</h2>
            <p>Point any OpenAI-compatible client at <code>{API_BASE}</code>. Chat lives at <code>/chat/completions</code> under that host.</p>
            <h2 id="auth">Auth</h2>
            <p>Send <code>Authorization: Bearer $CYBERAI_API_KEY</code>. Create the key in the console. The environment variable name used in the guides is <code>CYBERAI_API_KEY</code>.</p>
            <h2 id="chat">Chat completions</h2>
            <p>The body matches the chat completions shape: a lineup id and a messages array. A system message is optional.</p>
            <CodeBlock label="request.sh" code={CURL_TEXT} />
            <h2 id="models">Lineup ids</h2>
            <ul>
              {MODELS.map((model) => (
                <li key={model.id}><code>{model.id}</code> — {model.name}, {model.maker}</li>
              ))}
            </ul>
            <h2 id="errors">Errors</h2>
            <p>These are the statuses the host will use once it is connected.</p>
            <ul>
              <li><code>401</code> — missing or unknown key.</li>
              <li><code>402</code> — balance is empty, so the request does not run.</li>
              <li><code>400</code> — the model id is not in the lineup, or the body is not chat completions JSON.</li>
            </ul>
            <h2 id="retention">Retention</h2>
            <p>The intended policy is that prompt text is not kept after the response is sent. Today the browser never uploads the prompt, because the host is not connected.</p>
          </article>
        </div>
      </main>
    </SiteChrome>
  );
}
