import { headers } from "next/headers";
import { AdFeed, AdUnit } from "@/components/AdUnit";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SiteFoot } from "@/components/SiteFoot";
import { AD_SLOTS } from "@/lib/ads";
import { cyberaiHref } from "@/lib/links";

const FOCUS = [
  "C", "Python", "Assembly (x86)", "Linux", "GitHub", "AWS", "Azure", "GCP",
  "Docker", "Kubernetes", "Terraform", "KQL", "Wiz", "Wazuh", "Splunk", "Tenable",
  "Offensive Security", "Red Team", "Application Security", "Cloud Security", "APIs",
  "Threat Modeling", "OWASP", "Incident Response", "GRC", "ISO 27001", "NIST", "AI", "LLM"
];

export default async function HomePage() {
  const year = new Date().getFullYear();
  const chat = cyberaiHref((await headers()).get("host"));
  return (
    <>
      <main className="feed" id="content">
        <a className="card latest" href="https://www.anthropic.com/news/cyber-verification-program" target="_blank" rel="noopener">
          <p className="label">// latest</p>
          <div className="latest-row">
            <svg className="anthro-mark" viewBox="0 0 24 24" aria-hidden="true">
              <g transform="rotate(22 12 12)">
                <rect x="11" y="1.5" width="2" height="21" rx="1" fill="#f2c9a0" />
                <rect x="11" y="1.5" width="2" height="21" rx="1" fill="#e07a5f" transform="rotate(45 12 12)" />
                <rect x="11" y="1.5" width="2" height="21" rx="1" fill="#c45c3e" transform="rotate(90 12 12)" />
                <rect x="11" y="1.5" width="2" height="21" rx="1" fill="#f0a07a" transform="rotate(135 12 12)" />
              </g>
            </svg>
            <div className="latest-copy">
              <div className="brand">Anthropic</div>
              <h2>Cyber Verification Program</h2>
              <p>Expanded access for security teams. Defense work, authorized red teaming, and a narrower specialized tier.</p>
              <div className="meta"><time dateTime="2026-10-06">Oct 6, 2026</time></div>
            </div>
          </div>
        </a>

        <article className="card">
          <p className="label">// about me</p>
          <p>Prashant is a cybersecurity professional specializing in offensive security, red teaming, and GRC. CEH v12 and ISO 27001 Lead Security Associate.</p>
          <p className="after">Building and experimenting with <a href={chat}>CyberAI</a> to get the exploit. No refusal.</p>
        </article>

        <AdFeed slot={AD_SLOTS.feed} />

        <NewsletterForm />
      </main>

      <aside className="rail rail-keywords" aria-label="Focus">
        <div className="rail-scroll">
          <div>
            <h2>Focus</h2>
            <div className="tags keywords">
              {FOCUS.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
            </div>
          </div>
          <AdUnit slot={AD_SLOTS.rail} className="ad-rail" />
        </div>
        <SiteFoot year={year} />
      </aside>
    </>
  );
}
