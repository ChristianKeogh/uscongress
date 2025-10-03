"use client";

import { useEffect, useRef } from "react";
import { svgMap } from "@/lib/usaMapSVG";

type UsaMapProps = {
  stateAbbr: string;
  party: "Democratic" | "Republican";
};

export default function UsaMap({ stateAbbr, party }: UsaMapProps) {
  const svgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svgElement = svgRef.current?.querySelector("svg");
    if (!svgElement) return;

    // TODO: Remove unnecessary stateAbbr
    let target = svgElement.querySelector(`#${stateAbbr}`);
    if (!target) {
      // find by <title>
      svgElement.querySelectorAll("path").forEach((path) => {
        const title = path.querySelector("title");
        if (
          title?.textContent?.toLowerCase().trim() ===
          stateAbbr.toLowerCase().trim()
        ) {
          target = path;
        }
      });
    }

    if (target) {
      const color =
        party === "Democratic"
          ? "#3b82f6" // blue
          : party === "Republican"
          ? "#ef4444" // red
          : "#facc15"; // yellow
      target.setAttribute("fill", color);
    }
  }, [stateAbbr, party]);

  return (
    <div
      ref={svgRef}
      dangerouslySetInnerHTML={{ __html: svgMap }}
      className="m-0 w-full h-auto"
    />
  );
}
