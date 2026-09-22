import type { Metadata } from "next";
import { IBM_Plex_Mono, Syne } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { siteOrigin } from "@/data/team";
import "./globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: "WICOMM — technical wing of ACSA",
    template: "%s · WICOMM",
  },
  description:
    "WICOMM is ACSA’s technical sub-club for wireless, embedded, and systems builds.",
  icons: { icon: "/logo-qr.png" },
  openGraph: {
    title: "WICOMM",
    description:
      "Technical sub-club of ACSA. Wireless, embedded, and systems.",
    url: siteOrigin,
    siteName: "WICOMM",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteNav />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
