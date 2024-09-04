"use client"
import React, { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation';
import { useSession } from "next-auth/react";
import axios from 'axios';
import { Metadata } from "next"
import Image from "next/image"
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
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
} from "@/components/ui/tabs"
import { useState } from 'react';
import { CalendarDateRangePicker } from "@/components/date-range-picker"
import { MainNav } from "@/components/main-nav"
import { Overview } from "@/components/overview"
import { RecentExpenses } from "@/components/RecentExpenses"
import UserAvatar from '@/components/ui/UserAvatar';
import { Search } from "@/components/search"
import WorkspaceSwitcher from "@/components/workspace-switcher"
import { UserNav } from "@/components/user-nav"
import WorkSpaceDialog from '@/components/WorkSpaceDialog';
import { getSession } from 'next-auth/react';

// export const metadata: Metadata = {
//   title: "Dashboard",
//   description: "Example dashboard app built using the components.",
// }


const page = () => {
    // const searchParams  = useSearchParams();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const {workspaceName} = useParams();
    const [workspaceExpense, setWorkspaceExpense] = useState([]);
    const { data: session, status } = useSession();
    const [totalExpenses, setTotalExpenses] = useState(0);
    // const [workspaceData, setWorkspaceData] = useState(null);

    // const getWorkspaceData = async () => {
    //     const res = await axios.get(`/api/workspac/${workspaceName}`);
    //     return res.data;
    //     // setWorkspaceData(res.data);
    // }
    let {workspaceId}  = useParams()
    console.log("my id here: ", typeof workspaceId);
    
    const getWorkspaces = async () => {
      const res = await axios.get(`/api/workspace`);
      return res.data;
    }
    const getWorkspace = async () => {
      const res = await axios.get(`/api/get-workspace/${workspaceId}`);
      console.log(res.data, "workspace data")
      return res.data;
    }
    // {
    //   expenses: [{},{},],

    // }

    useEffect(() => {

    // calculations do them here 
    const total = currentWorkSpace?.expenses.reduce((acc, expense) => acc + expense.amount, 0);
    setTotalExpenses(totalExpenses);

    }, [workspaceId])
  
    
    
    const {data: workspaces, isLoading, error, refetch} = useQuery({queryKey: ['workspaces'], queryFn: getWorkspaces});

    const {data: currentWorkSpace, isLoading:currentLoading, error:currentError,} = useQuery(
      {queryKey: ['workspace'], queryFn: getWorkspace});
    
    // if (currentWorkSpace) console.log(currentWorkSpace, "my workspace data")
      // pass workspace expenses to the workspace expenses state
    if (currentWorkSpace) {
        let curWorkspaceExpenses = currentWorkSpace?.expenses;
        console.log(curWorkspaceExpenses);
        
      }
      
    
    if (isLoading) return <div>Loading...</div>;
    if (workspaces) console.log(workspaces, "my data")
    if (error) return <div>Error: {error.message}</div>;
    if (!session) return <p>No active session</p>;
    console.log(session.user.id);
    
    console.log(session.user)
    const userId = session?.user?.id
    
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
              <div>
              <ExpensesDialog userId={userId} workspaceId={workspaceId} />
              </div>
              </div>

              <div className="flex items-center space-x-2 mt-2 md:mt-2">
                <CalendarDateRangePicker />
              </div>
            </div>


            <div>
            </div>
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
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Expenses
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">N{totalExpenses}</div>
                      <p className="text-xs text-muted-foreground">
                        +20.1% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                      Average Daily Expense
                      </CardTitle>
                      <svg
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
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+2350</div>
                      <p className="text-xs text-muted-foreground">
                        +180.1% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Top Category</CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <path d="M2 10h20" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Food</div>
                      <p className="text-xs text-muted-foreground">
                        +19% from last month
                      </p>
                    </CardContent>
                  </Card>

                   
                </div>
                <div>
                    <Total />
                  </div>
                <div className="flex flex-col md:flex-row gap-4">

                      <Overview />  
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
                    <TransactionsList />
                  </CardContent>
                  </Card>
                    </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </>
  )
}

export default page