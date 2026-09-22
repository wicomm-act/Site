---
name: WICOMM
description: Original hardware identity in black, charcoal, white, and neon green.
colors:
  bg: "#000000"
  fg: "#f5f5f5"
  muted: "#a6a6a6"
  line: "#2b2b2b"
  panel: "#101010"
  panel-raised: "#191919"
  accent: "#7dff2a"
  accent-hover: "#a5ff6b"
typography:
  headline:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "clamp(30px, 3.2vw, 44px)"
    fontWeight: 750
    lineHeight: 1.2
    letterSpacing: "-.03em"
  title:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "20px"
    fontWeight: 750
    letterSpacing: "-.02em"
  body:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.9
  label:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "12px"
    fontWeight: 700
  code:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.85
rounded:
  compact: "4px"
  control: "5px"
  action: "6px"
  media: "8px"
  enclosure: "12px"
spacing:
  tight: "8px"
  compact: "12px"
  inline: "18px"
  content: "24px"
  group: "28px"
  section: "32px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.bg}"
    typography: "{typography.label}"
    rounded: "{rounded.action}"
    padding: "14px 21px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-inverse:
    backgroundColor: "{colors.bg}"
    textColor: "#fff"
    typography: "{typography.label}"
    rounded: "{rounded.action}"
    padding: "14px 21px"
  button-outline:
    textColor: "{colors.fg}"
    rounded: "{rounded.action}"
    padding: "12px 18px"
  search:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.fg}"
    rounded: "{rounded.control}"
    padding: "0 17px"
  filter:
    backgroundColor: "{colors.panel-raised}"
    textColor: "{colors.fg}"
    rounded: "{rounded.compact}"
    padding: "9px 15px"
  filter-selected:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.bg}"
  member-card:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.fg}"
    rounded: "{rounded.action}"
    padding: "8px"
---

# Design System: WICOMM

## Overview

**Creative North Star: "Original hardware identity"**

Black and charcoal frame real development-board imagery, heavyweight Montserrat, and vivid logo-green actions. The user-approved dark theme supersedes the cream/forest/Manrope direction entirely. Controls are compact and direct; the existing catalog composition remains intact.

**Key Characteristics:**
- Original raster identity, never a replacement logo drawing.
- Tonal dark surfaces, white text, and functional neon-green emphasis.
- Hardware imagery, visible code, and honest square portrait fallbacks.

## Colors

### Primary
**Neon green** (`accent`) marks actions, selected filters, code highlights, and LED state; **hover green** (`accent-hover`) lightens interactive fills. Green also legitimately fills the invitation panel and roster count stamp.

### Neutral
**Black** (`bg`) is the page canvas; **charcoal** (`panel`, `panel-raised`) separates cards and controls. **White** (`fg`) carries primary text, **gray** (`muted`) supporting text, and **divider gray** (`line`) structural rules. QR images retain their white backing.

**The Functional Green Rule.** Use green for emphasis and interaction, including the existing large invitation surface; do not introduce a competing UI accent.

## Typography

**Display / Body Font:** Montserrat, sans-serif, supplied through `--font-display` by `next/font`. **Code Font:** JetBrains Mono, monospace, through `--font-code`.

The ramp is deliberately contrast-heavy, not a mathematical scale: tightly tracked heavy display type above compact, more openly led supporting text. Hero display uses weight 800, `clamp(64px, 6.5vw, 88px)`, line-height 1.02; team display uses weight 800, `clamp(42px, 5.9vw, 78px)`, line-height 1.04. Shared section headlines use the frontmatter headline role; the invitation increases weight to 800. Member names range from 19–20px at weight 750; roster section titles are 21px. Supporting paragraphs range from 12–15px with line-height 1.8–1.9. Body copy has no global fixed size.

**The One Sans Rule.** Keep headings, navigation, member metadata, and body copy in Montserrat; reserve JetBrains Mono for code, filenames, pins, LED readouts, and technical board callouts.

## Theme selection

Dark is the default. The navigation's Light/Dark button switches `data-theme` on the document and stores the choice under `wicomm-theme`. A head script restores it before hydration; cross-tab storage events keep open pages synchronized. Storage failures still allow switching for the current page session.

The optional white theme uses `#ffffff` ground, `#151815` text, `#586058` secondary text, and light neutral panels. Neon green remains the control fill; `#286800` is used for readable green text and focus outlines on white. The coding demo keeps its dark editor surface. Both themes retain Montserrat and the same layouts. The light logo symbol is cropped from the supplied `logo-white.jpeg`; neither original logo nor QR files are modified. Below 360px the header uses two rows to keep the theme toggle and navigation accessible.

## Layout

The centered container caps at 1240px with 48px desktop side gutters. At widths ≤1100px gutters become 32px; at ≤800px they become 20px. Shared intro and catalog rows use paired columns with fine dividers rather than a universal card grid. Large sections have roughly 100–112px vertical breathing room, contracting to 76px at ≤800px and 63px at ≤600px for exploration/people sections. Spacing tokens name recurring observed values, not a mandatory arithmetic scale.

