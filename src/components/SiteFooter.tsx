import Link from "next/link";
import { LogoMark } from "@/components/LogoMark";
import { ArrowUpRightIcon } from "@/components/Icons";
import { club } from "@/data/team";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-width footer-top">
        <Link href="/" className="brand" aria-label="WICOMM home"><LogoMark className="brand-mark" /><span className="brand-name">{club.name}<span>Small boards. Big possibilities.</span></span></Link>
        <nav aria-label="Footer navigation"><Link href="/">Home</Link><Link href="/#explore">Explore</Link><Link href="/team">Meet the team <ArrowUpRightIcon /></Link></nav>
      </div>
      <div className="page-width footer-bottom"><span>The technical sub-club of {club.parent}.</span><span>Hardware. Software. Together.</span><a href="https://wicomm.in">wicomm.in</a></div>
    </footer>
  );
}
