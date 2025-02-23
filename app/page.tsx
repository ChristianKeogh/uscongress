/* eslint-disable @next/next/no-img-element */
import { fetchAllMembers } from "@/app/api";
import { Member } from "@/components/card";

function MemberCard({ member }: { member: Member }) {
  const { name, partyName, state, terms, depiction, url } = member;
  const chamber = terms?.item?.[0]?.chamber || "Unknown";
  const startYear = terms?.item?.[0]?.startYear || "N/A";
  const endYear = terms?.item?.[0]?.endYear
    ? ` - ${terms.item[0].endYear}`
    : "";

  // if (endYear) {
  //   return <></>;
  // }
  return (
    <div>
      <img
        src={depiction?.imageUrl || "/placeholder.jpg"}
        alt={name}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="text-left">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-sm text-gray-500">
          {partyName} - {state}
        </p>
        <p className="text-xs">{chamber}</p>
        <p className="text-xs">
          Years active: {startYear} {endYear}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-xs underline"
        >
          View Profile
        </a>
      </div>
    </div>
  );
}

export default async function Home() {
  const congress = await fetchAllMembers();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      US Congress
      {/* <pre className="text-sm text-gray-700">
        {JSON.stringify(congress, null, 2)}
      </pre> */}
      <div className="grid grid-cols-6 gap-4">
        {" "}
        {congress.map((member) => (
          <MemberCard key={member.bioguideId} member={member} />
        ))}{" "}
      </div>
    </div>
  );
}
