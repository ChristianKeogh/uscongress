//TODO: Fix this any hack

import Navbar from "@/components/ui/navbar";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MemberProfile = ({ member }: { member: any }) => {
  if (!member)
    return (
      <div className="text-center text-gray-500">No member data available.</div>
    );
  const {
    // firstName,
    // lastName,
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

  /* eslint-disable @next/next/no-img-element */
  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200 space-y-6">
          {/* Header Section */}
          <div className="flex items-center space-x-4">
            <img
              src={depiction?.imageUrl || "/placeholder.jpg"}
              alt={directOrderName}
              className="w-28 h-28 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-semibold">
                {honorificName}
                {directOrderName}
              </h1>
              <p className="text-gray-600">Born {birthYear}</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-t pt-4">
            <h2 className="text-lg font-semibold">Contact</h2>
            <p className="text-gray-600">
              <strong>Office:</strong> {addressInformation?.officeAddress}
            </p>
            <p className="text-gray-600">
              <strong>Phone:</strong> {addressInformation?.phoneNumber}
            </p>
            {officialWebsiteUrl && (
              <a
                href={officialWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Official Website
              </a>
            )}
          </div>

          {/* Political Info */}
          <div className="border-t pt-4">
            <h2 className="text-lg font-semibold">Political Information</h2>
            <p className="text-gray-600">
              <strong>State:</strong> {state}
            </p>
            <p className="text-gray-600">
              <strong>Party:</strong> {partyHistory?.[0]?.partyName} (
              {partyHistory?.[0]?.partyAbbreviation})
            </p>
            <p className="text-gray-600">
              <strong>Current Role:</strong> {latestTerm?.memberType} (
              {latestTerm?.chamber})
            </p>
            <p className="text-gray-600">
              <strong>In Congress Since:</strong> {terms?.[0]?.startYear}
            </p>
          </div>

          {/* Legislation Stats */}
          <div className="border-t pt-4">
            <h2 className="text-lg font-semibold">Legislation Activity</h2>
            <p className="text-gray-600">
              <strong>Sponsored Bills:</strong> {sponsoredLegislation?.count}
            </p>
            <p className="text-gray-600">
              <strong>Cosponsored Bills:</strong>{" "}
              {cosponsoredLegislation?.count}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
