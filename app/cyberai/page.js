import { headers } from "next/headers";
import { CyberAI } from "@/components/CyberAI";
import { LINKS, cyberaiHref } from "@/lib/links";
import { MODELS } from "@/lib/models";

const FOR = [
  "Cybersecurity professionals",
  "Red teamers",
  "Security researchers",
  "Bug bounty hunters"
];

export const metadata = {
  title: "CyberAI — Prashant Dangi",
  description: "CyberAI is under construction. Pick a cybersecurity model. The chat is not fully functional yet."
};

export default async function CyberAIPage() {
  const h = await headers();
  const app = h.get("x-cyberai-app") === "1";
  if (app) return <CyberAI mode="app" />;

  const chat = cyberaiHref(h.get("host"));
  const year = new Date().getFullYear();
  return (
    <>
      <CyberAI chatHref={chat} />
      <aside className="rail rail-cyber" aria-label="Models">
        <div className="rail-scroll">
        <a className="btn btn-fill api-key" href={chat} target="_blank" rel="noopener noreferrer">Open chat</a>
        <a className="btn api-key" href={`mailto:${LINKS.email}?subject=CyberAI%20API%20key`}>Get API key</a>
        <div>
          <h2>Models</h2>
          <a className="hf" href="https://huggingface.co/models?search=cybersecurity" target="_blank" rel="noopener">Hugging Face cybersecurity models</a>
          <ul className="model-list">
            {MODELS.map((model) => (
              <li key={model.name}>
                <a href={model.href} target="_blank" rel="noopener">
                  <strong>{model.name}</strong>
                  <span>{model.note}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>For</h2>
          <div className="tags">
            {FOR.map((name) => <span className="tag" key={name}>{name}</span>)}
          </div>
        </div>
        </div>
        <p className="quiet rail-foot">© {year} Prashant Dangi</p>
      </aside>
    </>
  );
}
