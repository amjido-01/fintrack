"use client";
import React from 'react';
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const page = () => {
    const { data: session } = useSession();

    console.log(session);
    

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' });
    }
  return (
    <div>
        {session?.user && (
            <div>
                 <p className="text-3xl text-white">Welcome, {session.user.name}</p>
          <div className="mb-5 text-white">{JSON.stringify(session?.user, null, 2)}</div>

          <button
            onClick={handleSignOut}
            className="text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
            </div>
        )}
    </div>
  )
}

export default page