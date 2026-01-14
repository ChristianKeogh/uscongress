"use client";

import { Member } from "@/models/membercard-model";
import { Congress } from "@/models/wholecongress-model";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CongressCompositionChart } from "./congress-composition-chart";
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
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialSearch);
  const [chamberFilter, setChamberFilter] = useState<"All" | "Senate" | "House">("All");

  useEffect(() => {
    const handler = setTimeout(() => {
        setDebouncedSearchTerm(searchTerm);
    }, 1000);

    return () => {
        clearTimeout(handler);
    };
  }, [searchTerm]);
  const [partyFilter, setPartyFilter] = useState<"All" | "Democratic" | "Republican">("All");

  const filteredMembers = useMemo(() => {
    let members = allMembers;

    // Search Filter
    if (debouncedSearchTerm) {
        const term = debouncedSearchTerm.toLowerCase();
        members = members.filter((member) => {
            const name = member.name.toLowerCase();
            const state = member.state.toLowerCase();
            const party = member.partyName.toLowerCase();
            return (
                name.includes(term) || state.includes(term) || party.includes(term)
            );
        });
    }

    // Chamber Filter
    if (chamberFilter !== "All") {
        members = members.filter(member => {
            const terms = member.terms.item;
            const lastTerm = terms[terms.length - 1];
            // Normalize "House of Representatives" to "House" for comparison if needed, or check strict
            if (chamberFilter === "Senate") return lastTerm.chamber.toLowerCase() === "senate";
            if (chamberFilter === "House") return lastTerm.chamber.toLowerCase().includes("house");
            return true;
        })
    }

    // Party Filter
    if (partyFilter !== "All") {
         members = members.filter(member => member.partyName === partyFilter);
    }

    return members;
  }, [allMembers, debouncedSearchTerm, chamberFilter, partyFilter]);


  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Hero / Chart Section */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
             <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                119th Congress
             </h1>
             <p className="max-w-2xl mx-auto text-xl text-gray-500">
                Explore the current composition of the United States House and Senate.
             </p>
        </div>
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
             <CongressCompositionChart congressNumbers={congressNumbers} />
        </div>
      </section>

      {/* Search and Filters */}
      <section className="sticky top-20 z-40 bg-gray-50/95 backdrop-blur-sm py-4 border-b border-gray-200 shadow-sm rounded-lg mx-auto max-w-7xl">
         <div className="flex flex-col lg:flex-row gap-6 items-center justify-between px-4">
            
            {/* Search Bar */}
            <div className="relative w-full lg:w-96 group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Search members, states, parties..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow shadow-sm hover:shadow-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto overflow-x-auto pb-2 sm:pb-0">
                
                {/* Chamber Toggle */}
                <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
                    {(["All", "Senate", "House"] as const).map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setChamberFilter(filter)}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                                chamberFilter === filter 
                                ? "bg-blue-600 text-white shadow-sm" 
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Party Toggle */}
                 <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
                    {(["All", "Democratic", "Republican"] as const).map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setPartyFilter(filter)}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                                partyFilter === filter 
                                ? filter === "Democratic" ? "bg-blue-600 text-white shadow-sm"
                                : filter === "Republican" ? "bg-red-600 text-white shadow-sm"
                                : "bg-gray-800 text-white shadow-sm"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                             {filter === "Democratic" ? "Dem" : filter === "Republican" ? "Rep" : "All"}
                        </button>
                    ))}
                </div>
            </div>
         </div>
      </section>

      {/* Results Count */}
       <div className="text-center">
            <p className="text-gray-500 text-sm font-medium">
                Showing {filteredMembers.length} members
            </p>
       </div>

      {/* Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
      >
        <AnimatePresence mode="popLayout">
            {filteredMembers.map((member) => (
                <motion.div
                    layout
                    key={member.bioguideId}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                >
                    <MemberCard member={member} />
                </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>

        {filteredMembers.length === 0 && (
            <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No members found matching your criteria.</p>
                <button 
                    onClick={() => {setSearchTerm(""); setChamberFilter("All"); setPartyFilter("All");}}
                    className="mt-4 text-blue-600 hover:underline"
                >
                    Clear all filters
                </button>
            </div>
        )}
    </div>
  );
}
