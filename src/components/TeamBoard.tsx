"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { MemberPhoto } from "@/components/MemberPhoto";
import { ArrowUpRightIcon, CloseIcon, DownloadIcon, ResetIcon } from "@/components/Icons";
import {
  getMemberByUsn,
  memberProfileUrl,
  memberQrFileName,
  memberQrSrc,
  members,
  membersInSection,
  rosterSections,
  type Member,
} from "@/data/team";
import styles from "./TeamBoard.module.css";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h16m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MemberCard({ member, active }: { member: Member; active: boolean }) {
  return (
    <Link
      href={`/team/u/${member.usn}`}
      scroll={false}
      className={`${styles.card} ${active ? styles.activeCard : ""}`}
      aria-label={`${member.name}, ${member.role}. View profile`}
    >
      <div className={styles.cardPhoto}>
        <MemberPhoto usn={member.usn} name={member.name} size="card" />
        <span className={styles.cardArrow}><Arrow diagonal /></span>
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardName}>{member.name}</h3>
        <p className={styles.cardRole}>{member.role}</p>
        <div className={styles.cardMeta}>
          <span>{member.usn}</span>
          <span>{member.year}</span>
        </div>
      </div>
    </Link>
  );
}

function ProfilePanel({ usn, onClose }: { usn: string; onClose: () => void }) {
  const member = getMemberByUsn(usn);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const backdropPress = useRef(false);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const overflow = document.body.style.getPropertyValue("overflow");
    const priority = document.body.style.getPropertyPriority("overflow");
    dialog.showModal();
    document.body.style.setProperty("overflow", "hidden");
    return () => {
      dialog.close();
      if (overflow) document.body.style.setProperty("overflow", overflow, priority);
      else document.body.style.removeProperty("overflow");
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onPointerDown={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        backdropPress.current = event.target === event.currentTarget &&
          (event.clientX < rect.left || event.clientX > rect.right ||
            event.clientY < rect.top || event.clientY > rect.bottom);
      }}
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        if (backdropPress.current && event.target === event.currentTarget &&
          (event.clientX < rect.left || event.clientX > rect.right ||
            event.clientY < rect.top || event.clientY > rect.bottom)) onClose();
        backdropPress.current = false;
      }}
    >
      <div className={styles.dialogTop}>
        <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close profile">
          Close <CloseIcon width={18} height={18} />
        </button>
      </div>
      {member ? (
        <>
          <div className={styles.profileMain}>
            <div className={styles.profilePhoto}>
              <MemberPhoto usn={member.usn} name={member.name} size="profile" />
            </div>
            <div className={styles.profileDetails}>
              <h2 id={titleId} className={styles.profileName}>{member.name}</h2>
              <p className={styles.roleBadge}>{member.role}</p>
              <dl className={styles.profileData}>
                <div><dt>Student ID</dt><dd>{member.usn}</dd></div>
                <div><dt>Year</dt><dd>{member.year}</dd></div>
              </dl>
              <a href={`mailto:${member.email}`} className={styles.emailLink}>
                <span>{member.email}</span><Arrow diagonal />
              </a>
            </div>
          </div>
          <div className={styles.profileFooter}>
            <div className={styles.qrBlock}>
              {/* QR files are generated locally and must remain downloadable originals. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={memberQrSrc(member.name)} alt={`Profile QR code for ${member.name}`} width={120} height={120} className={styles.qrImage} />
              <div>
                <p className={styles.qrTitle}>Scan. Connect.</p>
                <a href={memberQrSrc(member.name)} download={memberQrFileName(member.name)} className={styles.textLink}>
                  Download QR <DownloadIcon width={14} height={14} />
                </a>
              </div>
            </div>
            <div className={styles.canonical}>
              <p className={styles.eyebrow}>Profile link</p>
              <a href={memberProfileUrl(member.usn)} className={styles.textLink}>
                {memberProfileUrl(member.usn)} <ArrowUpRightIcon width={14} height={14} />
              </a>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.unknown}>
          <h2 id={titleId}>No member on file.</h2>
          <span className={styles.roleBadge}>Unknown USN</span>
          <p>We couldn’t find a member with the student ID <span className={styles.unknownUsn}>{usn}</span>.</p>
          <button type="button" className={styles.primaryButton} onClick={onClose}>Browse the team <Arrow /></button>
        </div>
      )}
    </dialog>
  );
}

export function TeamBoard({ selectedUsn }: { selectedUsn?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [sectionFilter, setSectionFilter] = useState("All");
  const searchRef = useRef<HTMLInputElement>(null);
  const searchId = useId();
  const selected = selectedUsn ? getMemberByUsn(selectedUsn) : null;
  const search = query.trim().toLowerCase();
  const filteredSections = rosterSections.map((section, index) => ({
    ...section,
    index,
    people: sectionFilter === "All" || sectionFilter === section.title
      ? membersInSection(section.roles).filter((member) =>
        [member.name, member.role, member.usn].some((value) => value.toLowerCase().includes(search)))
      : [],
  })).filter((section) => section.people.length > 0);
  const visibleCount = filteredSections.reduce((count, section) => count + section.people.length, 0);
  const hasFilters = query.length > 0 || sectionFilter !== "All";
  const closeProfile = useCallback(() => router.push("/team", { scroll: false }), [router]);

  function resetFilters() {
    setQuery("");
    setSectionFilter("All");
    searchRef.current?.focus();
  }

  return (
    <div className={styles.board}>
      <header className={styles.intro}>
        <div>
          <h1>The people behind<br />the builds<span className={styles.limePeriod}>.</span></h1>
          <p className={styles.introText}>Meet the students building WICOMM. From boards and firmware to the work that brings us together.</p>
        </div>
        <div className={styles.rosterStamp}>
          <span className={styles.stampNumber}>{String(members.length).padStart(2, "0")}</span>
          <span>Members<br />{String(rosterSections.length).padStart(2, "0")} wings</span>
        </div>
      </header>

      <div className={styles.controls}>
        <div className={styles.searchRow}>
          <label className={styles.searchBox} htmlFor={searchId}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.6" />
              <path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span className={styles.srOnly}>Search team by name, role, or USN</span>
            <input ref={searchRef} id={searchId} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, role or USN" autoComplete="off" />
          </label>
          <p className={styles.resultCount} role="status" aria-live="polite" aria-atomic="true">
            {String(visibleCount).padStart(2, "0")} / {members.length} members
          </p>
        </div>
        <div className={styles.filterRow} role="group" aria-label="Filter team by section">
          {["All", ...rosterSections.map((section) => section.title)].map((title) => (
            <button key={title} type="button" className={`${styles.filter} ${sectionFilter === title ? styles.selectedFilter : ""}`} aria-pressed={sectionFilter === title} onClick={() => setSectionFilter(title)}>
              {title === "All" ? "All members" : title}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.directory}>
        {filteredSections.map((section) => (
          <section className={styles.section} key={section.title} aria-labelledby={`team-section-${section.index}`}>
            <div className={styles.sectionHeading}>
              <h2 id={`team-section-${section.index}`}>{section.title}</h2>
              <p>{section.people.length} {section.people.length === 1 ? "member" : "members"}</p>
            </div>
            <div className={`${styles.memberGrid} ${section.people.length === 1 ? styles.singleMember : ""}`}>
              {section.people.map((member) => <MemberCard key={member.usn} member={member} active={selected?.usn === member.usn} />)}
            </div>
          </section>
        ))}
        {visibleCount === 0 ? (
          <div className={styles.emptyState}>
            <h2>No matching members.</h2>
            <p>Search a name, role or USN, or reset to see the whole team.</p>
            <button type="button" onClick={resetFilters} className={styles.primaryButton}>Reset filters <Arrow /></button>
          </div>
        ) : hasFilters ? (
          <button type="button" onClick={resetFilters} className={styles.resetButton}>Reset filters <ResetIcon width={18} height={18} /></button>
        ) : null}
      </div>
      {selectedUsn !== undefined ? <ProfilePanel key={selectedUsn} usn={selectedUsn} onClose={closeProfile} /> : null}
    </div>
  );
}
