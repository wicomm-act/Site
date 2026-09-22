import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, ArrowUpRightIcon, ChipIcon, CodeIcon, SignalIcon } from "@/components/Icons";
import { BoardLab } from "@/components/BoardLab";
import { MemberPhoto } from "@/components/MemberPhoto";
import { club, members } from "@/data/team";

const explorations = [
  { title: "Start with the board.", text: "From your first connection to your next prototype. Explore microcontrollers, understand the pins, and make things respond.", tags: ["ESP32", "STM32", "Sensors & circuits"], Icon: ChipIcon },
  { title: "Give it instructions.", text: "The code is where it comes alive. Work with firmware, read a sensor, control an output, and learn by debugging.", tags: ["C / C++", "Embedded programming", "Debugging"], Icon: CodeIcon },
  { title: "Connect the possibilities.", text: "Take an idea beyond a single board. Explore wireless communication and the way devices share information.", tags: ["Wi-Fi", "Bluetooth", "IoT"], Icon: SignalIcon },
];

export default function HomePage() {
  return (
    <main>
      <section className="hero page-width" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">Build<br />something<br /><span>real.</span><span className="heading-period" aria-hidden="true"><ArrowUpRightIcon /></span></h1>
          <p>{club.description}</p>
          <div className="hero-actions"><Link href="#explore" className="button button-dark">Explore WICOMM <ArrowIcon /></Link><Link href="/team" className="text-link">Meet the team <ArrowUpRightIcon /></Link></div>
        </div>
        <figure className="hero-hardware">
          <div className="hardware-topline"><span>IDEAS IN. POSSIBILITIES OUT.</span><ChipIcon /></div>
          <div className="hardware-orbit" aria-hidden="true" />
          <span className="board-side-note" aria-hidden="true">DESIGNED TO BE BUILT ON</span>
          <Image src="/images/esp32-s3.webp" alt="An ESP32-S3 development board with a wireless module, input/output pins, and USB connectors" width={674} height={561} preload className="hero-board" />
          <span className="board-callout callout-radio"><span />Wi-Fi + Bluetooth LE</span>
          <span className="board-callout callout-pins"><span />A whole world of I/O</span>
          <figcaption><div><span className="board-caption-name">ESP32-S3</span><span className="board-caption-detail">Small board. Endless starting points.</span></div><span className="hardware-chip">Hardware, meet curiosity.</span></figcaption>
        </figure>
      </section>

      <div className="discipline-strip"><div className="page-width"><span>A technical sub-club of <strong>ACSA</strong></span><div><span>Embedded systems</span><span>Creative coding</span><span>Connected hardware</span></div><span className="strip-symbol" aria-hidden="true"><CodeIcon /></span></div></div>

      <section id="explore" className="explore-section page-width">
        <div className="section-intro"><h2>Curiosity is the<br />only prerequisite.</h2><p>A little hardware. A little software. A lot of figuring it out together. This is where we explore what happens when the two connect.</p></div>
        <div className="exploration-list">{explorations.map(({ title, text, tags, Icon }) => <article className="exploration-row" key={title}><div className="exploration-title"><Icon /><h3>{title}</h3></div><div className="exploration-description"><p>{text}</p><ul aria-label="Topics">{tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></div></article>)}</div>
      </section>

      <section className="lab-section" id="playground">
        <div className="page-width">
          <div className="section-intro lab-intro"><h2>A few lines.<br /><span>A visible difference.</span></h2><div><p>Every build starts somewhere. Sometimes, it’s as simple as turning on a light.</p><p className="lab-invitation">Pick a board. Try the code. See what changes.</p></div></div>
          <BoardLab />
          <div className="lab-section-bottom"><span>One small experiment. A new way to understand.</span><CodeIcon /></div>
        </div>
      </section>

      <section className="people-section page-width">
        <div className="section-intro people-intro"><h2>Good builds start<br />with good people.</h2><div><p>The minds connecting the dots. Meet the students behind WICOMM.</p><Link href="/team" className="text-link">Meet all {members.length} members <ArrowUpRightIcon /></Link></div></div>
        <div className="featured-members">{members.slice(0, 3).map((member) => <Link href={`/team/u/${member.usn}`} className="featured-member" key={member.usn}><div className="featured-photo"><MemberPhoto usn={member.usn} name={member.name} size="card" /><span className="member-open"><ArrowUpRightIcon /></span></div><div className="featured-details"><h3>{member.name}</h3><span>{member.role}</span></div></Link>)}</div>
      </section>

      <section className="get-involved page-width" id="get-involved"><div className="join-copy"><h2>Bring your curiosity.<br />Let’s build the rest.</h2><p>Have a question, an idea, or just want to know where to start? Say hello to the team.</p><Link href={`/team/u/${members[0].usn}`} className="button button-dark">Connect with us <ArrowUpRightIcon /></Link></div><div className="join-symbol" aria-hidden="true"><CodeIcon /></div><span className="join-footnote">WICOMM × ACSA</span></section>
    </main>
  );
}
