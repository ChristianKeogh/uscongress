"use client";

import { Member } from "@/models/membercard-model";
import { Congress } from "@/models/wholecongress-model";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CongressCompositionChart } from "./congress-composition-chart";
import { MemberCard } from "./member-card";

type Props = {
  allMembers: Member[];
  congressNumbers: Congress;
  initialSearch: string;
};

export default function HomePage({ allMembers, congressNumbers, initialSearch }: Props) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialSearch);
  const [chamberFilter, setChamberFilter] = useState<"All" | "Senate" | "House">("All");
  const [partyFilter, setPartyFilter] = useState<"All" | "Democratic" | "Republican">("All");

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchTerm(searchTerm), 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const filteredMembers = useMemo(() => {
    let members = allMembers;

    if (debouncedSearchTerm) {
      const term = debouncedSearchTerm.toLowerCase();
      members = members.filter((m) =>
        m.name.toLowerCase().includes(term) ||
        m.state.toLowerCase().includes(term) ||
        m.partyName.toLowerCase().includes(term)
      );
    }

    if (chamberFilter !== "All") {
      members = members.filter((m) => {
        const lastTerm = m.terms.item[m.terms.item.length - 1];
        if (chamberFilter === "Senate") return lastTerm.chamber.toLowerCase() === "senate";
        if (chamberFilter === "House") return lastTerm.chamber.toLowerCase().includes("house");
        return true;
      });
    }

    if (partyFilter !== "All") {
      members = members.filter((m) => m.partyName === partyFilter);
    }

    return members;
  }, [allMembers, debouncedSearchTerm, chamberFilter, partyFilter]);

  const hasFilters = searchTerm || chamberFilter !== "All" || partyFilter !== "All";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                119th Congress
              </h1>
              <p className="mt-1 text-muted-foreground">
                United States Senate &amp; House of Representatives
              </p>
            </div>
            <div className="lg:w-[480px]">
              <CongressCompositionChart congressNumbers={congressNumbers} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-14 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">

            {/* Search */}
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search members..."
                className="w-full pl-9 pr-8 py-2 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Chamber */}
            <div className="flex items-center bg-muted rounded-lg p-0.5 gap-0.5">
              {(["All", "Senate", "House"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setChamberFilter(f)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    chamberFilter === f
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Party */}
            <div className="flex items-center bg-muted rounded-lg p-0.5 gap-0.5">
              {(["All", "Democratic", "Republican"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setPartyFilter(f)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    partyFilter === f
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f === "Democratic" ? "Dem" : f === "Republican" ? "Rep" : f}
                </button>
              ))}
            </div>

            {/* Count */}
            <span className="text-xs text-muted-foreground ml-auto shrink-0">
              {filteredMembers.length} members
            </span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredMembers.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-muted-foreground">No members match your filters.</p>
            {hasFilters && (
              <button
                onClick={() => { setSearchTerm(""); setChamberFilter("All"); setPartyFilter("All"); }}
                className="mt-3 text-sm text-foreground underline underline-offset-2"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredMembers.map((member) => (
                <motion.div
                  layout
                  key={member.bioguideId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <MemberCard member={member} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
