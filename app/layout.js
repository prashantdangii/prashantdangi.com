import { Analytics } from "@vercel/analytics/next";
import { headers } from "next/headers";
import { MenuBinder } from "@/components/MenuBinder";
import { Sidebar } from "@/components/Sidebar";
import { ADSENSE_CLIENT } from "@/lib/ads";
import { pageId } from "@/lib/links";
import "./globals.css";

export async function generateMetadata() {
  const h = await headers();
  if (h.get("x-cyberai-app") === "1") {
    return {
      metadataBase: new URL("https://cyberai.prashantdangi.com"),
      applicationName: "Cyber AI",
      icons: { icon: "/cyberai-mark.svg", apple: "/cyberai-mark.svg" }
    };
  }
  return {
    metadataBase: new URL("https://prashantdangi.com"),
    title: {
      default: "Prashant Dangi — Fractional Cybersecurity",
      template: "%s"
    },
    description: "Fractional cybersecurity engineering. Offensive security, red teaming, and GRC for teams that need a senior engineer in the work.",
    other: {
      "google-adsense-account": ADSENSE_CLIENT
    },
    openGraph: {
      title: "Prashant Dangi — Fractional Cybersecurity",
      description: "Offensive security, red teaming, and GRC. Fractional cybersecurity engineering for teams that need a senior engineer in the work.",
      type: "website",
      url: "https://prashantdangi.com",
      images: ["/assets/profile.jpg"]
    },
    twitter: { card: "summary" },
    icons: {
      icon: "/assets/profile.jpg",
      apple: "/assets/profile.jpg"
    }
  };
}

export async function generateViewport() {
  const h = await headers();
  return { themeColor: h.get("x-cyberai-app") === "1" ? "#09070f" : "#121212" };
}

export default async function RootLayout({ children }) {
  const h = await headers();
  const path = h.get("x-pathname") || "/";
  const search = h.get("x-search") || "";
  const app = h.get("x-cyberai-app") === "1";

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        {!app ? (
          <>
            {/* Google AdSense — required in <head> for site verification */}
            <meta name="google-adsense-account" content="ca-pub-6249156640388773" />
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6249156640388773"
              crossOrigin="anonymous"
            />
          </>
        ) : null}
      </head>
      {app ? (
        <body className="cai-root">
          <a className="skip" href="#content">Skip to content</a>
          {children}
          <Analytics />
        </body>
      ) : (
        <body>
          <a className="skip" href="#content">Skip to content</a>
          <div className="shell">
            <Sidebar current={pageId(path, search)} />
            {children}
          </div>
          <MenuBinder />
          <Analytics />
        </body>
      )}
    </html>
  );
}
