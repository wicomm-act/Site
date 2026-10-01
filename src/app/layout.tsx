import type { Metadata } from "next";
import { JetBrains_Mono, Montserrat } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { siteOrigin } from "@/data/team";
import "./globals.css";

const display = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: "WICOMM — technical wing of ACSA",
    template: "%s · WICOMM",
  },
  description:
    "Build something real with WICOMM, ACSA’s technical sub-club. Explore ESP32, STM32, embedded hardware, and coding. Meet the people behind the builds.",
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
      data-theme="dark"
      className={`${display.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script id="theme-init" dangerouslySetInnerHTML={{ __html: `try{document.documentElement.dataset.theme=localStorage.getItem("wicomm-theme")==="light"?"light":"dark"}catch{document.documentElement.dataset.theme="dark"}` }} />
        {process.env.NODE_ENV === "development" ? (
          <script
            id="browser-hydration-guard"
            dangerouslySetInnerHTML={{
              __html: `(()=>{const a="data-supercharge-ref",clean=n=>{if(n.nodeType!==1)return;n.removeAttribute(a);n.querySelectorAll("["+a+"]").forEach(e=>e.removeAttribute(a))},o=new MutationObserver(ms=>ms.forEach(m=>{if(m.type==="attributes")m.target.removeAttribute(a);else m.addedNodes.forEach(clean)}));o.observe(document,{subtree:true,childList:true,attributes:true,attributeFilter:[a]});addEventListener("load",()=>setTimeout(()=>o.disconnect(),2000),{once:true})})()`
            }}
          />
        ) : null}
      </head>
      <body className="flex min-h-full flex-col">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <SiteNav />
        <div className="flex-1" id="main-content" tabIndex={-1}>{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
