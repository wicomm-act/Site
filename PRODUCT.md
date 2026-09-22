# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Students interested in embedded development boards and coding who want to learn about WICOMM and find its team.

## Product Purpose

Introduce WICOMM, a technical sub-club of ACSA, with embedded hardware and coding central to its identity. ESP32 and STM32 are explicit areas of interest.

## Capabilities and Constraints

The Next.js site has a homepage, team roster, and deep-linked member profiles at `/team/u/{USN}`. Preserve all 13 members, roles, years, contact information, square photo slots, and name-based branded QR files. QR codes target `https://wicomm.in/team/u/{USN}`. Member photographs may be absent; show initials without implying that generated portraits are real.

Visitors can choose dark or white theme from the shared navigation. Dark remains the default, and the choice persists across navigation and reloads when browser storage is available.

## Brand Commitments

Keep the WICOMM name, ACSA relationship, original logo image files, and logo-centered QR assets. The user explicitly rejected the first redesign's font and sage/cream theme and requested the original logo and existing assets. Use the supplied black, white, and vivid green branding rather than a recreated SVG logo or a new muted palette. The user subsequently confirmed they love the dark theme and asked to continue; retain it. Student-focused content remains approved; do not fabricate project showcases.

## Evidence on Hand

`src/data/team.ts` contains the approved roster. `public/logo-qr.png` is the supplied QR logo. `public/qr/` contains member QR codes. No completed-project details, project photographs, event schedules, recruitment form, or club social URLs have been provided. Do not invent them.

## Product Principles

- Make the club's embedded-hardware and coding focus immediately clear.
- Preserve the roster and reliable member deep links.
- Distinguish interactive educational demonstrations from real connected hardware.
- Keep navigation and member contact straightforward on phones and desktops.
