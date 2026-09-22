"use client";

import { useState } from "react";
import { memberPhotoSrc } from "@/data/team";
import styles from "./MemberPhoto.module.css";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

type Size = "card" | "profile";
const tones = [styles.sage, styles.mint, styles.olive, styles.fern];

export function MemberPhoto({
  usn,
  name,
  size,
}: {
  usn: string;
  name: string;
  size: Size;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const src = memberPhotoSrc(usn);
  const tone = [...usn.toUpperCase()].reduce((sum, character) => sum + character.charCodeAt(0), 0) % tones.length;

  return (
    <div className={`${styles.photo} ${tones[tone]} ${styles[size]}`} aria-hidden="true">
      <span className={styles.initials}>{initials(name)}</span>
      <span className={styles.corner} />
      {failedSrc !== src ? (
        // Missing portraits retain the initials beneath the image.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          className={styles.image}
          loading={size === "profile" ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailedSrc(src)}
        />
      ) : null}
    </div>
  );
}
