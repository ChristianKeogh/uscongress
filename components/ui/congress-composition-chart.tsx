"use client";

import { Congress } from "@/models/wholecongress-model";

type Props = {
  congressNumbers: Congress;
};

type BarRowProps = {
  label: string;
  dem: number;
  rep: number;
  ind: number;
  total: number;
};

function BarRow({ label, dem, rep, ind, total }: BarRowProps) {
  const demPct = (dem / total) * 100;
  const repPct = (rep / total) * 100;
  const indPct = (ind / total) * 100;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-foreground">{label}</span>
        <div className="flex items-center gap-3 text-muted-foreground">
          <span className="text-blue-600 font-medium">{dem} D</span>
          {ind > 0 && <span className="text-gray-500">{ind} I</span>}
          <span className="text-red-600 font-medium">{rep} R</span>
        </div>
      </div>
      <div className="flex h-2.5 rounded-full overflow-hidden bg-muted">
        <div
          className="bg-[hsl(214,80%,51%)] transition-all"
          style={{ width: `${demPct}%` }}
        />
        {ind > 0 && (
          <div
            className="bg-[hsl(220,10%,65%)] transition-all"
            style={{ width: `${indPct}%` }}
          />
        )}
        <div
          className="bg-[hsl(4,74%,52%)] transition-all"
          style={{ width: `${repPct}%` }}
        />
      </div>
    </div>
  );
}

export function CongressCompositionChart({ congressNumbers }: Props) {
  const senateTotal =
    congressNumbers.numDemocrats.senate +
    congressNumbers.numRepublicans.senate +
    congressNumbers.numIndo.senate;

  const houseTotal =
    congressNumbers.numDemocrats.house +
    congressNumbers.numRepublicans.house +
    congressNumbers.numIndo.house;

  return (
    <div className="space-y-4 w-full">
      <BarRow
        label="Senate"
        dem={congressNumbers.numDemocrats.senate}
        rep={congressNumbers.numRepublicans.senate}
        ind={congressNumbers.numIndo.senate}
        total={senateTotal}
      />
      <BarRow
        label="House"
        dem={congressNumbers.numDemocrats.house}
        rep={congressNumbers.numRepublicans.house}
        ind={congressNumbers.numIndo.house}
        total={houseTotal}
      />
    </div>
  );
}
