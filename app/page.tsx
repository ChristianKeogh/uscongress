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

  const nonVotingTerritories = new Set([
    "northern mariana islands",
    "district of columbia",
    "american samoa",
    "virgin islands",
    "guam",
    "puerto rico",
  ]);

  members.forEach((member) => {
    const name = member.name.toLowerCase();
    const state = member.state.toLowerCase();

    if (name === "vance, j. d." || nonVotingTerritories.has(state)) return;

    const terms = member.terms.item;
    const latestTerm = terms[terms.length - 1];

    if (latestTerm.endYear) return;

    const chamber = latestTerm.chamber.toLowerCase();
    const party = member.partyName.toLowerCase();

    const isHouse = chamber === "house of representatives";
    const isSenate = chamber === "senate";

    if (isHouse) congress.numHouse++;
    if (isSenate) congress.numSenate++;

    const target =
      party === "democratic"
        ? congress.numDemocrats
        : party === "republican"
        ? congress.numRepublicans
        : congress.numIndo;

    if (isHouse) target.house++;
    if (isSenate) target.senate++;
    target.total++;
  });

  return congress;
};

export default async function Home() {
  const congress = await fetchAllMembers();

  const congressNumbers = countCongressMembers(congress);

  const republicans = congress.filter(
    (member) => member.partyName.toLowerCase() === "republican"
  );
  const democrats = congress.filter(
    (member) => member.partyName.toLowerCase() === "democratic"
  );
  const independents = congress.filter(
    (member) =>
      member.partyName.toLowerCase() !== "republican" &&
      member.partyName.toLowerCase() !== "democratic"
  );

  return (
    <div className="max-w-screen-xxl mx-auto px-4">
      <div className="text-center text-base leading-6">
        <h4 className="text-lg font-semibold">US Congress</h4>
        <p>
          Senate: <strong>{congressNumbers.numSenate}/100</strong>
        </p>
        <p>
          House: <strong>{congressNumbers.numHouse}/435</strong>
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
      <div className="flex flex-col w-full gap-8 p-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Democrats */}
          <div className="flex-1 bg-blue-50 p-4 rounded-xl">
            <h2 className="text-lg font-bold text-blue-600 mb-4 text-center">
              Democrats
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 justify-items-center">
              {democrats.map((member) => (
                <MemberCard key={member.bioguideId} member={member} />
              ))}
            </div>
          </div>

          {/* Republicans */}
          <div className="flex-1 bg-red-50 p-4 rounded-xl">
            <h2 className="text-lg font-bold text-red-600 mb-4 text-center">
              Republicans
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 justify-items-center">
              {republicans.map((member) => (
                <MemberCard key={member.bioguideId} member={member} />
              ))}
            </div>
          </div>
        </div>

        {/* Independents at the bottom */}
        <div className="bg-yellow-50 p-4 rounded-xl">
          <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">
            Independents
          </h2>
          <div className="grid grid-cols-1 gap-4 justify-items-center">
            {independents.map((member) => (
              <MemberCard key={member.bioguideId} member={member} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
