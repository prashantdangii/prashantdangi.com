import { GuideTabs } from "@/components/cyberai/CodeBlock";
import { SiteChrome } from "@/components/cyberai/SiteChrome";
import { meta } from "@/lib/cyberai";

export const metadata = meta({
  title: "Guides",
  description: "Use Cyber AI from OpenCode, curl, or the Python OpenAI SDK. Set the base URL, a lineup id, and the CYBERAI_API_KEY.",
  path: "/guides"
});

export default function GuidesPage() {
  return (
    <SiteChrome active="/guides">
      <main id="content" className="cai-wrap cai-page">
        <p className="cai-kicker">Guides</p>
        <h1>Put the lineup in a client</h1>
        <p className="cai-lede">Export the key, then point the client at the Cyber AI base URL. OpenCode, curl, and the Python SDK are the three paths below. Pi and any other OpenAI-compatible agent use the same host, path, and bearer key.</p>
        <GuideTabs />
        <article className="cai-prose">
          <h2>Before the client starts</h2>
          <p>Create an account, then create a key in the console. In the shell that launches the agent, set <code>CYBERAI_API_KEY</code> to that value. The samples read the variable. They do not embed a key.</p>
          <h2>Swap the lineup id</h2>
          <p>The default in the samples is <code>cai-glm</code>. Replace it with another id from the models page when you want a different model. OpenCode also wants the provider prefix <code>cyberai/</code> in the selected model string.</p>
          <h2>What you should see today</h2>
          <p>The samples are the contract. A client that sends them now will not get a completion, because the inference host is not connected. The console still lets you create the key and keep the transcript locally.</p>
        </article>
      </main>
    </SiteChrome>
  );
}
