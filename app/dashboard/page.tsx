"use client";
import React from 'react';
import { useSession } from "next-auth/react";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
const page = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    console.log(session, "from dashboard");

    useEffect(() => {
      if (status === "authenticated" && session?.user) {
        console.log(session.user.id);
        fetch(`/api/check-profile?userEmail=${session.user.email}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
          })
          .then((data) => {
            if (!data.profileCompleted) {
              router.push("/auth/setting");
            }
          })
          .catch((error) => {
            console.error("Failed to check profile:", error);
          });
      }
    }, [status, session, router]);
    
    
    if (status === "loading") return <p>Loading...</p>;
    if (!session) return <p>No active session</p>;

    console.log(session.user)
  return (
    <div>
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