/** Google AdSense publisher ID (Auto ads load from the site <head> script). */
export const ADSENSE_CLIENT = "ca-pub-6249156640388773";

/**
 * Optional manual ad-unit slot IDs — AdSense → Ads → By ad unit → Create ad unit.
 * Paste the numeric slot (e.g. "1234567890"). One Responsive unit can be reused.
 * Env vars override these when set. Blank = skip that unit; Auto ads still run site-wide.
 */
const RESPONSIVE =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_FEED ||
  process.env.NEXT_PUBLIC_ADSENSE_SLOT ||
  "";
const IN_ARTICLE = process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE || "";
const RAIL = process.env.NEXT_PUBLIC_ADSENSE_SLOT_RAIL || "";
const MULTIPLEX = process.env.NEXT_PUBLIC_ADSENSE_SLOT_MULTIPLEX || "";

export const AD_SLOTS = {
  feed: RESPONSIVE,
  article: IN_ARTICLE || RESPONSIVE,
  bottom: RESPONSIVE,
  rail: RAIL || RESPONSIVE,
  multiplex: MULTIPLEX
};
