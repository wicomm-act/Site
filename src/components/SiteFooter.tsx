import Link from "next/link";
import { LogoMark } from "@/components/LogoMark";
import { club, siteOrigin } from "@/data/team";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <LogoMark className="h-8 w-14 text-accent" />
          <p className="mt-3 text-lg font-semibold tracking-tight">{club.name}</p>
          <p className="mt-1 max-w-sm text-sm text-muted">
            Technical sub-club of {club.parent}. Hosted at{" "}
            <a href={siteOrigin} className="text-fg hover:text-accent">
              wicomm.in
            </a>
            .
          </p>
        </div>
        <div className="flex gap-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          <Link href="/" className="hover:text-fg">
            Home
          </Link>
          <Link href="/team" className="hover:text-fg">
            Team
          </Link>
        </div>
      </div>
    </footer>
  );
}
