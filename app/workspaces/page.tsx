"use client"
import React from 'react';
import {
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import Link from 'next/link';
import axios from 'axios';
import { Workspace } from '@prisma/client';
import WorkspaceCard from '@/components/WorkspaceCard';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from 'next-auth/react';



const page = () => {
  const { data: session, status } = useSession();
    const fetchWorkspaces = async (): Promise<Workspace[]> => {
        const response = await axios.get('/api/workspace');
        return response.data;
    };
    const { data, isLoading, error} = useQuery({queryKey: ["workspaces"], queryFn: () => fetchWorkspaces()})

    const userId = session?.user?.id
    const workspaceName = data?.map((data) => data.workspaceName)
    console.log(data)

  return (
    <div className='container mx-auto'>
      <h1>Workspaces</h1>

      <div className='flex flex-wrap gap-4 border-2 border-red-500'>
        {data?.map((workspace) => (
          <Link href={`/user/${userId}/workspace/${workspace.workspaceName}`} key={workspace.id} className='w-[20rem]'>
            <Card className='h-full'>
              <CardHeader>
                <CardTitle>{workspace.workspaceName}</CardTitle>
                <CardDescription className='text-green-500'>All wallet</CardDescription>
              </CardHeader>
              <CardContent>
               {workspace.description}
              </CardContent>
            </Card>
          </Link>
        ))}

        {/* Assuming WorkspaceCard is an additional static card */}
        <WorkspaceCard />
      </div>
    </div>
  )
}

export default page