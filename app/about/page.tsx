import Link from "next/link";

export const metadata = {
  title: "About | US Congress Tracker",
  description: "Learn about the US Congress Tracker",
};

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-[calc(100vh-64px)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-8 py-10 text-white">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-center">
              About This Project
            </h1>
          </div>
          <div className="px-8 py-10 space-y-6 text-gray-600 text-lg leading-relaxed">
            <p>
              The <strong>US Congress Tracker</strong> is a specialized platform designed to provide
              up-to-date information about the legislative branch of the United States federal government.
            </p>
            <p>
              Our mission is to make congressional data accessible and transparent, allowing citizens
              to easily stay informed about the composition of the House and Senate.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 pt-4">Data Source</h2>
            <p>
              This application leverages the official{" "}
              <a
                href="https://api.congress.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium underline decoration-blue-300 underline-offset-2 transition-colors"
              >
                Congress.gov API
              </a>
              . By connecting directly to government records, we ensure that the information presented—from
              member details to party affiliations—is derived from the most authoritative source available.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 pt-4">How It Works</h2>
            <p>
              The site automatically fetches the latest data on the current Congress. It filters and processes
              this raw data to present:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Real-time party composition charts</li>
              <li>Searchable profiles for every member of the House and Senate</li>
              <li>Detailed filtering by chamber and party</li>
            </ul>

             <div className="pt-8 flex justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
                >
                  Return to Dashboard
                </Link>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
