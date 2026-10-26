import { AdUnit } from "@/components/AdUnit";
import { LabTerminal } from "@/components/LabTerminal";
import { AD_SLOTS } from "@/lib/ads";
import { tracks } from "@/lib/courses";
import { labTree } from "@/lib/labfs";

export const metadata = {
  title: "Practice — Prashant Dangi",
  description: "A lab shell. ls, cd, and cat README for the labs and commands in each track."
};

export default async function PracticePage({ searchParams }) {
  const sp = await searchParams;
  const start = tracks.some((track) => track.id === sp.track) ? sp.track : "";
  const year = new Date().getFullYear();

  return (
    <>
      <LabTerminal key={start || "root"} tree={labTree()} start={start} />
      <aside className="rail" aria-label="Tracks">
        <div className="rail-scroll">
          <div>
            <h2>Tracks</h2>
            <ul className="rail-links">
              {tracks.map((item) => (
                <li key={item.id}>
                  <a href={`/practice?track=${item.id}`} aria-current={item.id === start ? "page" : undefined}>{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <AdUnit slot={AD_SLOTS.rail} className="ad-rail" />
        </div>
        <p className="quiet rail-foot">© {year} Prashant Dangi</p>
      </aside>
    </>
  );
}
