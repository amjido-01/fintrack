"use client"
import React from 'react'
// import { prisma } from '@/lib/prismaDB'
// import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../../../components/ui/button'
import { Label } from '../../../components/ui/label'
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import { Input } from '../../../components/ui/input'
const Page = () => {
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();



const handleSubmit = async (e: any) => {
  e.preventDefault()
  setLoading(true)

  await axios.post("/api/update-profile", {
    firstName,
    lastName,
  }).then((response) => {
    console.log(response)
    setLoading(false)
    // setOpenDialog(true);
    router.push("/createworkspace"); // Redirect to dashboard after successful profile setup
    //router.push('/dashboard'); // Redirect to dashboard after successful profile setup
  }).catch((error) => {
    console.error(error)
    setLoading(false)
  })

}

  return (
    <div className='border-2 border-red-500  mt-24 max-w-md w-full mx-auto p-4 md:p-8'>
      <h2>More About You</h2>
    <form onSubmit={handleSubmit}>

    <Label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">Photo</Label>
          <div className="mt-2 flex items-center gap-x-3">
            <svg className="h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
            </svg>
            <Input id="imageUpload" type="file" name="profile_photo" accept="image/*" />
          </div>
            
            <div className=''>
            <Label className='block mb-2 text-sm font-medium' htmlFor="firstName">First Name</Label>
            <Input 
             type="text"
             id="firstName"
             name="firstName"
             value={firstName}
             onChange={(e) => setFirstname(e.target.value)}
             placeholder="john doe"
             required
            className='block w-full px-4 py-2' />
            </div>
            
        <div className=''>
            <Label className='block mb-2 text-sm font-medium' htmlFor="lastName">Last Name</Label>
            <Input 
             type="text"
             id="lastName"
             name="lastName"
             value={lastName}
             onChange={(e) => setLastname(e.target.value)}
             placeholder="johndoe88"
             required
            className='block w-full px-4 py-2' />
            </div>

        
        {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
        <div className="mt-6">
            {loading ? <Button className="w-full px-6 py-3 text-sm font-medium tracking-wide capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 bg-green-500 text-white hover:bg-green-600" disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button> : <Button type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 bg-green-500 text-white hover:bg-green-600"> Get Started </Button>}
            
        </div>
        </form>
    </div>
  )
}

export default Page