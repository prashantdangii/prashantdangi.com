"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT } from "@/lib/ads";

/**
 * Manual AdSense display unit. Requires a slot ID from the AdSense console.
 * Auto ads (from the head script) still place ads site-wide without slots.
 */
export function AdUnit({
  slot,
  format = "auto",
  layout = undefined,
  layoutKey = undefined,
  responsive = true,
  className = ""
}) {
  const pushed = useRef(false);

  useEffect(() => {
    if (!slot || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* AdSense may be blocked by extensions */
    }
  }, [slot]);

  if (!slot) return null;

  const attrs = {
    className: "adsbygoogle",
    style: { display: "block", textAlign: layout === "in-article" ? "center" : undefined },
    "data-ad-client": ADSENSE_CLIENT,
    "data-ad-slot": slot,
    "data-ad-format": format,
    "data-full-width-responsive": responsive ? "true" : "false"
  };
  if (layout) attrs["data-ad-layout"] = layout;
  if (layoutKey) attrs["data-ad-layout-key"] = layoutKey;

  return (
    <div className={`ad-wrap${className ? ` ${className}` : ""}`}>
      <ins {...attrs} />
    </div>
  );
}

/** In-feed / between cards */
export function AdFeed({ slot, className = "" }) {
  return <AdUnit slot={slot} format="auto" className={`ad-feed${className ? ` ${className}` : ""}`} />;
}

/** In-article after a heading or mid-post */
export function AdInArticle({ slot, className = "" }) {
  return (
    <AdUnit
      slot={slot}
      format="fluid"
      layout="in-article"
      className={`ad-inarticle${className ? ` ${className}` : ""}`}
    />
  );
}

/** Multiplex / matched content */
export function AdMultiplex({ slot, className = "" }) {
  return (
    <AdUnit
      slot={slot}
      format="autorelaxed"
      responsive={false}
      className={`ad-multiplex${className ? ` ${className}` : ""}`}
    />
  );
}
