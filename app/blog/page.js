import { Library } from "@/components/Library";
import { filterLibrary, getPosts, libraryView } from "@/lib/posts";

const NAMES = { blogs: "Blogs", writeups: "Write ups", archive: "Archive" };
const COPY = {
  blogs: ["Blogs", "Essays on delivery, identity, pipelines, and the work after a finding."],
  writeups: ["Write ups", "Assessment notes. What was found, and what had to change after."],
  archive: ["Archive", "Every note, grouped by year."]
};

export async function generateMetadata({ searchParams }) {
  const sp = await searchParams;
  const view = libraryView(sp.view);
  return {
    title: `${NAMES[view]} — Prashant Dangi`,
    description: "Field notes from assessments, identity, and the work after the finding."
  };
}

export default async function BlogPage({ searchParams }) {
  const sp = await searchParams;
  const view = libraryView(sp.view);
  const posts = filterLibrary(getPosts(), view);
  const year = new Date().getFullYear();
  const [heading, blurb] = COPY[view];

  return (
    <>
      <main className="feed" id="content">
        <Library posts={posts} view={view} />
      </main>
      <aside className="rail" aria-label="Side">
        <div>
          <h2>{heading}</h2>
          <p className="quiet">{blurb}</p>
        </div>
        <div>
          <h2>Also</h2>
          <ul className="rail-links">
            <li><a href="/blog?view=blogs">Blogs</a></li>
            <li><a href="/blog?view=writeups">Write ups</a></li>
            <li><a href="/blog?view=archive">Archive</a></li>
            <li><a href="/services">Services</a></li>
          </ul>
        </div>
        <p className="quiet">© {year} Prashant Dangi</p>
      </aside>
    </>
  );
}
