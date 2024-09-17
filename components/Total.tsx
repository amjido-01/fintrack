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

// type Timeframe = 'weekly' | 'monthly' | 'yearly';
type ChartDataPoint = {
  name: string;
  expenses: number;
  income: number
}
const chartData: Record<Timeframe, ChartDataPoint[]> = {
  weekly: [
    { name: "Mon", expenses: 120, income: 100 },
    { name: "Tue", expenses: 90, income: 80 },
    { name: "Wed", expenses: 150, income: 70 },
    { name: "Thu", expenses: 80, income: 60 },
    { name: "Fri", expenses: 200, income: 50 },
    { name: "Sat", expenses: 180, income: 40 },
    { name: "Sun", expenses: 110, income: 90 },
  ],
  monthly: [
    { name: "Week 1", expenses: 750, income: 800 },
    { name: "Week 2", expenses: 620, income: 700 },
    { name: "Week 3", expenses: 800, income: 850 },
    { name: "Week 4", expenses: 690, income: 750 },
  ],
  yearly: [
    { name: "Jan", expenses: 2800, income: 3000 },
    { name: "Feb", expenses: 2500, income: 2800 },
    { name: "Mar", expenses: 3100, income: 3300 },
    { name: "Apr", expenses: 2900, income: 3100 },
    { name: "May", expenses: 3300, income: 3500 },
    { name: "Jun", expenses: 3000, income: 3200 },
    { name: "Jul", expenses: 3200, income: 3400 },
    { name: "Aug", expenses: 3400, income: 3600 },
    { name: "Sep", expenses: 3100, income: 3300 },
    { name: "Oct", expenses: 3500, income: 3700 },
    { name: "Nov", expenses: 3200, income: 3400 },
    { name: "Dec", expenses: 3800, income: 4000 },
  ],
}
const chartConfig = {
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-4))",
  },
  income: {
    label: "Income",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig
export function Total() {
  const [timeframe, setTimeframe] = useState<Timeframe>('weekly')
  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
       <div>
       <CardTitle>Total Expenses and Income Overview</CardTitle>
       <CardDescription>January - December 2024</CardDescription>
       </div>
        <Select
          value={timeframe}
          onValueChange={(value: Timeframe) => setTimeframe(value)}
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
              dataKey="expenses"
              type="linear"
              fill="currentColor"
              stroke="hsl(var(--chart-4))"
              strokeWidth={2}
              dot={false}
              className="fill-primary"
            />
            <Line
              dataKey="income"
              type="linear"
              fill="currentColor"
              stroke="hsl(var(--chart-3))"
              strokeWidth={2}
              dot={false}
              className="fill-secondary"
            />
          </LineChart>
        </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          <span>Expenses trending up by 5.2%</span>
          <span>Income trending up by 6.8%</span>
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total expenses and income for the last 12 months
        </div>
      </CardFooter>
    </Card>
  )
}


type Timeframe = 'weekly' | 'monthly' | 'yearly';
