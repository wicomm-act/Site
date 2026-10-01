"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { ArrowIcon, ArrowUpRightIcon } from "@/components/Icons";
import { boards } from "@/data/boards";
import styles from "./HardwareCarousel.module.css";

const rotationInterval = 3000;

function subscribeMotion(onChange: () => void) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", onChange);
  return () => preference.removeEventListener("change", onChange);
}

function subscribeVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

export function HardwareCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const [motionOverride, setMotionOverride] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const rotationRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const slideId = useId();
  const selectId = useId();
  const reducedMotion = useSyncExternalStore(subscribeMotion, () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => true);
  const pageVisible = useSyncExternalStore(subscribeVisibility, () => document.visibilityState === "visible", () => false);
  const rotationEnabled = !paused && (!reducedMotion || motionOverride);
  const running = rotationEnabled && !hovered && inView && pageVisible;
  const board = boards[active];
  const next = (active + 1) % boards.length;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setActive((index) => (index + 1) % boards.length), rotationInterval);
    return () => window.clearTimeout(timer);
  }, [active, running]);

  function choose(index: number) {
    setPaused(true);
    setActive((index + boards.length) % boards.length);
  }

  return (
    <section
      ref={rootRef}
      className={styles.carousel}
      aria-label="Development boards"
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={(event) => {
        if (event.target !== rotationRef.current) setPaused(true);
      }}
      onKeyDown={(event) => {
        if (event.target instanceof HTMLSelectElement) return;
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          choose(active + (event.key === "ArrowLeft" ? -1 : 1));
        }
      }}
    >
      <div className={styles.controls}>
        <button
          ref={rotationRef}
          type="button"
          className={styles.rotation}
          aria-label={rotationEnabled ? "Pause board rotation" : "Start board rotation"}
          aria-controls={slideId}
          onClick={() => {
            setPaused(rotationEnabled);
            if (!rotationEnabled) setMotionOverride(true);
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {rotationEnabled ? <path d="M9 5v14M15 5v14" /> : <path d="m8 5 11 7-11 7V5Z" />}
          </svg>
          <span>{rotationEnabled ? "Pause" : "Play"}</span>
        </button>
        <span className={styles.counter} aria-hidden="true">{String(active + 1).padStart(2, "0")} <span>/ {String(boards.length).padStart(2, "0")}</span></span>
        <div className={styles.arrows}>
          <button type="button" aria-label="Previous board" aria-controls={slideId} onClick={() => choose(active - 1)}><ArrowIcon className={styles.previous} /></button>
          <button type="button" aria-label="Next board" aria-controls={slideId} onClick={() => choose(active + 1)}><ArrowIcon /></button>
        </div>
      </div>

      <div id={slideId} aria-live={rotationEnabled ? "off" : "polite"} aria-atomic="true">
        <figure role="group" aria-roledescription="slide" aria-label={`${active + 1} of ${boards.length}: ${board.name}`}>
          <div
            className={styles.stage}
            onTouchStart={(event) => {
              const touch = event.touches[0];
              touchStart.current = { x: touch.clientX, y: touch.clientY };
            }}
            onTouchCancel={() => { touchStart.current = null; }}
            onTouchEnd={(event) => {
              if (!touchStart.current) return;
              const touch = event.changedTouches[0];
              const x = touch.clientX - touchStart.current.x;
              const y = touch.clientY - touchStart.current.y;
              touchStart.current = null;
              if (Math.abs(x) > 45 && Math.abs(x) > Math.abs(y) * 1.5) choose(active + (x < 0 ? 1 : -1));
            }}
          >
            <div className={styles.orbit} aria-hidden="true" />
            {boards.map((item, index) => index === active || index === next ? (
              <Image
                key={item.id}
                src={item.image}
                alt={index === active ? item.alt : ""}
                fill
                sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 1100px) 45vw, 580px"
                preload={index === 0}
                loading={index === 0 ? undefined : "eager"}
                className={index === active ? styles.boardImage : styles.preloadImage}
                aria-hidden={index !== active}
              />
            ) : null)}
          </div>
          <figcaption className={styles.details}>
            <div className={styles.titleRow}>
              <h2>{board.name}</h2>
              <a href={board.source} target="_blank" rel="noreferrer" aria-label={`Read ${board.name} specifications (opens in a new tab)`} title="Board specifications"><ArrowUpRightIcon /></a>
            </div>
            <p className={styles.model}>{board.model}</p>
            <p className={styles.description}>{board.description}</p>
            <ul aria-label="Key specifications">{board.specs.map((spec) => <li key={spec}>{spec}</li>)}</ul>
          </figcaption>
        </figure>
      </div>

      <div className={styles.selector}>
        <label htmlFor={selectId}>Choose a board</label>
        <select id={selectId} value={active} onChange={(event) => choose(Number(event.target.value))}>
          {boards.map((item, index) => <option key={item.id} value={index}>{item.name}</option>)}
        </select>
      </div>
    </section>
  );
}
