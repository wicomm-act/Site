import type { Metadata } from "next";
import { TeamBoard } from "@/components/TeamBoard";

export const metadata: Metadata = {
  title: "Team",
};

export default function TeamPage() {
  return (
    <main className="page-width team-shell">
      <TeamBoard />
    </main>
  );
}
