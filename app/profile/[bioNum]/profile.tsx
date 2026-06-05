import UsaMap from "@/components/ui/usa-map";
import Link from "next/link";
import { ArrowLeft, ExternalLink, MapPin, Phone, Globe } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MemberProfile = ({ member }: { member: any }) => {
  if (!member)
    return (
      <div className="text-center text-muted-foreground py-20">No member data available.</div>
    );

  const {
    honorificName,
    directOrderName,
    birthYear,
    depiction,
    officialWebsiteUrl,
    partyHistory,
    state,
    addressInformation,
    sponsoredLegislation,
    cosponsoredLegislation,
    terms,
  } = member.member;

  const latestTerm = terms?.[terms.length - 1];
  const partyName = partyHistory?.[0]?.partyName || "";
  const isRepublican = partyName.toLowerCase() === "republican";
  const isDemocrat = partyName.toLowerCase() === "democratic";

  const partyColor = isRepublican
    ? "text-red-600"
    : isDemocrat
    ? "text-blue-600"
    : "text-muted-foreground";

  const partyBadge = isRepublican
    ? "bg-red-50 text-red-700 border-red-200"
    : isDemocrat
    ? "bg-blue-50 text-blue-700 border-blue-200"
    : "bg-muted text-muted-foreground border-border";

  /* eslint-disable @next/next/no-img-element */
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          All members
        </Link>

        {/* Profile header */}
        <div className="flex flex-col sm:flex-row gap-6 items-start mb-10">
          <div className="shrink-0">
            <img
              src={depiction?.imageUrl || "/placeholder.jpg"}
              alt={directOrderName}
              className="w-28 h-28 rounded-2xl object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${partyBadge}`}>
                {partyHistory?.[0]?.partyAbbreviation || "—"}
              </span>
              <span className="text-xs text-muted-foreground">{latestTerm?.memberType}</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              {honorificName} {directOrderName}
            </h1>
            <p className={`text-sm font-medium mt-0.5 ${partyColor}`}>
              {partyName} · {state} · Born {birthYear}
            </p>
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Left column: info cards */}
          <div className="lg:col-span-2 space-y-4">

            {/* Contact */}
            <div className="bg-card border border-border rounded-xl p-5 space-y-3">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Contact</h2>
              {addressInformation?.officeAddress && (
                <div className="flex gap-2.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{addressInformation.officeAddress}</span>
                </div>
              )}
              {addressInformation?.phoneNumber && (
                <div className="flex gap-2.5 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{addressInformation.phoneNumber}</span>
                </div>
              )}
              {officialWebsiteUrl && (
                <a
                  href={officialWebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2.5 text-sm text-foreground hover:underline underline-offset-2"
                >
                  <Globe className="h-4 w-4 shrink-0 mt-0.5" />
                  <span className="flex items-center gap-1">
                    Official Website
                    <ExternalLink className="h-3 w-3" />
                  </span>
                </a>
              )}
            </div>

            {/* Service */}
            <div className="bg-card border border-border rounded-xl p-5 space-y-3">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Service</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Chamber</span>
                  <span className="font-medium text-foreground">{latestTerm?.chamber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Role</span>
                  <span className="font-medium text-foreground">{latestTerm?.memberType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">In Congress since</span>
                  <span className="font-medium text-foreground">{terms?.[0]?.startYear}</span>
                </div>
              </div>
            </div>

            {/* Legislation */}
            <div className="bg-card border border-border rounded-xl p-5 space-y-3">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Legislation</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-foreground">{sponsoredLegislation?.count ?? "—"}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Sponsored</p>
                </div>
                <div className="bg-muted rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-foreground">{cosponsoredLegislation?.count ?? "—"}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Co-sponsored</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: map */}
          <div className="lg:col-span-3">
            <div className="bg-card border border-border rounded-xl p-5 h-full flex items-center justify-center">
              <UsaMap stateAbbr={state} party={partyName} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
