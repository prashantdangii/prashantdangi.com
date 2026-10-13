import { SiteChrome } from "@/components/cyberai/SiteChrome";
import { meta } from "@/lib/cyberai";
import { LINKS } from "@/lib/links";

export const metadata = meta({
  title: "Privacy",
  description: "Cyber AI privacy. Accounts, keys, and chat stay in the browser. Prompts are not uploaded. Vercel Analytics may record a page view.",
  path: "/privacy"
});

export default function PrivacyPage() {
  return (
    <SiteChrome active="/privacy">
      <main id="content" className="cai-wrap cai-page cai-prose">
        <p className="cai-kicker">Privacy</p>
        <h1>Privacy</h1>
        <p>This preview keeps the account on the device you used to create it. There is no account database behind the form.</p>
        <h2>What stays in the browser</h2>
        <p>Email, a password hash, API keys, workspace names, referral code, and the chat transcript. The transcript uses session storage for the tab. The rest uses local storage. Clearing site data removes them.</p>
        <h2>What is not collected</h2>
        <p>Prompts are not uploaded, because chat does not call a model. Card numbers, wallets, and government ids are not collected. The billing page has no payment form.</p>
        <h2>Page views</h2>
        <p>The site loads Vercel Analytics, which may record that a page was opened. It does not receive your password or your keys.</p>
        <h2>Contact</h2>
        <p>Privacy questions go to <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>.</p>
      </main>
    </SiteChrome>
  );
}
