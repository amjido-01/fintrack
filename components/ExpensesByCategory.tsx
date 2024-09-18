"use client"

import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

interface Expense {
  id: string;
  expenseName: string;
  amount: number;
  date: string;
  category: string;
  note: string;
  workspaceId: string;
}

type Timeframe = 'weekly' | 'monthly' | 'yearly';
type ChartDataPoint = {
  category: string;
  amount: number;
  fill: string;
};

const chartConfig = {
  Food: {
    label: "Food",
    color: "hsl(var(--color-food))",
  },
  Clothing: {
    label: "Clothing",
    color: "hsl(var(--chart-2))",
  },
  Medical: {
    label: "Medical",
    color: "hsl(var(--chart-3))",
  },
  Transportation: {
    label: "Transportation",
    color: "hsl(var(--chart-4))",
  },
  Entertainment: {
    label: "Entertainment",
    color: "hsl(var(--chart-6))",
  },
  Other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function ExpensesByCategory({ expenses }: { expenses: Expense[] }) {
  const [timeframe, setTimeframe] = useState<Timeframe>('weekly');
  const [chartData, setChartData] = useState<Record<Timeframe, ChartDataPoint[]>>({
    weekly: [],
    monthly: [],
    yearly: [],
  });

  useEffect(() => {
    const currentDate = new Date();
    const timeFrameInt = timeframe === "weekly" ? 7 : timeframe === "monthly" ? 30 : 365;
    const pastDate = new Date(currentDate.getTime() - timeFrameInt * 24 * 60 * 60 * 1000);

    // Initialize category totals
    const categoryTotals = {
      Food: 0,
      Clothing: 0,
      Medical: 0,
      Transportation: 0,
      Entertainment: 0,
      Other: 0,
    };

    // Filter and process expenses within the selected timeframe
    const filteredExpenses = expenses?.filter((expense: Expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= pastDate && expenseDate <= currentDate;
    });

    console.log("Filtered Expenses:", filteredExpenses); // Debugging log

    filteredExpenses.forEach((expense: Expense) => {
      // Normalize the category name
      const normalizedCategory = expense.category.charAt(0).toUpperCase() + expense.category.slice(1).toLowerCase();
      
      // Add amount to corresponding category or "Other" if it's not listed
      if (normalizedCategory in categoryTotals) {
        categoryTotals[normalizedCategory] += expense.amount;
      } else {
        categoryTotals.Other += expense.amount;
      }
    });

    // Prepare chart data
    const updatedChartData = Object.entries(categoryTotals)
      .filter(([_, amount]) => amount > 0)
      .map(([category, amount]) => ({
        category,
        amount,
        fill: chartConfig[category].color,
      }));

    setChartData(oldChartData => ({ ...oldChartData, [timeframe]: updatedChartData }));
  }, [expenses, timeframe]);

  return (
    <Card className="flex flex-col w-full md:w-1/2 pb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Total Expenses By Category</CardTitle>
          <CardDescription>Breakdown of expenses by category</CardDescription>
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
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto h-[300px] w-full"
        >
          <PieChart>
            <Pie data={chartData[timeframe]} dataKey="amount" nameKey="category" />
            <ChartLegend
              content={<ChartLegendContent nameKey="category" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
