import { fetchCongressMember } from "@/api/api";
import MemberProfile from "./profile";

export default async function ProfilePage({
  params,
}: {
  params: { bioNum: string };
}) {
  const { bioNum } = await params;
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
