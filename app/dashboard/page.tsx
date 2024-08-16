"use client";
import React from 'react';
import { useSession } from "next-auth/react";
// import { headers } from 'next/headers';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Workspace } from '@prisma/client';


const page = () => {
    const { data: session, status } = useSession();

    console.log(session, "from dashboard");
    
    if (status === "loading") return <p>Loading...</p>;
    if (!session) return <p>No active session</p>;
    console.log(session.user)

  return (
    <div className='container mt-10'>

        {session?.user && (
            <div>
              <p className="text-2xl text-center capitalize text-white">{session.user.name}, Welcome to your Dashboard</p>
            </div>
        )}
         
    </div>
  )
}

export default page