"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Congress } from "@/models/wholecongress-model";
import {
    Bar,
    BarChart,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type Props = {
  congressNumbers: Congress;
};

export function CongressCompositionChart({ congressNumbers }: Props) {
  const data = [
    {
      name: "Senate",
      Republicans: congressNumbers.numRepublicans.senate,
      Democrats: congressNumbers.numDemocrats.senate,
      Independents: congressNumbers.numIndo.senate,
    },
    {
      name: "House",
      Republicans: congressNumbers.numRepublicans.house,
      Democrats: congressNumbers.numDemocrats.house,
      Independents: congressNumbers.numIndo.house,
    },
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg border border-gray-100 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center text-gray-800">
          Congress Composition
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis type="number" hide />
              <YAxis
                dataKey="name"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#374151", fontSize: 14, fontWeight: 600 }}
                width={80}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                cursor={{ fill: "rgba(0,0,0,0.05)" }}
              />
              <Legend wrapperStyle={{ paddingTop: "20px" }} />
              <Bar
                dataKey="Democrats"
                stackId="a"
                fill="#3b82f6" // Blue-500
                radius={[4, 0, 0, 4]}
                barSize={60}
              />
              <Bar
                dataKey="Independents"
                stackId="a"
                fill="#9ca3af" // Gray-400
                barSize={60}
              />
              <Bar
                dataKey="Republicans"
                stackId="a"
                fill="#ef4444" // Red-500
                radius={[0, 4, 4, 0]}
                barSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
