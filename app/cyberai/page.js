import { CyberAI } from "@/components/CyberAI";
import { LINKS } from "@/lib/links";

export const metadata = {
  title: "CyberAI — Prashant Dangi",
  description: "CyberAI. Ask about offensive security, red teaming, GRC, and how a fractional engagement is scoped."
};

export default function CyberAIPage() {
  const year = new Date().getFullYear();
  return (
    <>
      <CyberAI />
      <aside className="rail" aria-label="Side">
        <div>
          <h2>Ask about</h2>
          <p className="quiet">Offensive security, red teaming, GRC, courses, and how an engagement is scoped. A specific system still goes by email.</p>
        </div>
        <div>
          <h2>Record</h2>
          <ul className="rail-links">
            <li><a href={LINKS.upwork} target="_blank" rel="noopener">Upwork</a></li>
            <li><a href={LINKS.toptal} target="_blank" rel="noopener">Toptal · Top 3%</a></li>
            <li><a href={LINKS.linkedin} target="_blank" rel="noopener">LinkedIn</a></li>
            <li><a href={LINKS.github} target="_blank" rel="noopener">GitHub</a></li>
            <li><a href="/resume.pdf">Resume</a></li>
          </ul>
        </div>
        <div>
          <h2>Background</h2>
          <p className="quiet">CEH v12<br />ISO/IEC 27001:2022 Lead Auditor<br />Finalist, IIT Madras hardware CTF 2026<br />Top 10, GPCSSI 2024<br />B.Tech CSE, Bennett University</p>
        </div>
        <p className="quiet">© {year} Prashant Dangi</p>
      </aside>
    </>
  );
}
