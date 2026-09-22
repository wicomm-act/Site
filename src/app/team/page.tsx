import type { Metadata } from "next";
import { TeamBoard } from "@/components/TeamBoard";

export const metadata: Metadata = {
  title: "Team",
};

export default function TeamPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-14">
      <TeamBoard />
    </main>
  );
}
