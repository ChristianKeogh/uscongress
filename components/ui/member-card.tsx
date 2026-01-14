import { Member } from "@/models/membercard-model";
import { Link } from "next-view-transitions"; // Correct Link import
import Image from "next/image";


export const MemberCard = ({ member }: { member: Member }) => {
  const { name, partyName, state, terms, depiction, bioguideId } = member;

  // Get the last term if terms.item exists
  const lastTerm = terms?.item?.length
    ? terms.item[terms.item.length - 1]
    : null;

  const chamber = lastTerm?.chamber || "Unknown";
  const startYear = terms?.item[0].startYear || "N/A";

  const isRepublican = partyName.toLowerCase() === "republican";
  const isDemocrat = partyName.toLowerCase() === "democratic";
  
  const borderColor = isRepublican
    ? "border-l-red-500"
    : isDemocrat
    ? "border-l-blue-500"
    : "border-l-gray-400";

  return (
    <Link
      href={bioguideId ? `/profile/${bioguideId}` : "#"}
      className={`block w-full h-full transition-all duration-300 hover:scale-[1.02] ${
        !bioguideId && "pointer-events-none opacity-50"
      }`}
    >
      <div
        className={`bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 p-4 transition-all duration-300 h-full flex flex-col items-center justify-between relative overflow-hidden group border-l-4 ${borderColor}`}
      >
        <div className="absolute top-0 right-0 p-2 opacity-15 scale-150 transition-transform group-hover:scale-125 group-hover:opacity-25 pointer-events-none">
            {/* Optional: Add party logo or symbol here based on party */}
            {isRepublican ? "🐘" : isDemocrat ? "🫏" : "🦅"}
        </div>

        <div className="relative w-24 h-24 mb-3">
            {/* The view-transition-name must be unique to work properly for shared element transitions */}
            <div style={{ viewTransitionName: `image-${bioguideId}` } as React.CSSProperties} className="relative w-full h-full">
                <Image
                src={depiction?.imageUrl || "/placeholder.jpg"}
                alt={name}
                fill
                className="rounded-full object-cover border-4 border-gray-50 shadow-sm" // Increased border and shadow
                sizes="96px"
                />
            </div>
        </div>

        <div className="text-center w-full z-10">
          <h2 className="font-bold text-gray-900 text-lg leading-tight mb-1 line-clamp-2 min-h-[3.5rem] flex items-center justify-center">
            {name}
          </h2>
          <div className="flex items-center justify-center space-x-2 mb-2">
             <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                 isRepublican ? "bg-red-100 text-red-700" : isDemocrat ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
             }`}>{partyName}</span>
             <span className="text-gray-400 text-xs">•</span>
             <span className="text-gray-600 text-xs font-medium">{state}</span>
          </div>

          <div className="bg-gray-50 rounded-lg p-2 w-full mt-2">
             <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-0.5">Role</p>
             <p className="text-sm text-gray-800 font-semibold truncate">
                {name.includes("Vance") ? "Vice President" : chamber}
             </p>
          </div>
           <div className="grid grid-cols-2 gap-2 w-full mt-2 hidden"> {/* Hidden for cleaner look, simpler card */}
            <div className="text-center">
                <p className="text-[10px] text-gray-400 uppercase">Since</p>
                <p className="text-xs font-semibold text-gray-700">{startYear}</p>
            </div>
            <div className="text-center">
                <p className="text-[10px] text-gray-400 uppercase">Term Ends</p>
                 <p className="text-xs font-semibold text-gray-700">{lastTerm?.endYear || "Present"}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
