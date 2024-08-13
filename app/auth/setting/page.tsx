"use client"
import React from 'react'
// import { prisma } from '@/lib/prismaDB'
// import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
const page = () => {
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const router = useRouter();



const handleSubmit = async (e: any) => {
  e.preventDefault()

  const response = await fetch('/api/update-profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ firstName, lastName }),
  });

  if (response.ok) {
    router.push('/dashboard'); // Redirect to dashboard after successful profile setup
  } else {
    console.error('Failed to update profile');
  }
}

  return (
    <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="firstname">First Name:</label>
      <input
        type="text"
        id="firstname"
        value={firstName}
        onChange={(e) => setFirstname(e.target.value)}
        required
      />
    </div>
    <div>
      <label htmlFor="lastname">Last Name:</label>
      <input
        type="text"
        id="lastname"
        value={lastName}
        onChange={(e) => setLastname(e.target.value)}
        required
      />
    </div>
    <button type="submit">Complete Profile</button>
  </form>
  )
}

export default page