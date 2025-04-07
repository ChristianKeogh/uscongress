/* eslint-disable @next/next/no-img-element */
import { fetchAllMembers } from "@/api/api";
import { Member } from "@/models/membercard-model";
import { Congress } from "@/models/wholecongress-model";
import Link from "next/link";

const MemberCard = ({ member }: { member: Member }) => {
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
};

const countCongressMembers = (members: Member[]): Congress => {
  const congress: Congress = {
    numDemocrats: { house: 0, senate: 0, total: 0 },
    numRepublicans: { house: 0, senate: 0, total: 0 },
    numIndo: { house: 0, senate: 0, total: 0 },
    numHouse: 0,
    numSenate: 0,
  };

  members.forEach((member) => {
    // if (member.name.toLowerCase() === "vance, j. d.") {
    //   console.log(member);
    //   return;
    // }
    // console.log(member);

    // if (member.name.toLowerCase() === "gaetz, matt") {
    //   console.log(member);
    //   return;
    // }
    const memberterm = member.terms.item.length - 1;
    const isHouse =
      member.terms.item[memberterm].chamber.toLowerCase() ===
      "house of representatives";
    const isSenate =
      member.terms.item[memberterm].chamber.toLowerCase() === "senate";

    if (isHouse) congress.numHouse++;
    if (isSenate) congress.numSenate++;

    switch (member.partyName.toLowerCase()) {
      case "democratic":
        if (isHouse) congress.numDemocrats.house++;
        if (isSenate) congress.numDemocrats.senate++;
        congress.numDemocrats.total++;
        break;
      case "republican":
        if (isHouse) congress.numRepublicans.house++;
        if (isSenate) congress.numRepublicans.senate++;
        congress.numRepublicans.total++;
        break;
      default:
        if (isHouse) congress.numIndo.house++;
        if (isSenate) congress.numIndo.senate++;
        congress.numIndo.total++;
        break;
    }
  });

  return congress;
};

export default async function Home() {
  const congress = await fetchAllMembers();

  const congressNumbers = countCongressMembers(congress);

  return (
    <div className="max-w-screen-xxl mx-auto px-4">
      <div className="text-center text-base leading-6">
        <h4 className="text-lg font-semibold">US Congress</h4>
        <p>
          Senate: <strong>{congressNumbers.numSenate}</strong>
        </p>
        <p>
          House: <strong>{congressNumbers.numHouse}</strong>
        </p>
        <p>
          Republicans in Senate:{" "}
          <strong>{congressNumbers.numRepublicans.senate}</strong>
        </p>
        <p>
          Democrats in Senate:{" "}
          <strong>{congressNumbers.numDemocrats.senate}</strong>
        </p>
        <p>
          Independents in Senate:{" "}
          <strong>{congressNumbers.numIndo.senate}</strong>
        </p>
        <p>
          Democrats in House:{" "}
          <strong>{congressNumbers.numDemocrats.house}</strong>
        </p>
        <p>
          Republicans in House:{" "}
          <strong>{congressNumbers.numRepublicans.house}</strong>
        </p>
        <p>
          Independents in House:{" "}
          <strong>{congressNumbers.numIndo.house}</strong>
        </p>
      </div>

      {/* Grid Container */}
      <div className="overflow-hidden w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4">
          {congress.map((member) => (
            <MemberCard key={member.bioguideId} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
}
