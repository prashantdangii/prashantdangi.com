import { LINKS } from "@/lib/links";
import { getTrack, lessonsFor, tracks } from "@/lib/courses";

export const metadata = {
  title: "Courses — Prashant Dangi",
  description: "Walkthroughs for foundations, web, pentest, defense, GRC, AI, research, career, freelance, and bounty."
};

export default async function CoursesPage({ searchParams }) {
  const sp = await searchParams;
  const track = getTrack(sp.track);
  const list = lessonsFor(track.id);
  const year = new Date().getFullYear();

  return (
    <>
      <main className="feed" id="content">
        <p className="label">// courses</p>
        <div className="tags course-tracks" aria-label="Tracks">
          {tracks.map((item) => (
            <a
              key={item.id}
              className="tag"
              href={`/courses?track=${item.id}`}
              aria-current={item.id === track.id ? "page" : undefined}
            >
              {item.name}
            </a>
          ))}
        </div>
        <p className="quiet">{track.blurb}</p>
        {list.map((lesson) => (
          <a className="card" key={lesson.slug} href={`/courses/${lesson.slug}`}>
            <h3>{lesson.title}</h3>
            {lesson.summary ? <p>{lesson.summary}</p> : null}
            <div className="meta"><span className="tag">{lesson.steps.length} steps</span></div>
          </a>
        ))}
        <div className="course-join">
          <p className="label">// join</p>
          <p className="quiet">
            <a href={LINKS.skool} target="_blank" rel="noopener">Skool</a>
            {" · "}
            <a href={LINKS.discord} target="_blank" rel="noopener">Discord</a>
            {" · "}
            <a href={LINKS.youtube} target="_blank" rel="noopener">YouTube</a>
          </p>
        </div>
      </main>
      <aside className="rail" aria-label="Tracks">
        <div>
          <h2>Tracks</h2>
          <ul className="rail-links">
            {tracks.map((item) => (
              <li key={item.id}>
                <a href={`/courses?track=${item.id}`} aria-current={item.id === track.id ? "page" : undefined}>{item.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Join</h2>
          <ul className="rail-links">
            <li><a href={LINKS.skool} target="_blank" rel="noopener">Skool</a></li>
            <li><a href={LINKS.discord} target="_blank" rel="noopener">Discord</a></li>
            <li><a href={LINKS.youtube} target="_blank" rel="noopener">YouTube</a></li>
          </ul>
        </div>
        <p className="quiet">© {year} Prashant Dangi</p>
      </aside>
    </>
  );
}
