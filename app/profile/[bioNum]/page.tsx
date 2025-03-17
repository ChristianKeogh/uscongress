import { fetchCongressMember } from "@/api/api";
import MemberProfile from "./profile";

export default async function ProfilePage({
  params: paramsPromise,
}: {
  params: Promise<{ bioNum: string }>;
}) {
  // Wait for params to resolve
  const params = await paramsPromise;

  if (!params.bioNum) {
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
