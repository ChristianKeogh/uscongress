import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "About | US Congress",
  description: "Learn about the US Congress Tracker",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <h1 className="text-2xl font-bold tracking-tight text-foreground mb-8">About</h1>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            <span className="text-foreground font-medium">US Congress</span> is a simple tool
            for exploring the current composition of the United States 119th Congress — who represents
            each state, their party affiliation, and their legislative activity.
          </p>
          <p>
            Built by{" "}
            <a
              href="https://www.christiankeogh.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity"
            >
              Christian Keogh
            </a>
            . Data from the official{" "}
            <a
              href="https://api.congress.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity"
            >
              Congress.gov API
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
