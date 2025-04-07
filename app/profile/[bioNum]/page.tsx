import { fetchAllMembers, fetchCongressMember } from "@/api/api";
import { MemberProfile } from "./profile";

export const revalidate = 3600;

export async function generateStaticParams(): Promise<{ bioNum: string }[]> {
  const members = await fetchAllMembers();

  return members.map((member) => ({
    bioNum: member.bioguideId,
  }));
}

//TODO: figure out the problem with the type error here. It's expecting a promise
/* eslint-disable  @typescript-eslint/no-explicit-any */
export default async function ProfilePage(props: any) {
  const params = await props.params;

  if (!params?.bioNum) {
    return <div className="text-red-500">Error: No bio number provided</div>;
  }

  const member = await fetchCongressMember(params.bioNum);

  if (!member) {
    return <div className="text-red-500">Error: Member not found</div>;
  }

  return (
    <div>
      <MemberProfile member={member} />
    </div>
  );
}
