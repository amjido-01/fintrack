"use client";
import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from 'next/link';
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Plus, Briefcase } from "lucide-react"
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

      const handleWorkspaceSelect = () => {
        // /user/${workspace.createdById}/workspace/${workspace.workspaceName}/${workspace.id}/dashboard`
        // router.push(`user/${userId}/workspace/${workspace.workspace}`)
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
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-center mb-8">Select a Workspace</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredWorkspace.map((workspace) => (
        <motion.div key={workspace.id}>
        <Link href={`/user/${workspace.createdById}/workspace/${workspace.workspaceName}/${workspace.id}/dashboard`}>
          <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300" 
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Briefcase className="h-5 w-5 text-primary" />
                {workspace.workspaceName}
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
  </div>
  )
}

export default Page








// export default function WorkspaceSelection() {
 

//   const fetchWorkspaces = async (): Promise<Workspace[]> => {
//     const res = await axios.get(`/api/workspaces/${userId}`)
//     return res.data
//   }

//   const { data: workspaces, isLoading, error } = useQuery<Workspace[], Error>({
//     queryKey: ['workspaces', userId],
//     queryFn: fetchWorkspaces,
//   })

//   useEffect(() => {
//     if (workspaces && workspaces.length === 0) {
//       router.push('/create-workspace')
//     }
//   }, [workspaces, router])

//   const handleWorkspaceSelect = (workspaceId: string) => {
//     router.push(`/workspace/${workspaceId}`)
//   }

//   const handleCreateNewWorkspace = () => {
//     router.push('/create-workspace')
//   }



//   if (error) {
//     toast({
//       title: "Error",
//       description: "Failed to load workspaces. Please try again.",
//       variant: "destructive",
//     })
//     return null
//   }

//   if (!workspaces || workspaces.length === 0) {
//     return null 
//   }

//   return (
//    null
//   )
// }