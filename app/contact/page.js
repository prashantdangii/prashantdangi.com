import { LINKS } from "@/lib/links";

export const metadata = {
  title: "Contact — Prashant Dangi",
  description: "Start a scoped cybersecurity engagement."
};

export default function ContactPage() {
  const year = new Date().getFullYear();
  return (
    <>
      <main className="feed" id="content">
        <p className="label">// contact</p>
        <article className="card">
          <h3>For a scoped engagement.</h3>
          <p>A surface, a timeline, and what done looks like. Write with that, or start from the Upwork or Toptal profile.</p>
          <div className="actions">
            <a className="btn btn-fill" href="mailto:prxshantdangi@gmail.com?subject=Fractional%20cybersecurity">Email</a>
            <a className="btn" href={LINKS.upwork} target="_blank" rel="noopener">Upwork</a>
            <a className="btn" href={LINKS.toptal} target="_blank" rel="noopener">Toptal</a>
          </div>
          <p className="role" style={{ marginTop: 12 }}><a href="mailto:prxshantdangi@gmail.com">prxshantdangi@gmail.com</a></p>
        </article>
      </main>
      <aside className="rail" aria-label="Side">
        <div>
          <h2>Direct</h2>
          <ul className="rail-links">
            <li><a href="mailto:prxshantdangi@gmail.com">Email</a></li>
            <li><a href={LINKS.linkedin} target="_blank" rel="noopener">LinkedIn</a></li>
            <li><a href={LINKS.x} target="_blank" rel="noopener">X</a></li>
          </ul>
        </div>
        <div>
          <h2>Profiles</h2>
          <ul className="rail-links">
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
