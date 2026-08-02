import { Member } from "@/models/membercard-model";
import { Congress } from "@/models/wholecongress-model";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const countCongressMembers = (members: Member[]): Congress => {
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
    const state = member.state.toLowerCase();

    if (nonVotingTerritories.has(state)) return;

    const terms = member.terms.item;
    const latestTerm = terms[terms.length - 1];

    // The congress.gov endpoint returns everyone who has served in this
    // Congress, including members who resigned/died and their replacements.
    // A departed member's final term carries an endYear; a currently-seated
    // member's latest term has none. Counting only the latter avoids
    // double-counting a vacated seat and its successor.
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
