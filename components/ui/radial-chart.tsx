"use client";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

//TODO: Delete this slop, not being used, but won't let me not include it
const chartConfig = {
  desktop: {
    label: "Republicans",
    color: "red",
  },
  mobile: {
    label: "Democrats",
    color: "blue",
  },
} satisfies ChartConfig;

export default function RadialVisitorsChart({
  var1, // republicans
  var2, // democrats
  var3, // independents
  total,
  label_name,
}: {
  var1: number;
  var2: number;
  var3: number;
  total: number;
  label_name: string;
}) {
  const data = [
    {
      Republicans: var1,
      Democrats: var2,
      Independents: var3,
    },
  ];

  return (
    <Card className="flex-auto">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-2xl font-bold">{label_name}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto h-96 w-full max-w-[500px]"
        >
          <RadialBarChart
            data={data}
            endAngle={180}
            innerRadius={120}
            outerRadius={270}
          >
            <svg className="top-0 left-0">
              <line
                x1="50%"
                y1="0"
                x2="50%"
                y2="27%"
                stroke="black"
                strokeWidth="2"
                strokeDasharray="4"
              />
            </svg>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Members
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="Republicans"
              stackId="a"
              cornerRadius={2}
              fill="red"
              fillOpacity={0.6} // Apply transparency to bars
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="Democrats"
              stackId="a"
              cornerRadius={2}
              fill="blue"
              fillOpacity={0.6} // Apply transparency to bars
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="Independents"
              stackId="a"
              cornerRadius={2}
              fill="#f1c40f"
              fillOpacity={0.6} // Apply transparency to bars
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
