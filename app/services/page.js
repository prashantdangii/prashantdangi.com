import fs from "fs";
import path from "path";
import { LINKS } from "@/lib/links";

export const metadata = {
  title: "Services — Prashant Dangi",
  description: "Prashant Dangi on Toptal and Upwork. Profile cards and client reviews from the Upwork page."
};

export default function ServicesPage() {
  const badge = fs.readFileSync(path.join(process.cwd(), "components/toptal-badge.html"), "utf8");

  return (
    <>
      <main className="feed" id="content">
        <p className="label">// services</p>
        <a className="card profile-card" href={LINKS.toptal} target="_blank" rel="noopener">
          <div className="profile-row">
            <img className="profile-photo" src="/assets/toptal.jpg" alt="Prashant Dangi" />
            <div>
              <p className="kicker toptal">Toptal · Verified Expert in Engineering</p>
              <h2>Offensive Security Expert and Developer</h2>
              <p>Offensive security across VAPT, cloud, and red teaming. Twenty-plus assessments on web apps, APIs, networks, and cloud, with ISO 27001 and GRC beside the test.</p>
              <span className="more">toptal.com →</span>
            </div>
          </div>
        </a>
        <a className="card profile-card" href={LINKS.upwork} target="_blank" rel="noopener">
          <div className="profile-row">
            <img className="profile-photo" src="/assets/upwork.jpg" alt="Prashant D." />
            <div>
              <p className="kicker upwork">Upwork · Expert Cybersecurity Professional</p>
              <h2>Prashant D.</h2>
              <p>Offensive security researcher. OSCP and CEH v12. Penetration testing, red teaming, and vulnerability assessment across web, mobile, API, network, and cloud.</p>
              <div className="statline">
                <span className="stat">4.9 rating</span>
                <span className="stat">85% job success</span>
                <span className="stat">10 jobs</span>
              </div>
              <span className="more">upwork.com →</span>
            </div>
          </div>
        </a>

        <p className="label">// upwork reviews</p>
        <article className="card quote">
          <div className="quote-top">
            <span className="star-row" aria-label="5.0 out of 5">
              <span className="star-base" aria-hidden="true">★★★★★</span>
              <span className="star-fill" style={{ width: "100%" }} aria-hidden="true">★★★★★</span>
            </span>
            <span className="rating-num">5.0</span>
          </div>
          <p>“Prashant was amazing to work with. He worked expediently and was able to finish the project ahead of time. He was knowledgeable about the subject matter…”</p>
          <p className="quote-meta">April H. · Cyber Security Presentation Creation · Oct 3, 2025</p>
        </article>
        <article className="card quote">
          <div className="quote-top">
            <span className="star-row" aria-label="5.0 out of 5">
              <span className="star-base" aria-hidden="true">★★★★★</span>
              <span className="star-fill" style={{ width: "100%" }} aria-hidden="true">★★★★★</span>
            </span>
            <span className="rating-num">5.0</span>
          </div>
          <p>“Great work!”</p>
          <p className="quote-meta">Clyde C. · Senior Java Reverse Engineer &amp; Network-Traffic Anti-Tamper Specialist · Aug 18, 2025</p>
        </article>
        <article className="card quote">
          <div className="quote-top">
            <span className="star-row" aria-label="5.0 out of 5">
              <span className="star-base" aria-hidden="true">★★★★★</span>
              <span className="star-fill" style={{ width: "100%" }} aria-hidden="true">★★★★★</span>
            </span>
            <span className="rating-num">5.0</span>
          </div>
          <p>Azure Cloud Environment Assessment Specialist</p>
          <p className="quote-meta">Oct 2, 2025 – Oct 23, 2025</p>
        </article>
      </main>
      <aside className="rail rail-badge" aria-label="Toptal" dangerouslySetInnerHTML={{ __html: badge }} />
    </>
  );
}
