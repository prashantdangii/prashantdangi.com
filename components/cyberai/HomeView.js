import Link from "next/link";
import { CodeBlock } from "@/components/cyberai/CodeBlock";
import { SiteChrome } from "@/components/cyberai/SiteChrome";
import { CURL_TEXT, FAQ, HOME_DESCRIPTION, MODELS, OPENCODE_TEXT, SITE, USE_CASES, jsonLd } from "@/lib/cyberai";

const structured = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Cyber AI",
      url: SITE,
      description: HOME_DESCRIPTION,
      publisher: { "@type": "Person", name: "Prashant Dangi", url: "https://prashantdangi.com" }
    },
    {
      "@type": "SoftwareApplication",
      name: "Cyber AI",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      url: SITE,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Creating an account is free. Usage billing is not connected yet."
      }
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a }
      }))
    }
  ]
};

export function HomeView() {
  return (
    <SiteChrome active="/" notice>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structured) }} />
      <main id="content">
        <section className="cai-wrap cai-hero">
          <div>
            <p className="cai-kicker"><i className="cai-pulse" aria-hidden="true" /> OpenAI-compatible</p>
            <h1>Security models on the API you already call.</h1>
            <p className="cai-lede">Cyber AI hosts a lineup for cybersecurity work. The wire format is chat completions. You bring a key. The base URL points here.</p>
            <div className="cai-cta">
              <Link className="cai-btn cai-btn-fill" href="/signup">Create an account</Link>
              <Link className="cai-btn" href="/docs">Read the API</Link>
            </div>
          </div>
          <div className="cai-stage">
            <div className="cai-orbit-wrap" aria-hidden="true">
              <div className="cai-orbit"><i /></div>
              <div className="cai-orbit cai-orbit-2"><i /></div>
            </div>
            <div className="cai-scan" aria-hidden="true" />
            <div className="cai-trace">
              <header><span>Trace</span><span>auth.step-up</span></header>
              <ol>
                <li>
                  <time>00:01</time>
                  <p>Request. Three step-up failures from a new ASN. Draft the first checks.</p>
                </li>
                <li>
                  <time>00:04</time>
                  <p>Match the IdP event ids. See whether those users share a recovery address or a device certificate before a firewall rule changes.</p>
                </li>
                <li>
                  <time>00:06</time>
                  <p>If the ASN is new only for them, treat it as account recovery before you block a network.</p>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section className="cai-section">
          <div className="cai-wrap">
            <p className="cai-index">01 — Work</p>
            <h2>Where a security team would use it</h2>
            <p className="cai-intro">Authorized work on systems you own or are hired to test. The console is the place you keep the key. The model is the place you send the notes.</p>
            <div className="cai-grid-3">
              {USE_CASES.map((item) => (
                <article className="cai-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cai-section" id="lineup">
          <div className="cai-wrap">
            <p className="cai-index">02 — Lineup</p>
            <h2>Five ids, one host</h2>
            <p className="cai-intro">Names follow the public models. The id is what you send in the model field. Scores are not invented here. The model card is the source for fit.</p>
            <div className="cai-grid-3">
              {MODELS.slice(0, 3).map((model) => (
                <article className="cai-model" key={model.id}>
                  <div className="cai-model-top">
                    <h3>{model.name}</h3>
                    <span>{model.maker}</span>
                  </div>
                  <p>{model.blurb}</p>
                  <div className="cai-fits">
                    <span className="cai-pill">{model.id}</span>
                    {model.fits.map((fit) => <span key={fit}>{fit}</span>)}
                  </div>
                </article>
              ))}
            </div>
            <p className="cai-intro" style={{ marginTop: 16 }}><Link href="/models">All models</Link></p>
          </div>
        </section>

        <section className="cai-section" id="call">
          <div className="cai-wrap">
            <p className="cai-index">03 — Contract</p>
            <h2>An agent config, or one curl</h2>
            <p className="cai-intro">OpenCode reads a provider block. Everything else that speaks chat completions can use the same host, path, and bearer key.</p>
            <div className="cai-split">
              <CodeBlock label="opencode.json" code={OPENCODE_TEXT} />
              <CodeBlock label="request.sh" code={CURL_TEXT} />
            </div>
          </div>
        </section>

        <section className="cai-section">
          <div className="cai-wrap">
            <div className="cai-account">
              <div>
                <p className="cai-index">04 — Account</p>
                <h2>Create the account before the balance exists.</h2>
                <p className="cai-intro">Email and a password stay in this browser until Firebase Auth replaces them. The balance stays at $0.00 until payments are connected.</p>
              </div>
              <Link className="cai-btn cai-btn-fill" href="/signup">Create an account</Link>
            </div>
          </div>
        </section>

        <section className="cai-section" id="faq">
          <div className="cai-wrap">
            <p className="cai-index">05 — Questions</p>
            <h2>What is live, and what is next</h2>
            <div className="cai-faq">
              {FAQ.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
