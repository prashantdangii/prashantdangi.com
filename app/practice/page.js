import { LINKS } from "@/lib/links";

export const metadata = {
  title: "Practice — Prashant Dangi",
  description: "The practice. Fractional cybersecurity, assessments, and the record behind the work."
};

export default function PracticePage() {
  const year = new Date().getFullYear();
  return (
    <>
      <main className="feed" id="content">
        <p className="label">// practice</p>
        <article className="card">
          <h3>A senior engineer, for the work in front of you.</h3>
          <p>Fractional cybersecurity for companies that need offensive testing, red teaming, and the GRC that has to match what the test actually found. Twenty-plus assessments across web, API, network, and cloud. Also in the work when it is the surface: AI application security and prompt injection.</p>
          <div className="meta">
            <span className="tag">ceh v12</span>
            <span className="tag">iso 27001 la</span>
          </div>
        </article>
        <ol className="xp">
          <li className="card">
            <div className="meta" style={{ marginTop: 0 }}><time dateTime="2025">2025 – present</time></div>
            <h3>Independent practice</h3>
            <p className="role">Upwork · Toptal</p>
            <p>Client assessments and security engineering across web, API, network, and cloud. ISO 27001 and NIST alignment.</p>
          </li>
          <li className="card">
            <div className="meta" style={{ marginTop: 0 }}><time dateTime="2026-01">Jan 2026 – Jul 2026</time></div>
            <h3>Scaler Academy</h3>
            <p className="role">Cybersecurity SME</p>
            <p>Offensive security curriculum, AWS labs, MITRE ATT&amp;CK mapping, and live CTFs for 30+ learners.</p>
          </li>
          <li className="card">
            <div className="meta" style={{ marginTop: 0 }}><time dateTime="2024-09">Sep 2024 – Feb 2025</time></div>
            <h3>Ascella Infosec</h3>
            <p className="role">Cybersecurity Analyst</p>
            <p>Web and API tests. Critical findings mapped to ISO 27001:2022 Annex A evidence. GRC and risk work alongside the testing.</p>
          </li>
        </ol>
      </main>
      <aside className="rail" aria-label="Side">
        <div>
          <h2>Background</h2>
          <p className="quiet">CEH v12<br />ISO/IEC 27001:2022 Lead Auditor<br />Finalist, IIT Madras hardware CTF 2026<br />Top 10, GPCSSI 2024<br />B.Tech CSE, Bennett University</p>
        </div>
        <div>
          <h2>Record</h2>
          <ul className="rail-links">
            <li><a href="/resume.pdf">Resume</a></li>
            <li><a href={LINKS.upwork} target="_blank" rel="noopener">Upwork</a></li>
            <li><a href={LINKS.toptal} target="_blank" rel="noopener">Toptal · Top 3%</a></li>
            <li><a href={LINKS.github} target="_blank" rel="noopener">GitHub</a></li>
          </ul>
        </div>
        <p className="quiet">© {year} Prashant Dangi</p>
      </aside>
    </>
  );
}
