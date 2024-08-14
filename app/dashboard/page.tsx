"use client";
import React from 'react';
import { useSession } from "next-auth/react";
import { useState } from 'react';
// import { headers } from 'next/headers';
import WorkSpaceDialog from '@/components/WorkSpaceDialog';



const page = () => {
    const { data: session, status } = useSession();
    const [showWelcomePopup, setShowWelcomePopup] = useState(false);
    console.log(session, "from dashboard");

    // const prevUrl = document.referrer
    // if (prevUrl === "http://localhost:3000/auth/signin") {
    //   setShowWelcomePopup(true);
    // }
    // console.log(prevUrl);
    
    
    if (status === "loading") return <p>Loading...</p>;
    if (!session) return <p>No active session</p>;

    console.log(session.user)
  return (
    <div>
      {/* {showWelcomePopup && (  <div className="welcome-banner border-2 border-red-500 text-2xl">
                    Welcome back! You just completed your profile setup.
        </div>)} */}

        {session?.user && (
            <div>
              <p className="text-3xl text-white">Welcome, {session.user.name}</p>
            <div className="mb-5 text-white">{JSON.stringify(session?.user, null, 2)}</div>
            <div className='flex justify-center'>
        </div>
        <div className='flex justify-center'>
          <WorkSpaceDialog />
          </div>
            </div>
        )}

         
    </div>
  )
}

export default page