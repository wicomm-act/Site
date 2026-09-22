# WICOMM

Sample site for **WICOMM**, the technical sub-club of ACSA.

Built with Next.js 16 (App Router).

## Routes

- `/` — home
- `/team` — roster
- `/team/u/{usn}` — same roster with that member’s profile open

Example: `/team/u/NNM23AC034`

Photos: drop WebPs at `public/profile/team/{USN}.webp` (e.g. `NNM23AC034.webp`). Until a file exists, the card keeps a square slot with initials.

Member QRs (scan → `https://wicomm.in/team/u/{USN}`) live in `public/qr/{Name}.png`, WICOMM logo in the center. Regenerate after roster changes:

```bash
npm run qr
```

## Dev

```bash
npm run dev
```