- **Home:** Hero uses equal columns; intro, catalog, and lab layouts use roughly 1.2:1 columns. At ≤600px hero, intros, catalog rows, lab panes, and the three-column featured roster stack. Code scrolls horizontally within its pane. Hero display steps through 68px (≤1100px), 54px (≤800px), then `clamp(44px, 14.5vw, 76px)` (≤600px).
- **Navigation/footer:** Sticky header is 96px tall, then 80px at ≤800px and 76px at ≤600px. The contact CTA hides at ≤800px; Explore hides at ≤600px. Home and team links remain, without an invented hamburger menu. Footer groups stack on phones.
- **Roster:** A section-heading rail precedes three member columns. Columns reduce to two at ≤1000px; the rail stacks at ≤700px. Two member columns remain at ≤440px, with smaller card internals. Single-member sections use a horizontal card. A ≥1400px rule widens the rail; a ≥1500px rule increases hero height.
- **Profile:** Native dialog width is `min(820px, calc(100% - 32px))`, with maximum height `calc(100dvh - 48px)` and internal vertical scrolling. Portrait/details remain paired until ≤440px; footer content stacks at ≤700px.

## Elevation & Depth

Dark tonal layering and thin borders establish structure at rest. Roster-card hover lifts by 4px and adds a diffuse shadow plus border halo; the modal has a deep ambient shadow and blurred dark backdrop. These are not hard offset shadows. The isolated hardware image has its own photographic drop shadow, not a reusable card elevation token.

**The Tonal First Rule.** Separate resting UI with charcoal surfaces and dividers; reserve elevated shadows for member-card hover and the modal.

Exact reusable shadows, transitions, and breakpoints live in `.impeccable/design.json`. CSS transitions run for 150–200ms. Reduced-motion CSS removes animation and transitions, disables smooth scrolling, and removes roster hover transforms; it does not stop the explicitly requested JavaScript blink timer.

## Shapes

Use compact rounded rectangles: small tags and roster actions, slightly rounder search/selector controls, shared action/card corners, media/modal corners, and larger lab/invitation enclosures. Portraits remain square, with cover-cropped images or container-relative initials. Circles remain native to indicator dots, action arrows, the hardware orbit, and LED construction; they are not a general pill-card rule. Structural dividers are predominantly 1px.

## Components

- **Brand / navigation / footer:** `LogoMark` renders the original `/logo-black.jpeg` through `next/image`, with `object-fit: contain`; the named home link supplies its accessible identity. Preserve `/logo-qr.png` and every original `public/qr/*.png`. Navigation uses muted links, white hover/current text, and a green current-page dot with `aria-current`.
- **Actions:** Primary links/buttons use green on black text, a 50px minimum height, and lighter-green hover. The invitation reverses this to a black action with white text. The outlined navigation CTA becomes green on hover. Lab and roster actions are denser variants, not an enforced global 50px rule. Disabled buttons visibly dim; text links underline on hover. Icons are inline SVG, not text glyphs.
- **Catalog / tags:** Preserve ruled topic rows with icon/title and supporting copy; topic chips are noninteractive, outlined, compact rectangles. Do not treat them as filter controls.
- **BoardLab:** A bordered rounded enclosure pairs readable code with an LED preview. ESP32/STM32 buttons expose `aria-pressed`; switching boards resets output and stops blinking. Manual toggle is disabled while blinking. Blink is opt-in, toggles every 800ms, and has a stop action. The simulation disclaimer remains visible; no real hardware connection or code execution is claimed. Manual LED status is politely announced; announcements switch off during blinking.
- **Roster search / filters:** Search has a real label, dark field, and green focus-within outline; it matches name, role, or USN case-insensitively. Section filters wrap and expose `aria-pressed`. The result count is a polite atomic status. Empty results offer reset; reset clears filters and focuses search.
- **Member cards / photos:** Cards are named profile links with restrained hover lift and rotating SVG arrows; the selected member has a green outline. `MemberPhoto` keeps square images, lazy-loads cards, eagerly loads profiles, and falls back to initials on missing/failed portraits. Its legacy tone class names do not describe the current charcoal/green palette. The image slot is hidden from assistive technology because adjacent text/link names identify the member.
- **Profile dialog / QR:** Use native `dialog.showModal()` with a named heading, body scroll lock, Close, Escape, and outside-pointer dismissal. Closing navigates to `/team`. Keep contact email, unknown-member handling, canonical member URL, and downloadable original QR image. QR presentation uses a white backing and descriptive alt text, not a generated substitute.
- **Keyboard access:** Keep the skip-to-content link, semantic links/buttons, and visible focus outlines. Global focus is green with 3px/5px offset; on the green contact panel, the outline is black (`#000`) with the same width and offset. Roster/dialog controls use 2px/4px offset and search uses 2px/3px offset. Source inspection confirms these implementations, not a browser or WCAG audit.

## Do's and Don'ts

### Do:
- **Do** retain the original logo image and unmodified branded QR assets.
- **Do** preserve the catalog hierarchy, simulated LED controls, searchable roster, and native profile dialog.
- **Do** keep selected, disabled, focus, empty, and missing-photo states explicit.

### Don't:
- **Don't** restore cream/forest surfaces or Manrope; the approved direction is dark Montserrat with neon green.
- **Don't** imply simulated output is connected hardware or initials are real portraits.
- **Don't** replace supplied identity assets with SVG redraws or recolored QR codes.

Not canonized: decorative uppercase hardware slogans/kicker treatments and undersized 7–9px ancillary labels are carried craft/legibility defects, not reusable typography rules; unused color aliases and isolated illustration colors are not palette tokens.

Evidence: `src/app/globals.css`, `layout.tsx`, `page.tsx`; `LogoMark`, `SiteNav`, `SiteFooter`, `BoardLab`, `TeamBoard`, and `MemberPhoto`, including their CSS modules. Sidecar ramps are synthesized preview metadata, not additional shipped palette tokens. Documentation validation is source/schema based; refreshed browser screenshots are outside this record.
