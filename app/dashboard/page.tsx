"use client";
import React from 'react';
import { useSession } from "next-auth/react";
import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { headers } from 'next/headers';


const page = () => {
    const { data: session, status } = useSession();
    const [showWelcomePopup, setShowWelcomePopup] = useState(false);
    // const router = useRouter();
    console.log(session, "from dashboard");

    // const prevUrl = document.referrer
    // if (prevUrl === "http://localhost:3000/auth/signin") {
    //   setShowWelcomePopup(true);
    // }
    // console.log(prevUrl);
    

    // useEffect(() => {
    //   if (status === "loading") return;

    //   if (status === "authenticated" && session?.user) {

    //     fetch(`/api/check-profile?userEmail=${session.user.email}`)
    //       .then((res) => {
    //         if (!res.ok) {
    //           throw new Error(`HTTP error! status: ${res.status}`);
    //         }
    //         return res.json();
    //       })
    //       .then((data) => {
    //         if (!data.profileCompleted) {
    //           router.push("/auth/setting");
    //           return
    //         }
    //         router.push("/dashboard");
    //       })
    //       .catch((error) => {
    //         console.error("Failed to check profile:", error);
    //       });
    //   }
    // }, [status, session, router]);
    
    
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
            </div>
        )}
    </div>
  )
}

export default page