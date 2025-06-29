"use client";
/* eslint-disable @next/next/no-img-element */
import { Member } from "@/models/membercard-model";
import { Congress } from "@/models/wholecongress-model";
import RadialVisitorsChart from "@/components/ui/radial-chart";
import { useMemo, useState } from "react";
import { MemberCard } from "./member-card";

type Props = {
  allMembers: Member[];
  congressNumbers: Congress;
  initialSearch: string;
};

export default function HomePage({
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
        <h1 className="text-2xl font-bold p-6">Search your Representative</h1>
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
          {/* Democrats Section */}
          <div className="flex-1 bg-blue-50 p-4 rounded-xl flex flex-col max-h-[600px] relative">
            <h2 className="text-lg font-bold text-blue-600 mb-4 text-center">
              Democrats
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 justify-items-center overflow-y-auto flex-1 pr-2">
              {democrats.map((member) => (
                <MemberCard key={member.bioguideId} member={member} />
              ))}
            </div>
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-blue-50 to-transparent" />
          </div>

          {/* Republicans Section */}
          <div className="flex-1 bg-red-50 p-4 rounded-xl flex flex-col max-h-[600px] relative">
            <h2 className="text-lg font-bold text-red-600 mb-4 text-center">
              Republicans
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 justify-items-center overflow-y-auto flex-1 pr-2">
              {republicans.map((member) => (
                <MemberCard key={member.bioguideId} member={member} />
              ))}
            </div>
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-red-50 to-transparent" />
          </div>
        </div>

        {/* Independents Section */}
        <div className="bg-yellow-50 p-4 rounded-xl flex flex-col max-h-[600px] relative">
          <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">
            Independents
          </h2>
          <div className="grid grid-cols-1 gap-4 justify-items-center overflow-y-auto flex-1 pr-2">
            {independents.map((member) => (
              <MemberCard key={member.bioguideId} member={member} />
            ))}
          </div>
          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-yellow-50 to-transparent" />
        </div>
      </div>
    </div>
  );
}
