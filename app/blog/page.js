import { Library } from "@/components/Library";
import { getPosts } from "@/lib/posts";

export const metadata = {
  title: "Archives — Prashant Dangi",
  description: "Every note and writeup, grouped by year."
};

export default function BlogPage() {
  const posts = getPosts();
  const year = new Date().getFullYear();

  return (
    <>
      <main className="feed" id="content">
        <Library posts={posts} view="archive" />
      </main>
      <aside className="rail" aria-label="Side">
        <div className="rail-scroll">
          <div>
            <h2>Archives</h2>
            <p className="quiet">Every blog and writeup, grouped by year.</p>
          </div>
        </div>
        <p className="quiet rail-foot">© {year} Prashant Dangi</p>
      </aside>
    </>
  );
}
