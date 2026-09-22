"use client";

import { useState } from "react";
import { memberPhotoSrc } from "@/data/team";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

type Size = "card" | "profile";

const box: Record<Size, string> = {
  card: "aspect-square w-full",
  profile: "aspect-square w-full",
};

export function MemberPhoto({
  usn,
  name,
  size,
}: {
  usn: string;
  name: string;
  size: Size;
}) {
  const [failed, setFailed] = useState(false);
  const src = memberPhotoSrc(usn);

  return (
    <div
      className={`relative overflow-hidden border border-line bg-bg ${box[size]}`}
    >
      {!failed ? (
        // Photos live in public/profile/team/{USN}.webp — missing files fall back to initials.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center font-mono text-xl tracking-widest text-accent sm:text-2xl">
          {initials(name)}
        </div>
      )}
    </div>
  );
}
