"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/LogoMark";
import { ArrowUpRightIcon } from "@/components/Icons";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteNav() {
  const path = usePathname();
  const onTeam = path.startsWith("/team");

  return (
    <header className="site-header">
      <div className="page-width nav-inner">
        <Link href="/" className="brand" aria-label="WICOMM home">
          <LogoMark className="brand-mark" />
          <span className="brand-name">WICOMM<span>A technical sub-club of ACSA</span></span>
        </Link>
        <nav aria-label="Main navigation" className="main-nav">
          <Link href="/" aria-current={!onTeam ? "page" : undefined}>Home</Link>
          <Link href="/#explore" className="explore-nav">What we explore</Link>
          <Link href="/team" aria-current={onTeam ? "page" : undefined}>The team</Link>
        </nav>
        <div className="nav-actions">
          <ThemeToggle />
          <Link href="/#get-involved" className="nav-contact">Let’s build <ArrowUpRightIcon /></Link>
        </div>
      </div>
    </header>
  );
}
