/* eslint-disable @next/next/no-img-element */
import { fetchAllMembers } from "@/api/api";
import { Member } from "@/models/membercard-model";
import Link from "next/link";

function MemberCard({ member }: { member: Member }) {
  const { name, partyName, state, terms, depiction, url, bioguideId } = member;

  // Get the last term if terms.item exists
  const lastTerm = terms?.item?.length
    ? terms.item[terms.item.length - 1]
    : null;

  //TODO: right now we are just looking at the most recent stint in whichever house or senate and counting from there, we should instead count the first

  const chamber = lastTerm?.chamber || "Unknown";
  const startYear = terms?.item[0].startYear || "N/A";

  return (
    <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm">
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
        <p className="text-xs">
          {name.includes("Vance") ? "Vice President" : chamber}
        </p>
        <p className="text-xs">Active Since: {startYear}</p>
        {depiction?.imageUrl && url && (
          <Link
            href={bioguideId ? `/profile/${bioguideId}` : "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-blue-600 text-xs underline ${
              !bioguideId && "pointer-events-none opacity-50"
            }`}
          >
            View Profile
          </Link>
        )}
      </div>
    </div>
  );
}

export default async function Home() {
  const congress = await fetchAllMembers();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      US Congress
      <br />
      Current Amount: {congress.length}
      <div className="grid grid-cols-6 gap-4">
        {" "}
        {congress.map((member) => (
          <MemberCard key={member.bioguideId} member={member} />
        ))}{" "}
      </div>
    </div>
  );
}
