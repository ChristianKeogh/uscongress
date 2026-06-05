import { Member } from "@/models/membercard-model";
import Link from "next/link";
import Image from "next/image";

export const MemberCard = ({ member }: { member: Member }) => {
  const { name, partyName, state, terms, depiction, bioguideId } = member;

  const lastTerm = terms?.item?.length ? terms.item[terms.item.length - 1] : null;
  const chamber = lastTerm?.chamber || "Unknown";

  const isRepublican = partyName.toLowerCase() === "republican";
  const isDemocrat = partyName.toLowerCase() === "democratic";

  const partyBadgeClass = isRepublican
    ? "bg-red-50 text-red-700"
    : isDemocrat
    ? "bg-blue-50 text-blue-700"
    : "bg-muted text-muted-foreground";

  const chamberLabel = name.includes("Vance")
    ? "Vice President"
    : chamber.toLowerCase().includes("house")
    ? "House"
    : chamber;

  return (
    <Link
      href={bioguideId ? `/profile/${bioguideId}` : "#"}
      className={`block w-full h-full ${!bioguideId && "pointer-events-none opacity-40"}`}
    >
      <div
        className="bg-card rounded-xl border border-border p-5 h-full flex flex-col items-center gap-4"
      >
        <div className="relative w-20 h-20 shrink-0">
          <Image
            src={depiction?.imageUrl || "/placeholder.jpg"}
            alt={name}
            fill
            className="rounded-full object-cover"
            sizes="80px"
          />
        </div>

        <div className="text-center w-full flex flex-col items-center gap-2">
          <h2 className="font-semibold text-foreground text-sm leading-snug line-clamp-2">
            {name}
          </h2>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${partyBadgeClass}`}>
              {isRepublican ? "R" : isDemocrat ? "D" : "I"}
            </span>
            <span className="text-xs text-muted-foreground">{state}</span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground">{chamberLabel}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
