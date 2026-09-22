"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { MemberPhoto } from "@/components/MemberPhoto";
import {
  getMemberByUsn,
  memberProfileUrl,
  memberQrSrc,
  members,
  membersInSection,
  rosterSections,
  type Member,
} from "@/data/team";

function MemberCard({ member, active }: { member: Member; active: boolean }) {
  return (
    <Link
      href={`/team/u/${member.usn}`}
      className={`group block border bg-panel transition ${
        active
          ? "border-accent glow-line"
          : "border-line hover:border-accent/70"
      }`}
    >
      <MemberPhoto usn={member.usn} name={member.name} size="card" />
      <div className="p-4 sm:p-5">
        <p className="text-lg font-semibold tracking-tight">{member.name}</p>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          {member.role}
        </p>
        <p className="mt-3 font-mono text-xs text-cyan">{member.usn}</p>
      </div>
    </Link>
  );
}

function ProfilePanel({
  usn,
  onClose,
}: {
  usn: string;
  onClose: () => void;
}) {
  const member = getMemberByUsn(usn);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close profile"
        className="absolute inset-0 bg-black/75"
        onClick={onClose}
      />
      <aside className="relative z-10 m-3 max-h-[92vh] w-full max-w-2xl overflow-y-auto border border-line bg-panel p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 font-mono text-xs uppercase tracking-[0.2em] text-muted hover:text-fg"
        >
          Close
        </button>
        {member ? (
          <div className="grid gap-8 sm:grid-cols-[minmax(0,11rem)_1fr]">
            <div>
              <MemberPhoto
                usn={member.usn}
                name={member.name}
                size="profile"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={memberQrSrc(member.name)}
                alt={`QR for ${member.name}`}
                className="mt-4 w-full border border-line bg-white p-2"
              />
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                {member.role}
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                {member.name}
              </h2>
              <p className="mt-2 text-muted">{member.year}</p>
              <p className="mt-4 font-mono text-sm text-cyan">{member.usn}</p>
              <a
                href={`mailto:${member.email}`}
                className="mt-3 inline-block font-mono text-sm text-fg hover:text-accent"
              >
                {member.email}
              </a>
              <p className="mt-8 font-mono text-xs leading-relaxed text-muted">
                Scan the QR or open{" "}
                <span className="break-all text-fg">
                  {memberProfileUrl(member.usn)}
                </span>
              </p>
            </div>
          </div>
        ) : (
          <>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-hot">
              Unknown USN
            </p>
            <h2 className="mt-3 text-2xl font-semibold">No member on file</h2>
            <p className="mt-3 text-muted">
              <span className="font-mono text-fg">{usn}</span> is not linked to
              a WICOMM profile yet.
            </p>
          </>
        )}
      </aside>
    </div>
  );
}

export function TeamBoard({ selectedUsn }: { selectedUsn?: string }) {
  const router = useRouter();
  const selected = selectedUsn ? getMemberByUsn(selectedUsn) : null;

  return (
    <>
      <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
            Roster
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
            Team
          </h1>
          <p className="mt-3 max-w-xl text-muted">
            Seven wings. Open a card, or go to{" "}
            <span className="font-mono text-fg">/team/u/{"{usn}"}</span> — the
            roster stays, the profile overlays.
          </p>
        </div>
        <p className="font-mono text-xs text-muted">{members.length} members</p>
      </div>
      <div className="space-y-14">
        {rosterSections.map((section) => {
          const people = membersInSection(section.roles);
          if (people.length === 0) return null;
          return (
            <section key={section.title}>
              <h2 className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                {section.title}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {people.map((m) => (
                  <MemberCard
                    key={m.usn}
                    member={m}
                    active={selected?.usn === m.usn}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
      {selectedUsn ? (
        <ProfilePanel usn={selectedUsn} onClose={() => router.push("/team")} />
      ) : null}
    </>
  );
}
