// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MemberProfile({ member }: { member: any }) {
  if (!member)
    return (
      <div className="text-center text-gray-500">No member data available.</div>
    );

  return (
    <pre className="text-xs whitespace-pre-wrap break-words overflow-x-auto">
      {JSON.stringify(member, null, 2)}
    </pre>
  );
}
