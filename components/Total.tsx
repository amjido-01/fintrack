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
import { useState, useEffect } from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
interface Expense {
  id: string;
  expenseName: string;
  amount: number;
  date: string;
  category: string;
  note: string;
  workspaceId: string;
}
interface Income {
  id: string;
  incomeSource: string;
  amount: number;
  date: string;
  category: string;
  description: string;
  workspaceId: string;
}

type Timeframe = 'weekly' | 'monthly' | 'yearly';
type ChartDataPoint = {
  name: string;
  expenses: number;
  income: number
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

export function Total({expenses, income}) {
  const [timeframe, setTimeframe] = useState<Timeframe>('weekly')
  const [chartData, setChartData] = useState<Record<Timeframe, ChartDataPoint[]>>({
      weekly: [
        { name: "Sun", expenses: 0, income: 0 },
        { name: "Mon", expenses: 0, income: 0 },
        { name: "Tue", expenses: 0, income: 0 },
        { name: "Wed", expenses: 0, income: 0 },
        { name: "Thu", expenses: 0, income: 0 },
        { name: "Fri", expenses: 0, income: 0 },
        { name: "Sat", expenses: 0, income: 0 },
      ],
      monthly: [
        { name: "Week 1", expenses: 0, income: 0 },
        { name: "Week 2", expenses: 0, income: 0 },
        { name: "Week 3", expenses: 0, income: 0 },
        { name: "Week 4", expenses: 0, income: 0 },
      ],
      yearly: [
        { name: "Jan", expenses: 0, income: 0 },
        { name: "Feb", expenses: 0, income: 0 },
        { name: "Mar", expenses: 0, income: 0 },
        { name: "Apr", expenses: 0, income: 0 },
        { name: "May", expenses: 0, income: 0 },
        { name: "Jun", expenses: 0, income: 0 },
        { name: "Jul", expenses: 0, income: 0 },
        { name: "Aug", expenses: 0, income: 0 },
        { name: "Sep", expenses: 0, income: 0 },
        { name: "Oct", expenses: 0, income: 0 },
        { name: "Nov", expenses: 0, income: 0 },
        { name: "Dec", expenses: 0, income: 0 },
      ],
    
})



useEffect(()=>{
// Get the current date
const currentDate = new Date();
// console.log(currentDate, "current date")

// Subtract 7 days
let timeFrameInt = timeframe === "weekly" ? 7 : timeframe === "monthly" ? 28 : 365 

const pastDate = new Date(currentDate.getTime() - timeFrameInt * 24 * 60 * 60 * 1000);

let updatedWeeklyChartData =   [
  { name: "Sun", expenses: 0, income: 0 },
  { name: "Mon", expenses: 0, income: 0 },
  { name: "Tue", expenses: 0, income: 0 },
  { name: "Wed", expenses: 0, income: 0 },
  { name: "Thu", expenses: 0, income: 0 },
  { name: "Fri", expenses: 0, income: 0 },
  { name: "Sat", expenses: 0, income: 0 },
]
let updatedMonthChartData =   [
  { name: "Week 1", expenses: 0, income: 0 },
  { name: "Week 2", expenses: 0, income: 0 },
  { name: "Week 3", expenses: 0, income: 0 },
  { name: "Week 4", expenses: 0, income: 0 },
]
let updatedYearChartData =  [
  { name: "Jan", expenses: 0, income: 0 },
  { name: "Feb", expenses: 0, income: 0 },
  { name: "Mar", expenses: 0, income: 0 },
  { name: "Apr", expenses: 0, income: 0 },
  { name: "May", expenses: 0, income: 0 },
  { name: "Jun", expenses: 0, income: 0 },
  { name: "Jul", expenses: 0, income: 0 },
  { name: "Aug", expenses: 0, income: 0 },
  { name: "Sep", expenses: 0, income: 0 },
  { name: "Oct", expenses: 0, income: 0 },
  { name: "Nov", expenses: 0, income: 0 },
  { name: "Dec", expenses: 0, income: 0 },
]
// Filter expenses based on the past 7 days
expenses?.filter((expense: Expense) => {
  let expenseDate = new Date(expense.date)
  // console.log("thruty of date: ", expenseDate <= pastDate, expenseDate, pastDate)
   if(expenseDate >= pastDate) {
    return expense;
  }
}).map((expense: Expense) => {  
  let expenseDate = new Date(expense.date)
  // get the day of the week
  if (timeframe === "weekly") {
    const dayOfWeek = expenseDate.getDay();
    updatedWeeklyChartData[dayOfWeek].expenses += expense.amount
  } else if (timeframe === "monthly") {
    // console.log("monthly calculations")
    const weekOfMonth = Math.ceil(expenseDate.getDate() / 7);
    updatedMonthChartData[weekOfMonth - 1].expenses += expense.amount
  } else {
    const monthOfYear = expenseDate.getMonth() + 1;
    // console.log("month of the year: ", monthOfYear)
    updatedYearChartData[monthOfYear].expenses += expense.amount
  }
  })

  income.filter((income:Income)=>{
    let incomeDate = new Date(income.date)
   if(incomeDate >= pastDate) {
    return income;
  }
  }).map((income:Income)=>{
    // console.log(income.date, "income date")
  let incomeDate = new Date(income.date)
  // get the day of the week
  if (timeframe === "weekly") {
    const dayOfWeek = incomeDate.getDay();
    // console.log(dayOfWeek, "day of week", chartData["weekly"][dayOfWeek])
    updatedWeeklyChartData[dayOfWeek].income += income.amount
  } else if (timeframe === "monthly") {
    // console.log("income monthly calculations")
    const weekOfMonth = Math.ceil(incomeDate.getDate() / 7);
    updatedMonthChartData[weekOfMonth - 1].income += income.amount
  }  else {
    const monthOfYear = incomeDate.getMonth() + 1;
    // console.log("month of the year: ", monthOfYear)
    updatedYearChartData[monthOfYear].income += income.amount

  }

  })

  setChartData(oldChartData => ({...oldChartData, weekly: updatedWeeklyChartData, monthly:updatedMonthChartData, yearly:updatedYearChartData}))
  // get day of the week as word like Mon
},[expenses, timeframe, income])
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


// type Timeframe = 'weekly' | 'monthly' | 'yearly';
