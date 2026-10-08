import { notFound } from "next/navigation";
import { fmtDate, getPost, getPosts, tagList } from "@/lib/posts";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Prashant Dangi" };
  const title = post.meta.title || slug;
  return {
    title: `${title} — Prashant Dangi`,
    description: post.meta.summary || "Notes from the field by Prashant Dangi."
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const title = post.meta.title || slug;
  const metaLine = [post.meta.date ? fmtDate(post.meta.date) : "", post.meta.reading || ""].filter(Boolean).join(" · ");
  const year = new Date().getFullYear();
  const back = "/blog?view=blogs";

  return (
    <>
      <main className="feed" id="content">
        <a className="back" href={back}>../blogs</a>
        <article className="card">
          <header className="post-head">
            <h1>{title}</h1>
            {post.meta.summary ? <p className="dek">{post.meta.summary}</p> : null}
            <div className="meta">
              {metaLine ? <time>{metaLine}</time> : null}
              {post.meta.tags ? (
                <span className="tags">{tagList(post.meta.tags).map((t) => <span className="tag" key={t}>{t}</span>)}</span>
              ) : null}
            </div>
          </header>
          <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
        <article className="card">
          <h2>For a scoped engagement.</h2>
          <p>A surface, a timeline, and what done looks like.</p>
          <div className="actions">
            <a className="btn btn-fill" href="mailto:prxshantdangi@gmail.com?subject=Fractional%20cybersecurity">Email</a>
          </div>
        </article>
      </main>
      <aside className="rail" aria-label="Side">
        <div>
          <h2>Library</h2>
          <ul className="rail-links">
            <li><a href="/blog?view=blogs">Blogs</a></li>
            <li><a href="/blog?view=writeups">Write ups</a></li>
            <li><a href="/blog?view=archive">Archive</a></li>
          </ul>
        </div>
        <div>
          <h2>Engagement</h2>
          <p className="quiet"><a href="mailto:prxshantdangi@gmail.com?subject=Fractional%20cybersecurity">Email</a> with a surface, a timeline, and what done looks like.</p>
        </div>
        <p className="quiet">© {year} Prashant Dangi</p>
      </aside>
    </>
  );
}
