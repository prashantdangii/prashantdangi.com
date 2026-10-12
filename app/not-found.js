export default function NotFound() {
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
