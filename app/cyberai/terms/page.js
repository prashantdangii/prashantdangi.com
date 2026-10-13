import { SiteChrome } from "@/components/cyberai/SiteChrome";
import { meta } from "@/lib/cyberai";
import { LINKS } from "@/lib/links";

export const metadata = meta({
  title: "Terms",
  description: "Terms for the Cyber AI preview. The console stores an account in your browser. Inference and payments are not connected.",
  path: "/terms"
});

export default function TermsPage() {
  return (
    <SiteChrome active="/terms">
      <main id="content" className="cai-wrap cai-page cai-prose">
        <p className="cai-kicker">Terms</p>
        <h1>Terms</h1>
        <p>Cyber AI is operated by Prashant Dangi. This preview gives you a console for an OpenAI-compatible security lineup. The inference host and the payment provider are not connected.</p>
        <h2>The account</h2>
        <p>Email and a password hash are stored in your browser. That is not Firebase Auth. Do not reuse a password you care about. When Firebase Auth replaces this session, the local account does not move on its own.</p>
        <h2>Use</h2>
        <p>Use the lineup for work you are allowed to do: systems you own, or an engagement that names the target and the permission. The product does not grant permission to test someone else’s systems.</p>
        <h2>Money</h2>
        <p>Creating an account does not start a subscription. The balance shown in the console is zero. No card is charged from these pages.</p>
        <h2>Contact</h2>
        <p>Questions go to <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>.</p>
      </main>
    </SiteChrome>
  );
}
