import { headers } from "next/headers";
import { MenuBinder } from "@/components/MenuBinder";
import { Sidebar } from "@/components/Sidebar";
import { pageId } from "@/lib/links";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://prashantdangi.com"),
  title: {
    default: "Prashant Dangi — Fractional Cybersecurity",
    template: "%s"
  },
  description: "Fractional cybersecurity engineering. Offensive security, red teaming, and GRC for teams that need a senior engineer in the work.",
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

export const viewport = {
  themeColor: "#121212"
};

export default async function RootLayout({ children }) {
  const h = await headers();
  const path = h.get("x-pathname") || "/";
  const search = h.get("x-search") || "";

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className={path === "/cyberai" ? "chat-page" : undefined}>
        <a className="skip" href="#content">Skip to content</a>
        <div className="shell">
          <Sidebar current={pageId(path, search)} />
          {children}
        </div>
        <MenuBinder />
      </body>
    </html>
  );
}
