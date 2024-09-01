"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = {
  weekly: [
    { name: "Mon", amount: 120 },
    { name: "Tue", amount: 90 },
    { name: "Wed", amount: 150 },
    { name: "Thu", amount: 80 },
    { name: "Fri", amount: 200 },
    { name: "Sat", amount: 180 },
    { name: "Sun", amount: 110 },
  ],
  monthly: [
    { name: "Week 1", amount: 750 },
    { name: "Week 2", amount: 620 },
    { name: "Week 3", amount: 800 },
    { name: "Week 4", amount: 690 },
  ],
  yearly: [
    { name: "Jan", amount: 2800 },
    { name: "Feb", amount: 2500 },
    { name: "Mar", amount: 3100 },
    { name: "Apr", amount: 2900 },
    { name: "May", amount: 3300 },
    { name: "Jun", amount: 3000 },
    { name: "Jul", amount: 3200 },
    { name: "Aug", amount: 3400 },
    { name: "Sep", amount: 3100 },
    { name: "Oct", amount: 3500 },
    { name: "Nov", amount: 3200 },
    { name: "Dec", amount: 3800 },
  ],
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function Total() {
  const [timeframe, setTimeframe] = useState("weekly")
  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
       <div>
       <CardTitle>Total Expensive Overview</CardTitle>
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
      <CardContent>
        <ResponsiveContainer width="100" height={250}>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData[timeframe]}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="amount"
              type="linear"
              fill="currentColor"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
              className="fill-primary"
            />
          </LineChart>
        </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
