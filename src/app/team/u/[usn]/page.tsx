import type { Metadata } from "next";
import { TeamBoard } from "@/components/TeamBoard";
import { getMemberByUsn } from "@/data/team";

export async function generateMetadata({
  params,
}: PageProps<"/team/u/[usn]">): Promise<Metadata> {
  const { usn } = await params;
  const member = getMemberByUsn(usn);
  return {
    title: member ? `${member.name} · Team` : `Unknown · ${usn}`,
    description: member
      ? `${member.name} — ${member.role} at WICOMM (${member.usn}).`
      : `No WICOMM member linked to ${usn}.`,
  };
}

export default async function TeamMemberPage({
  params,
}: PageProps<"/team/u/[usn]">) {
  const { usn } = await params;
  return (
    <main className="page-width team-shell">
      <TeamBoard selectedUsn={usn} />
    </main>
  );
}
