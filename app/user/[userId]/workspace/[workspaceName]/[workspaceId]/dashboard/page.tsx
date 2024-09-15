"use client"
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation';
import { useSession } from "next-auth/react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { TransactionsList } from '@/components/TransactionsList';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ExpensesDialog from '@/components/ExpensesDialog';
import { Total } from '@/components/Total';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { DashboardCard } from '@/components/DashboardCard';
import {ExpensesByCategory} from '@/components/ExpensesByCategory';
import { useState } from 'react';
import { CalendarDateRangePicker } from "@/components/date-range-picker"
import { MainNav } from "@/components/main-nav"
import { RecentExpenses } from "@/components/RecentExpenses"
import UserAvatar from '@/components/ui/UserAvatar';
import { Search } from "@/components/search"
import WorkspaceSwitcher from "@/components/workspace-switcher"
import IncomeDialog from '@/components/IncomeDialog';
import {BadgeDollarSign} from "lucide-react"
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

const page = () => {
    // const searchParams  = useSearchParams();
    const [workspaceExpense, setWorkspaceExpense] = useState([]);
    const { data: session, status } = useSession();
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [averageDailyExpense, setAverageDailyExpense] = useState(0);
    const [topCategory, setTopCategory] = useState("");
    // const [workspaceData, setWorkspaceData] = useState(null);

    let {workspaceId}  = useParams()
    console.log("my id here: ", typeof workspaceId);
    
    const getWorkspaces = async () => {
      const res = await axios.get(`/api/workspace`);
      return res.data;
    }

    const getWorkspace = async () => {
      const res = await axios.get(`/api/get-workspace/${workspaceId}`);
      return res.data;
    }
  
    const {data: workspaces, isLoading, error, refetch} = useQuery({queryKey: ['workspaces'], queryFn: getWorkspaces});

    const {data: currentWorkSpace, isLoading:currentLoading, error:currentError, refetch:refetchCurrentWorkspace} = useQuery(
      {queryKey: ['workspace', workspaceId], queryFn: getWorkspace});
      
      console.log(currentWorkSpace, "currentWorkSpace");

      // check if the currentworkspace has income deposits
      const hasIncome = currentWorkSpace?.income.length > 0;


      // function to calculate the top category from expenses
      const trackTopCategory = (expenses: Expense[]) => {
        // Group expenses by category and sum up the amounts

        const categoryTotals = expenses.reduce((acc: Record<string, number>, expense: Expense) => {
          const { category, amount } = expense;

          if (!acc[category]) {
            acc[category] = 0;
          }

          acc[category] += amount;
          return acc;
        }, {});

        console.log("categoryTotals", categoryTotals)

         // Find the category with the highest total expense
         const topCategory = Object.keys(categoryTotals).reduce((top, current) => {
          // Compare totals and return the category with the higher total
          return categoryTotals[current] > categoryTotals[top] ? current : top;
        }, Object.keys(categoryTotals)[0]);

        setTopCategory(topCategory);
      }
    
      
      useEffect(() => {
        if (currentWorkSpace && currentWorkSpace?.expenses) {
          const total = currentWorkSpace?.expenses.reduce((acc: number, expense: Expense) => acc + expense.amount, 0);
          setTotalExpenses(total);

          const totalIncome = currentWorkSpace?.income.reduce((acc: number, income: Income) => acc + income.amount, 0);
          setTotalIncome(totalIncome);

          const averageDailyExpense = currentWorkSpace?.expenses.reduce((acc: number, expense: Expense) => acc + expense.amount, 0) / currentWorkSpace?.expenses.length;
          const rounded = Math.round(averageDailyExpense * 100) / 100;
          setAverageDailyExpense(rounded);
          
          // Call the function to calculate the top category
          trackTopCategory(currentWorkSpace.expenses);
        }
      }, [currentWorkSpace])
    
    
    if (isLoading) return <div>Loading...</div>;
    if (workspaces) console.log(workspaces, "my data")
    if (error) return <div>Error: {error.message}</div>;
    if (!session) return <p>No active session</p>;
    console.log(session.user.id);
    
    console.log(session.user)
    const userId = session?.user?.id

  const TopCategorySvg = (<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="h-4 w-4 text-muted-foreground"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>)

    
    return (
      <>
       
        <div className="flex-col md:flex ">

          <div className="border-b">
            <div className="flex h-16 items-center px-4">
              <WorkspaceSwitcher workspaces={workspaces}  />
              <MainNav className="mx-6" />
             
              <div className="ml-auto flex items-center space-x-4">
                <Search />
                <UserAvatar />
              </div>
            </div>
          </div>


          <div className="flex-1 space-y-4 p-8 pt-6 ">

            <div className="flex flex-col justify-start md:flex-row md:items-center md:justify-between space-y-2">

              <div className='flex items-center  space-x-2 mb-2 md:mb-0'>
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

              {hasIncome && <div>
              <ExpensesDialog onExpenseAdded={refetchCurrentWorkspace} userId={userId} workspaceId={workspaceId} />
              </div>}

              <div>
                <IncomeDialog userId={userId} workspaceId={workspaceId}  onIncomeAdded={refetchCurrentWorkspace}/>
              </div>
              </div>

              <div className="flex items-center space-x-2 mt-2 md:mt-2">
                <CalendarDateRangePicker />
              </div>
            </div>
            
              {hasIncome ? 
            <div className=''>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics" disabled>
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="notifications" disabled>
                  Notifications
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <DashboardCard cardTitle="Total Income" cardContent={totalIncome} cardIcon={<BadgeDollarSign />} />
                  <DashboardCard cardTitle="Total Expenses" cardContent={totalExpenses} cardIcon={<BadgeDollarSign />} />
                  <DashboardCard cardTitle='Top Category' cardContent={topCategory} cardIcon={TopCategorySvg} />
                  <DashboardCard cardTitle='Average Daily Expense' cardContent={averageDailyExpense} cardIcon={<BadgeDollarSign />} />
                   
                </div>
                <div>
                    <Total />
                  </div>
                <div className="flex flex-col md:flex-row gap-4">

                <ExpensesByCategory/>
                  <Card className="w-full md:w-1/2">
                    <CardHeader>
                      <CardTitle>Recent Expenses</CardTitle>
                      <CardDescription>
                        You have {currentWorkSpace?.expenses.length} expenses this month.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RecentExpenses expenses={currentWorkSpace?.expenses} />
                    </CardContent>
                  </Card>
                </div>
                <div>
                <div>
                  <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <TransactionsList expenses={currentWorkSpace?.expenses} />
                  </CardContent>
                  </Card>
                    </div>
                </div>
              </TabsContent>
            </Tabs>
            </div> : <div><h2>please deposite some money to track your expenses</h2></div>}

          </div>


        </div>
      </>
  )
}

export default page