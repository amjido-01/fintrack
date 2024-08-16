"use client"
import React from 'react'
import { useRouter, useParams } from 'next/navigation';
import { useSession } from "next-auth/react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
const page = () => {
    // const searchParams  = useSearchParams();
    const router = useRouter();
    const {workspaceName, userId} = useParams();
    const { data: session, status } = useSession();
    // const [workspaceData, setWorkspaceData] = useState(null);

    const getWorkspaceData = async () => {
        const res = await axios.get(`/api/workspac/${workspaceName}`);
        return res.data;
        // setWorkspaceData(res.data);
    }
    const {data, isLoading, error} = useQuery({queryKey: ['workspaceData'], queryFn: getWorkspaceData});

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!session) return <p>No active session</p>;
    console.log(session.user)

  return (
    <div>
        <h1>Workspace: {workspaceName}</h1>
      <p>Welcome to your workspace, {session.user.name}!</p>
      <div>
        {JSON.stringify(data, null, 2)}
      </div>
    </div>
  )
}

export default page