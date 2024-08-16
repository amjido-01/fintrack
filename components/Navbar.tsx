"use client"
import React from 'react';
import Link from "next/link";
import { useSession } from "next-auth/react";
import {ModeToggle} from "@/components/ui/ModeToggle";
import { Button } from './ui/button';
import UserAvatar from './ui/UserAvatar';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Navbar = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  
  return (
    <nav className="container w-full z-20 start-0">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

  <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" /> */}
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">FinTrack</span>
  </Link>

    {session?.user && <div className='md:flex gap-10 hidden'>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/workspaces">Workspaces</Link>
    </div>}
    
    <div className="flex gap-8 md:order-2 space-x-3 md:space-x-0">
    <div><ModeToggle /></div>

    {loading? (<div className="flex items-center space-x-3">
              <div className="loader"></div> {/* Replace with a spinner component if you have one */}
              <span>Loading...</span>
            </div>): session?.user ? (<UserAvatar />) : ( <div className="flex gap-8 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
    <Link className='text-primary underline-offset-4 hover:underline inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50' href="/auth/signin" >Login</Link>
    <Link href="/auth/signup" className='h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-500 text-white hover:bg-green-600'>Register</Link>
    </div>)}
    </div>

  </div>
</nav>
  )
}

export default Navbar