import { LINKS } from "@/lib/links";

const ICONS = {
  home: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z"/></svg>',
  cyberai: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 3.2 13.4 8.6 18.8 10 13.4 11.4 12 16.8 10.6 11.4 5.2 10 10.6 8.6Z"/></svg>',
  services: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h16M4 17h10"/></svg>',
  courses: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5z"/></svg>',
  blogs: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M6 3.5h9l3.5 3.5V20.5H6zM15 3.5V7h3.5M8.5 12h7M8.5 16h4.5"/></svg>',
  writeups: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M7 3.5h8l4 4V20.5H7zM15 3.5V7.5h4M9.2 13.2l1.8 1.8 3.8-3.8"/></svg>',
  archive: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 7.5h16v2.5H4zM6 10v9.5h12V10"/></svg>',
  contact: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 6h16v12H4zM4 7l8 6 8-6"/></svg>'
};

const ITEMS = [
  ["home", "/", "Home"],
  ["cyberai", "/cyberai", "CyberAI"],
  ["services", "/services", "Services"],
  ["courses", "/courses", "Courses"],
  ["blogs", "/blog?view=blogs", "Blogs"],
  ["writeups", "/blog?view=writeups", "Write ups"],
  ["archive", "/blog?view=archive", "Archive"],
  ["contact", "/contact", "Contact"]
];

export function Sidebar({ current }) {
  const mark = current === "home"
    ? <div className="mark"><img src="/assets/profile.jpg" alt="" width="64" height="64" /></div>
    : <a className="mark" href="/" aria-label="Home"><img src="/assets/profile.jpg" alt="" width="64" height="64" /></a>;

  return (
    <aside className="side nav" id="site-side">
      <div className="who">
        {mark}
        <div><strong>Prashant Dangi</strong><span>Security Researcher</span></div>
        <button className="nav-burger" type="button" aria-expanded="false" aria-controls="nav-links" aria-label="Menu">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 8h16M4 16h16" /></svg>
        </button>
      </div>
      <nav className="side-nav nav-links" id="nav-links" aria-label="Primary">
        {ITEMS.map(([id, href, label]) => (
          <a
            key={id}
            href={href}
            aria-current={id === current ? "page" : undefined}
            dangerouslySetInnerHTML={{ __html: ICONS[id] + label }}
          />
        ))}
      </nav>
      <div className="side-social">
        <a href="mailto:prxshantdangi@gmail.com" aria-label="Email">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 6h16v12H4zM4 7l8 6 8-6" /></svg>
        </a>
        <a href={LINKS.x} target="_blank" rel="noopener" aria-label="X">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M14.7 10.3 22.4 2h-1.8l-6.7 7.2L8.6 2H2l8.1 11.2L2 22h1.8l7.1-7.6L15.4 22H22l-7.3-11.7Zm-2.5 2.7-.8-1.1L4.6 3.3h2.8l5.2 7 .8 1.1 6.8 9.3h-2.8l-5.2-7.1Z" /></svg>
        </a>
        <a href={LINKS.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M4.7 3.3a2.2 2.2 0 1 0 .1 4.4 2.2 2.2 0 0 0-.1-4.4ZM3 9h3.4v12H3V9Zm6.3 0h3.2v1.6h.1c.4-.8 1.5-1.7 3.2-1.7 3.4 0 4 2.2 4 5.1V21H16.4v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21H9.3V9Z" /></svg>
        </a>
        <a href={LINKS.discord} target="_blank" rel="noopener" aria-label="Discord">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19.3 5.3A17 17 0 0 0 15 4l-.4.8a16 16 0 0 0-5.2 0L9 4a17 17 0 0 0-4.3 1.3C2.2 9.4 1.5 13.3 1.8 17.2A17 17 0 0 0 7 19.8l.6-1a11 11 0 0 1-1.6-.8l.4-.3a16 16 0 0 0 10.2 0l.4.3c-.5.3-1.1.6-1.6.8l.6 1a17 17 0 0 0 5.2-2.6c.4-4.5-.7-8.3-3.1-11.9zM8.7 14.7c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm6.6 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z" /></svg>
        </a>
        <a href={LINKS.youtube} target="_blank" rel="noopener" aria-label="YouTube">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M23 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C19.2 5.4 12 5.4 12 5.4s-7.2 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6zM9.8 15.5v-6.6l6 3.3-6 3.3z" /></svg>
        </a>
      </div>
    </aside>
  );
}
