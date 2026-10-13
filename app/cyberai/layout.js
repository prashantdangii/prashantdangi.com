import { HOME_DESCRIPTION, HOME_TITLE, SITE } from "@/lib/cyberai";
import "./cyberai.css";

export const metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: HOME_TITLE,
    template: "%s — Cyber AI"
  },
  description: HOME_DESCRIPTION,
  applicationName: "Cyber AI",
  authors: [{ name: "Prashant Dangi", url: "https://prashantdangi.com" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    type: "website",
    url: SITE,
    siteName: "Cyber AI",
    images: [{ url: "/cyberai-mark.svg", alt: "Cyber AI" }]
  },
  twitter: { card: "summary", title: HOME_TITLE, description: HOME_DESCRIPTION },
  robots: { index: true, follow: true }
};

export const viewport = {
  themeColor: "#09070f"
};

export default function CyberLayout({ children }) {
  return children;
}
