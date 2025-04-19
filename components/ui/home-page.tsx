"use client";
/* eslint-disable @next/next/no-img-element */
import { Member } from "@/models/membercard-model";
import { Congress } from "@/models/wholecongress-model";
import Link from "next/link";
import RadialVisitorsChart from "@/components/ui/radial-chart";
import { useMemo, useState } from "react";

type Props = {
  allMembers: Member[];
  congressNumbers: Congress;
  initialSearch: string;
};

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

export default function ClientCongressView({
  allMembers,
  congressNumbers,
  initialSearch,
}: Props) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const filteredMembers = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return allMembers.filter((member) => {
      const name = member.name.toLowerCase();
      const state = member.state.toLowerCase();
      const party = member.partyName.toLowerCase();
      return (
        name.includes(term) || state.includes(term) || party.includes(term)
      );
    });
  }, [allMembers, searchTerm]);

  const republicans = filteredMembers.filter(
    (m) => m.partyName.toLowerCase() === "republican"
  );
  const democrats = filteredMembers.filter(
    (m) => m.partyName.toLowerCase() === "democratic"
  );
  const independents = filteredMembers.filter(
    (m) =>
      m.partyName.toLowerCase() !== "republican" &&
      m.partyName.toLowerCase() !== "democratic"
  );

  return (
    <div className="bg-white rounded-xl text-center space-y-6">
      <h4 className="text-4xl font-extrabold text-center text-blue-800 tracking-wide relative inline-block px-6 py-3 uppercase">
        <span className="inline-block mr-2 text-red-600">★</span>
        United States Congress
        <span className="inline-block ml-2 text-red-600">★</span>
      </h4>

      <div className="flex justify-center flex-wrap gap-x-20">
        <div className="w-[400px]">
          <RadialVisitorsChart
            var1={congressNumbers.numRepublicans.senate}
            var2={congressNumbers.numDemocrats.senate}
            var3={congressNumbers.numIndo.senate}
            total={congressNumbers.numSenate}
            label_name="Senate"
          />
        </div>
        <div className="w-[400px]">
          <RadialVisitorsChart
            var1={congressNumbers.numRepublicans.house}
            var2={congressNumbers.numDemocrats.house}
            var3={congressNumbers.numIndo.house}
            total={congressNumbers.numHouse}
            label_name="House"
          />
        </div>
      </div>

      <div className="w-3/6 mx-auto">
        <input
          type="text"
          placeholder="Search by name, state, or party..."
          className="w-full p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col w-full gap-8 p-4">
        <div className="flex flex-col lg:flex-row gap-8">
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
