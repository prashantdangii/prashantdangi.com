import { headers } from "next/headers";
import Link from "next/link";
import { SiteChrome } from "@/components/cyberai/SiteChrome";

export default async function NotFound() {
  const h = await headers();
  if (h.get("x-cyberai-app") === "1") {
    return (
      <SiteChrome>
        <main id="content" className="cai-wrap cai-page cai-404">
          <p className="cai-kicker">404</p>
          <h1>This page is not on Cyber AI.</h1>
          <p className="cai-lede">The address does not match a public page or a console route.</p>
          <div className="cai-cta">
            <Link className="cai-btn cai-btn-fill" href="/">Back home</Link>
          </div>
        </main>
      </SiteChrome>
    );
  }

  const year = new Date().getFullYear();
  return (
    <>
      <main className="feed" id="content">
        <article className="card">
          <h2>This page could not be found.</h2>
          <p><a href="/">Home</a></p>
        </article>
      </main>
      <aside className="rail" aria-label="Side">
        <div className="rail-scroll" />
        <p className="quiet rail-foot">© {year} Prashant Dangi</p>
      </aside>
    </>
  );
}
