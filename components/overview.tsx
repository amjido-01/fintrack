"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// const data = [
//   {
//     name: "Jan",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Feb",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Mar",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Apr",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "May",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Jun",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Jul",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Aug",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Sep",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Oct",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Nov",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Dec",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
// ]

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


export function Overview() {
  const [timeframe, setTimeframe] = useState("weekly")


  return (
    <Card className="w-full md:w-1/2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <div>
       <CardTitle>Overview</CardTitle>
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
      <CardContent className="pl-2">
      <ResponsiveContainer width="100%" height={310}>
      <BarChart data={chartData[timeframe]}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: number) => `$${value}`}
        />
        <Tooltip
              contentStyle={{ background: '#333', border: 'none' }}
              labelStyle={{ color: '#fff' }}
              formatter={(value) => [`$${value}`, 'Amount']}
            />
        <Bar
          dataKey="amount"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary border-2 border-red-500"
        />
      </BarChart>
    </ResponsiveContainer>
        </CardContent>
    </Card>
  )
}