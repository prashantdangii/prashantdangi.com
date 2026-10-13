import Link from "next/link";
import { SiteChrome } from "@/components/cyberai/SiteChrome";
import { PLANS, meta } from "@/lib/cyberai";

export const metadata = meta({
  title: "Pricing",
  description: "Cyber AI plans: Explore, Build, and Team. Accounts are free to create. Per-token rates publish when billing is connected. Nothing is charged now.",
  path: "/pricing"
});

const ORDER = ["explore", "build", "team"];

export default function PricingPage() {
  return (
    <SiteChrome active="/pricing">
      <main id="content" className="cai-wrap cai-page">
        <p className="cai-kicker">Pricing</p>
        <h1>Free to create. Metered when billing opens.</h1>
        <p className="cai-lede">Pick a plan and it is stored with the account. Card checkout is not connected, so choosing a plan does not charge you. Per-token rates publish with the first invoice.</p>
        <div className="cai-price-grid">
          {ORDER.map((id) => {
            const plan = PLANS[id];
            return (
              <article className={id === "build" ? "cai-price is-pick" : "cai-price"} key={id}>
                <strong>{plan.name}</strong>
                <h2>{plan.keys} keys</h2>
                <p>{plan.blurb}</p>
                <Link className="cai-btn cai-btn-fill" href={`/signup?plan=${id}`}>Create an account</Link>
              </article>
            );
          })}
        </div>
        <article className="cai-prose">
          <h2>What the balance means</h2>
          <p>The console shows $0.00 until a payment provider can add credits. Chat and the API both stay paused at an empty balance. Launch credit for early accounts is noted, and it is not granted on this site yet.</p>
        </article>
      </main>
    </SiteChrome>
  );
}
