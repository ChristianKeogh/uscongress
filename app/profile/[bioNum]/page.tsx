import { fetchAllMembers, fetchCongressMember } from "@/api/api";
import { MemberProfile } from "./profile";

export async function generateStaticParams(): Promise<{ bioNum: string }[]> {
  const members = await fetchAllMembers();

  return members.map((member) => ({
    bioNum: member.bioguideId,
  }));
}
export type paramsType = Promise<{ id: string }>;

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ bioNum: string }>;
}) {
  const { bioNum } = await params;

  if (!bioNum) {
    return <div className="text-red-500">Error: No bio number provided</div>;
  }

  const member = await fetchCongressMember(bioNum);

  if (!member) {
    return <div className="text-red-500">Error: Member not found</div>;
  }

  return (
    <div>
      <MemberProfile member={member} />
    </div>
  );
}
