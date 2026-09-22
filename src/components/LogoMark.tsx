import Image from "next/image";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      <Image src="/logo-black.jpeg" width={392} height={328} sizes="64px" className="logo-dark" alt="" />
      <Image src="/images/logo-light-symbol.webp" width={320} height={250} sizes="64px" className="logo-light" alt="" />
    </span>
  );
}
