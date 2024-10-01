"use client";
import React from 'react';
import axios from 'axios';
import { MainNav } from '@/components/main-nav';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu
  , DropdownMenuItem
  , DropdownMenuSeparator
  , DropdownMenuCheckboxItem
  , DropdownMenuRadioGroup
  , DropdownMenuContent,
  DropdownMenuLabel
  , DropdownMenuTrigger
 } from '@/components/ui/dropdown-menu';
import MiniFooter from '@/components/MiniFooter';
import UserAvatar from '@/components/ui/UserAvatar';
import Link from 'next/link';
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Plus, Briefcase, Ellipsis, ChartSpline } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


interface Workspace {
    id: string
    name: string
    createdAt: string
}

const Page = () => {
    const router = useRouter()
    const { data: session } = useSession()
    const { toast } = useToast()
    const userId = session?.user?.id
    // const {userId} = useParams()

    const getWorkspaces = async () => {
        const res = await axios.get(`/api/workspace`);
        return res.data;
      }

      const {data: workspaces, isLoading, error, refetch} = useQuery({queryKey: ['workspaces', {type: "done"}], queryFn: getWorkspaces});

    
      const handleCreateNewWorkspace = () => {
        router.push('/createworkspace');
      }

      if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col items-center text-primary">
              <Loader2 className="h-6 w-6 animate-spin mb-2" />
              <p className="text-primary">Getting your workspaces ready, please wait...</p>
            </div>
        </div>
        )
      }

      const filteredWorkspace = workspaces?.filter((workspace) => !workspace.isDeleted)
    
  return (
    <div className="container mx-auto px-4">

      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          {/* <MainNav userId={userId} 
          workspaceName={currentWorkSpace?.workspaceName} 
          workspaceId={workspaceId as string} 
          /> */}
          <div className="ml-auto flex items-center space-x-4">
            <UserAvatar />
          </div>
        </div>
      </div>

    <h1 className="text-3xl font-bold my-8">Select a Workspace</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredWorkspace.map((workspace) => (
        <motion.div key={workspace.id}>
        <Link href={`/user/${workspace.createdById}/workspace/${workspace.workspaceName}/${workspace.id}/dashboard`}>
          <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300" 
          >
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div className='flex items-center gap-2 text-xl'> 
                <Briefcase className="h-5 w-5 text-primary" />
                {workspace.workspaceName}
                </div>

                
                <DropdownMenu>
               <DropdownMenuTrigger asChild>
                <Ellipsis className='h-5 w-5' />
                </DropdownMenuTrigger>
                <DropdownMenuContent className=" w-24">
                  <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href={`/setting/${workspace.id}`}>
                      Setting
                      </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>

              </CardTitle>
              <CardDescription>Created on {new Date(workspace.createdAt).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Click to enter this workspace</p>
            </CardContent>
          </Card>
          </Link>
        </motion.div>
      ))}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300 border-dashed" 
        onClick={handleCreateNewWorkspace}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Plus className="h-5 w-5" />
              Create New Workspace
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Start a new project or team</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>

    <MiniFooter />
  </div>
  )
}

export default Page