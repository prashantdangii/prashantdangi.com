import { SiteFoot } from "@/components/SiteFoot";
import { LINKS } from "@/lib/links";

export const metadata = {
  title: "Privacy Policy — Prashant Dangi",
  description: "Privacy policy for prashantdangi.com, including Google AdSense, cookies, and analytics."
};

export default function PrivacyPage() {
  const year = new Date().getFullYear();
  return (
    <>
      <main className="feed" id="content">
        <p className="label">// privacy</p>
        <article className="card prose-card">
          <h1>Privacy Policy</h1>
          <p className="quiet">Last updated: October 26, 2026</p>
          <div className="prose">
            <p>
              This privacy policy describes how <strong>prashantdangi.com</strong> (“the site”, “we”)
              handles information when you visit. The site is operated by Prashant Dangi.
            </p>

            <h2>Information we collect</h2>
            <p>
              We do not require an account to read the site. We may receive standard technical data
              that browsers and hosts send automatically, such as IP address, browser type,
              device type, referring URL, and pages visited. If you email us, we receive the
              address and content you choose to send.
            </p>

            <h2>Google AdSense and advertising</h2>
            <p>
              This site uses <strong>Google AdSense</strong> to show ads. Google and its partners
              may use cookies and similar technologies to serve ads based on your prior visits to
              this site or other sites. Third-party vendors, including Google, use cookies to serve
              ads based on a user’s previous visits.
            </p>
            <p>
              Google’s use of advertising cookies enables it and its partners to serve ads to you
              based on your visit to this site and/or other sites on the Internet. You may opt out
              of personalized advertising by visiting{" "}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
                Google Ads Settings
              </a>
              . Alternatively, you can opt out of some third-party vendors’ use of cookies for
              personalized advertising at{" "}
              <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
                aboutads.info/choices
              </a>
              .
            </p>
            <p>
              For more about how Google uses data when you use partner sites, see{" "}
              <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
                How Google uses data from sites or apps that use our services
              </a>
              .
            </p>

            <h2>Cookies</h2>
            <p>
              Cookies are small files stored on your device. The site and third parties (including
              Google AdSense and analytics providers) may set cookies to remember preferences,
              measure traffic, and deliver or measure ads. You can control cookies through your
              browser settings. Blocking cookies may affect some site features and ad personalization.
            </p>

            <h2>Analytics</h2>
            <p>
              We use <strong>Vercel Analytics</strong>, which may record that a page was opened
              (for example, page views). It is used to understand traffic, not to sell personal data.
            </p>

            <h2>External links</h2>
            <p>
              The site links to third-party profiles and services (for example LinkedIn, Upwork,
              Toptal, GitHub, Discord, YouTube). Their privacy practices are governed by their own
              policies.
            </p>

            <h2>Children</h2>
            <p>
              The site is not directed at children under 13. We do not knowingly collect personal
              information from children under 13.
            </p>

            <h2>Changes</h2>
            <p>
              We may update this policy from time to time. The “Last updated” date at the top
              will change when we do. Continued use of the site after changes means you accept the
              updated policy.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about this policy:{" "}
              <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>
              {" · "}
              <a href="/contact">Contact</a>
            </p>
          </div>
        </article>
      </main>
      <aside className="rail" aria-label="Side">
        <div className="rail-scroll">
          <div>
            <h2>Legal</h2>
            <ul className="rail-links">
              <li><a href="/privacy" aria-current="page">Privacy Policy</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
        </div>
        <SiteFoot year={year} />
      </aside>
    </>
  );
}
