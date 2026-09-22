import { mkdir } from "node:fs/promises";
import path from "node:path";
import QRCode from "qrcode";
import sharp from "sharp";
import {
  memberProfileUrl,
  memberQrFileName,
  members,
} from "../src/data/team.ts";

const ROOT = path.join(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "qr");
const LOGO = path.join(ROOT, "public", "logo-qr.png");
const SIZE = 1024;
const LOGO_BOX = Math.round(SIZE * 0.26);

async function brandedQr(url: string) {
  const qr = await QRCode.toBuffer(url, {
    errorCorrectionLevel: "H",
    margin: 2,
    width: SIZE,
    color: { dark: "#07090c", light: "#ffffff" },
  });

  const inner = Math.round(LOGO_BOX * 0.84);
  const logo = await sharp(LOGO)
    .trim()
    .resize(inner, inner, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .png()
    .toBuffer();

  const badge = await sharp({
    create: {
      width: LOGO_BOX,
      height: LOGO_BOX,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .png()
    .composite([{ input: logo, gravity: "center" }])
    .toBuffer();

  return sharp(qr)
    .composite([{ input: badge, gravity: "center" }])
    .png();
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  for (const member of members) {
    const url = memberProfileUrl(member.usn);
    const file = path.join(OUT_DIR, memberQrFileName(member.name));
    await (await brandedQr(url)).toFile(file);
    console.log(`${member.name} -> ${path.relative(ROOT, file)}\n  ${url}`);
  }
}

main();
