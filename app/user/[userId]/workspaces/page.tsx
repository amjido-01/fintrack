"use client";
import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
const Page = () => {
    const {userId} = useParams()
    console.log(userId);

    const getWorkspaces = async () => {
        const res = await axios.get(`/api/workspace`);
        return res.data;
      }

      const {data: workspaces, isLoading, error, refetch} = useQuery({queryKey: ['workspaces', {type: "done"}], queryFn: getWorkspaces});

      console.log(workspaces, "from workspace")
    
  return (
    <div>
        workspaces
    </div>
  )
}

export default Page