"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/LogoMark";

const links = [
  { href: "/", label: "Home" },
  { href: "/team", label: "Team" },
];

export function SiteNav() {
  const path = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-bg/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-3">
          <LogoMark className="h-7 w-12 text-accent node-pulse" />
          <span className="leading-tight">
            <span className="block text-lg font-semibold tracking-tight">
              WICOMM
            </span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
              ACSA
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 font-mono text-xs uppercase tracking-[0.18em]">
          {links.map((l) => {
            const on =
              l.href === "/"
                ? path === "/"
                : path === l.href || path.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-2 ${on ? "text-accent" : "text-muted hover:text-fg"}`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
