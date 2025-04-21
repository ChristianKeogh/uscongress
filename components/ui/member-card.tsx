import { Member } from "@/models/membercard-model";
import Link from "next/link";

export const MemberCard = ({ member }: { member: Member }) => {
  const { name, partyName, state, terms, depiction, url, bioguideId } = member;

  // Get the last term if terms.item exists
  const lastTerm = terms?.item?.length
    ? terms.item[terms.item.length - 1]
    : null;

  //TODO: right now we are just looking at the most recent stint in whichever house or senate and counting from there, we should instead count the first

  const chamber = lastTerm?.chamber || "Unknown";
  const startYear = terms?.item[0].startYear || "N/A";

  return (
    <div className="flex items-center space-x-3 p-2 border rounded-md shadow-sm">
      <img
        src={depiction?.imageUrl || "/placeholder.jpg"}
        alt={name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="text-left text-sm">
        <h2 className="font-medium text-gray-800">{name}</h2>
        <p className="text-xs text-gray-500">
          {partyName} - {state}
        </p>
        <p className="text-xs text-gray-400">
          {name.includes("Vance") ? "Vice President" : chamber}
        </p>
        <p className="text-xs text-gray-400">Since: {startYear}</p>
        {depiction?.imageUrl && url && (
          <Link
            href={bioguideId ? `/profile/${bioguideId}` : "#"}
            className={`text-blue-500 text-xs underline ${
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
