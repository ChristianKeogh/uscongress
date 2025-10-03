import { fetchAllMembers, fetchCongressMember } from "@/api/api";
import { MemberProfile } from "./profile";

export const revalidate = 86400;

export async function generateStaticParams() {
  const members = await fetchAllMembers();

  return members.map((member) => ({
    bioNum: member.bioguideId,
  }));
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ bioNum: string }>;
}) {
  const { bioNum } = await params;

  const member = await fetchCongressMember(bioNum);

  if (!member) {
    return <div className="text-red-500">Error: Member not found</div>;
  }

  return <MemberProfile member={member} />;
}
