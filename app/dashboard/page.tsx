"use client"
import React from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
const page = () => {
  return (
    <div>  
        <button onClick={() => signOut({callbackUrl: "/"})}>logout</button>
        
    </div>
  )
}

export default page