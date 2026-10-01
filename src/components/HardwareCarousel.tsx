"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowIcon, ChipIcon } from "@/components/Icons";

const rotationInterval = 3000;

const slides = [
  {
    id: "esp32-s3",
    name: "ESP32-S3 DevKitC-1",
    detail: "Wireless experiments with room to grow.",
    chip: "Wi-Fi, Bluetooth, and USB.",
    image: "/images/esp32-s3.webp",
    alt: "ESP32-S3 DevKitC-1 development board",
    width: 674,
    height: 561,
    shape: "large",
    callouts: ["Wi-Fi + Bluetooth LE", "Dual-core Xtensa LX7"],
  },
  {
    id: "esp32-c3",
    name: "ESP32-C3 DevKitM-1",
    detail: "A compact entry into connected hardware.",
    chip: "Small board. Serious wireless.",
    image: "/images/boards/esp32-c3-devkitm-1.webp",
    alt: "ESP32-C3 DevKitM-1 development board",
    width: 392,
    height: 399,
    shape: "compact",
    callouts: ["32-bit RISC-V core", "Wi-Fi + Bluetooth LE"],
  },
  {
    id: "esp32-c6",
    name: "ESP32-C6 DevKitC-1",
    detail: "Modern wireless protocols on one board.",
    chip: "Built for connected systems.",
    image: "/images/boards/esp32-c6-devkitc-1.webp",
    alt: "ESP32-C6 DevKitC-1 development board",
    width: 1287,
    height: 1067,
    shape: "large",
    callouts: ["Wi-Fi 6 + Bluetooth LE", "IEEE 802.15.4"],
  },
  {
    id: "stm32-nucleo-f411re",
    name: "STM32 Nucleo F411RE",
    detail: "High-performance prototyping with flexible expansion.",
    chip: "Prototype beyond the breadboard.",
    image: "/images/boards/stm32-nucleo-f411re.webp",
    alt: "STM32 Nucleo F411RE development board",
    width: 1185,
    height: 1400,
    shape: "portrait",
    callouts: ["Arm Cortex-M4", "Integrated ST-LINK"],
  },
  {
    id: "stm32-f103c8t6",
    name: "STM32F103C8T6 Blue Pill",
    detail: "Bare metal. Full control.",
    chip: "Firmware, meet precision.",
    image: "/images/boards/stm32-blue-pill-f103c8t6.webp",
    alt: "STM32F103C8T6 Blue Pill development board",
    width: 784,
    height: 516,
    shape: "wide",
    callouts: ["Arm Cortex-M3", "37 GPIO pins"],
  },
  {
    id: "silabs-bgm220p",
    name: "BGM220P Explorer Kit",
    detail: "Bluetooth development in a focused form.",
    chip: "Low power. Ready to connect.",
    image: "/images/boards/silabs-bgm220p-explorer.webp",
    alt: "Silicon Labs BGM220P Explorer Kit",
    width: 311,
    height: 493,
    shape: "portrait",
    callouts: ["Bluetooth Low Energy", "On-board sensors"],
  },
  {
    id: "silabs-efr32bg22",
    name: "EFR32BG22 Explorer Kit",
    detail: "Energy-conscious Bluetooth prototyping.",
    chip: "Wireless built for efficiency.",
    image: "/images/boards/silabs-efr32bg22-explorer.webp",
    alt: "Silicon Labs EFR32BG22 Explorer Kit",
    width: 314,
    height: 495,
    shape: "portrait",
    callouts: ["Bluetooth Low Energy", "Arm Cortex-M33"],
  },
  {
    id: "silabs-efr32fg25",
    name: "EFR32FG25 Pro Kit",
    detail: "A platform for long-range wireless work.",
    chip: "Sub-GHz systems, fully exposed.",
    image: "/images/boards/silabs-efr32fg25-pro-kit.webp",
    alt: "Silicon Labs EFR32FG25 Pro Kit",
    width: 595,
    height: 348,
    shape: "wide",
    callouts: ["Sub-GHz wireless", "Energy profiling"],
  },
  {
    id: "nxp-mcxn947",
    name: "NXP FRDM-MCXN947",
    detail: "Edge processing meets embedded control.",
    chip: "Compute closer to the hardware.",
    image: "/images/boards/nxp-frdm-mcxn947.webp",
    alt: "NXP FRDM-MCXN947 development board",
    width: 403,
    height: 405,
    shape: "compact",
    callouts: ["Dual-core Arm Cortex-M33", "Integrated NPU"],
  },
] as const;

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
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );
  const pageVisible = useSyncExternalStore(
    subscribeVisibility,
    () => document.visibilityState === "visible",
    () => false,
  );
  const running = !paused && !reducedMotion && !hovered && inView && pageVisible;
  const slide = slides[active];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(
      () => setActive((index) => (index + 1) % slides.length),
      rotationInterval,
    );
    return () => window.clearTimeout(timer);
  }, [active, running]);

  function choose(index: number) {
    setActive((index + slides.length) % slides.length);
  }

  return (
    <figure
      ref={rootRef}
      className="hero-hardware"
      aria-label="Featured development boards"
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHovered(false);
      }}
    >
      <div className="hardware-topline">
        <span>IDEAS IN. POSSIBILITIES OUT.</span>
        <ChipIcon />
      </div>
      <div className="hardware-orbit" aria-hidden="true" />
      <span className="board-side-note" aria-hidden="true">DESIGNED TO BE BUILT ON</span>

      <div className="hero-board-stage" aria-live={running ? "off" : "polite"} aria-atomic="true">
        {slides.map((item, index) => (
          <Image
            key={item.id}
            src={item.image}
            alt={index === active ? item.alt : ""}
            width={item.width}
            height={item.height}
            preload={index === 0}
            loading={index === 0 ? undefined : "eager"}
            className={`hero-board hero-board-${item.shape} ${index === active ? "is-active" : ""}`}
            aria-hidden={index !== active}
          />
        ))}
      </div>

      <span key={`${slide.id}-radio`} className="board-callout callout-radio"><span />{slide.callouts[0]}</span>
      <span key={`${slide.id}-pins`} className="board-callout callout-pins"><span />{slide.callouts[1]}</span>

      <figcaption>
        <div className="board-caption-copy" key={slide.id}>
          <span className="board-caption-name">{slide.name}</span>
          <span className="board-caption-detail">{slide.detail}</span>
        </div>
        <div className="hardware-carousel-actions">
          <span className="hardware-chip">{slide.chip}</span>
          <div className="hardware-carousel-controls" aria-label="Board carousel controls">
            <button type="button" onClick={() => choose(active - 1)} aria-label="Show previous board"><ArrowIcon className="carousel-previous" /></button>
            <span className="carousel-count" aria-hidden="true">{active + 1} / {slides.length}</span>
            <button type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Resume automatic board rotation" : "Pause automatic board rotation"} aria-pressed={paused}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {paused ? <path d="m8 5 11 7-11 7V5Z" /> : <path d="M9 5v14M15 5v14" />}
              </svg>
            </button>
            <button type="button" onClick={() => choose(active + 1)} aria-label="Show next board"><ArrowIcon /></button>
          </div>
        </div>
      </figcaption>
    </figure>
  );
}
