import Link from "next/link";
import { LogoMark } from "@/components/LogoMark";
import { MemberPhoto } from "@/components/MemberPhoto";
import { club, members, rosterSections } from "@/data/team";

const pillars = [
  {
    k: "01",
    t: "Wireless",
    d: "Radios, SDR, antennas, and the protocols that actually leave the lab.",
  },
  {
    k: "02",
    t: "Embedded",
    d: "Boards, firmware, and sensors. If it does not boot in the field, it is not done.",
  },
  {
    k: "03",
    t: "ACSA",
    d: "We sit under ACSA as the technical arm — same house, sharper tools.",
  },
];

const featured = members.slice(0, 3);

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:py-24 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
            {club.parent} · technical sub-club
          </p>
          <h1 className="mt-4 text-5xl font-semibold leading-[0.92] tracking-tight sm:text-7xl">
            Build the
            <br />
            signal.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">{club.description}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/team"
              className="bg-accent px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-bg"
            >
              Meet the team
            </Link>
            <Link
              href={`/team/u/${members[0].usn}`}
              className="border border-line px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] hover:border-accent"
            >
              President
            </Link>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6 font-mono text-xs uppercase tracking-[0.16em] text-muted">
            <div>
              <dt>Members</dt>
              <dd className="mt-1 text-2xl font-semibold tracking-tight text-fg">
                {members.length}
              </dd>
            </div>
            <div>
              <dt>Wings</dt>
              <dd className="mt-1 text-2xl font-semibold tracking-tight text-fg">
                {rosterSections.length}
              </dd>
            </div>
            <div>
              <dt>Host</dt>
              <dd className="mt-1 text-2xl font-semibold tracking-tight text-fg">
                ACSA
              </dd>
            </div>
          </dl>
        </div>
        <div className="relative flex items-center justify-center border border-line bg-panel px-8 py-14">
          <LogoMark className="node-pulse h-40 w-full max-w-sm text-accent sm:h-52" />
          <p className="absolute bottom-5 font-mono text-[11px] uppercase tracking-[0.32em] text-muted">
            WICOMM
          </p>
        </div>
      </section>

      <section className="border-y border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:grid-cols-3">
          {pillars.map((item) => (
            <article key={item.k}>
              <p className="font-mono text-[11px] text-accent">{item.k}</p>
              <h2 className="mt-2 text-2xl font-semibold">{item.t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
              Officers
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              The people running the bench
            </h2>
          </div>
          <Link
            href="/team"
            className="font-mono text-xs uppercase tracking-[0.18em] text-muted hover:text-accent"
          >
            Full roster →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {featured.map((m) => (
            <Link
              key={m.usn}
              href={`/team/u/${m.usn}`}
              className="border border-line bg-panel transition hover:border-accent"
            >
              <MemberPhoto usn={m.usn} name={m.name} size="card" />
              <div className="p-5">
                <p className="text-xl font-semibold tracking-tight">{m.name}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  {m.role}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
