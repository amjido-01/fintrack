
"use client"

import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

export const description = "A pie chart with a legend"

const chartData = [
  { browser: "food", visitors: 275, fill: "var(--color-food)" },
  { browser: "clothing", visitors: 200, fill: "var(--color-clothing)" },
  { browser: "medical", visitors: 187, fill: "var(--color-medical)" },
  { browser: "transport", visitors: 173, fill: "var(--color-transport)" },
  { browser: "entertainment", visitors: 173, fill: "var(--color-entertainment)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

// const chartConfig = {
//   visitors: {
//     label: "Visitors",
//   },
//   chrome: {
//     label: "Chrome",
//     color: "hsl(var(--chart-1))",
//   },
//   safari: {
//     label: "Safari",
//     color: "hsl(var(--chart-2))",
//   },
//   firefox: {
//     label: "Firefox",
//     color: "hsl(var(--chart-3))",
//   },
//   edge: {
//     label: "Edge",
//     color: "hsl(var(--chart-4))",
//   },
//   other: {
//     label: "Other",
//     color: "hsl(var(--chart-5))",
//   },
// } satisfies ChartConfig

// Config for the chart with colors and labels

const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    food: {
      label: "Food",
      color: "hsl(var(--chart-1))",
    },
    clothing: {
      label: "Clothing",
      color: "hsl(var(--chart-2))",
    },
    medical: {
      label: "Medical",
      color: "hsl(var(--chart-3))",
    },
    transport: {
      label: "Transport",
      color: "hsl(var(--chart-4))",
    },
    entertainment: {
      label: "Entertainment",
      color: "hsl(var(--chart-6))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig

export function ExpensesByCategory() {
    const [timeframe, setTimeframe] = useState("weekly")
  return (
    <Card className="flex flex-col w-full md:w-1/2 pb-4">
       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
       <div>
       <CardTitle>Total Expensive By Category</CardTitle>
       <CardDescription>January - June 2024</CardDescription>
       </div>
        <Select
          value={timeframe}
          onValueChange={(value) => setTimeframe(value)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto border-2 border-red-500"
        >
          <PieChart>
            <Pie data={chartData} dataKey="visitors" />
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
