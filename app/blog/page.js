import { AdFeed, AdMultiplex, AdUnit } from "@/components/AdUnit";
import { Library } from "@/components/Library";
import { AD_SLOTS } from "@/lib/ads";
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
        <AdFeed slot={AD_SLOTS.feed} />
        <AdMultiplex slot={AD_SLOTS.multiplex} />
      </main>
      <aside className="rail" aria-label="Side">
        <div className="rail-scroll">
          <div>
            <h2>Archives</h2>
            <p className="quiet">Every blog and writeup, grouped by year.</p>
          </div>
          <AdUnit slot={AD_SLOTS.rail} className="ad-rail" />
        </div>
        <p className="quiet rail-foot">© {year} Prashant Dangi</p>
      </aside>
    </>
  );
}
