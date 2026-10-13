import { SiteChrome } from "@/components/cyberai/SiteChrome";
import { meta } from "@/lib/cyberai";
import { LINKS } from "@/lib/links";

export const metadata = meta({
  title: "Affiliates",
  description: "Cyber AI affiliates. Share a signup link, and referred accounts in this browser are counted. Payout rules publish when billing is connected.",
  path: "/affiliates"
});

export default function AffiliatesPage() {
  const mail = `mailto:${LINKS.email}?subject=Cyber%20AI%20affiliates`;
  return (
    <SiteChrome active="/affiliates">
      <main id="content" className="cai-wrap cai-page">
        <p className="cai-kicker">Affiliates</p>
        <h1>Introduce a team. The share comes with billing.</h1>
        <p className="cai-lede">Create an account, copy the referral link from the console, and send it to someone who wants the lineup. Accounts that sign up with your code are counted in this browser.</p>
        <div className="cai-grid-3">
          <article className="cai-card">
            <h2>1. Get the link</h2>
            <p>The referrals page builds a code from your email and a signup URL that carries it.</p>
          </article>
          <article className="cai-card">
            <h2>2. They create an account</h2>
            <p>The code is stored on their local account. It does not set a cookie on a server, because there is no account server yet.</p>
          </article>
          <article className="cai-card">
            <h2>3. The share waits</h2>
            <p>A percentage of referred spend will be published when invoices exist. Nothing is paid out from this preview.</p>
          </article>
        </div>
        <p className="cai-lede"><a href={mail}>Apply by email</a> if you want the program noted before billing opens.</p>
      </main>
    </SiteChrome>
  );
}
