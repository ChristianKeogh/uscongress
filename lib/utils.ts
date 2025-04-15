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
