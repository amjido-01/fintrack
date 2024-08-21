"use client"
import React from 'react'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button"
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import WorkSpaceDialog from '@/components/WorkSpaceDialog';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSession } from "next-auth/react";
import axios from 'axios';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

const page = () => {
    const router = useRouter();
  const { data: session, status } = useSession();

   const [loading, setLoading] = useState(false);
   const [workspaceName, setWorkspaceName] = useState('');
   const [description, setDescription] = useState('');
   const [error, setError] = useState('');
//    const [open, setOpen] = useState(false);

   const userId = session?.user.id;


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWorkspaceName(e.target.value);
      };
    
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        try {
          const response = await axios.post('/api/workspace', {
            workspaceName,
            description
          });
          
          setLoading(false);
          
          // Check if the request was successful
          if (response.status === 201) {
            alert('Workspace created successfully');
            setWorkspaceName(''); // Reset workspace name input
            setOpen(false);
            // router.push(`/user/${userId}workspace/${workspaceName}`)
            router.push(`/user/${userId}/workspace/${workspaceName}/dashboard`)
            // router.push('/dashboard')
          } else {
            setError(response.data.error || 'Workspace creation failed');
          }
        } catch (err) {
          setLoading(false);
          if (axios.isAxiosError(err) && err.response) {
            setError(err.response.data.error || 'Workspace creation failed');
          } else {
            setError('Workspace creation failed');
          }
          console.error(err);
        }
      }
    
    const [open, setOpen] = React.useState(false)
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2 sm:px-6 lg:px-8'>
          <div className="w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-md border-2">
    <div className="px-6 py-4">
        <div className="flex justify-center mx-auto">
            <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />
        </div>

        <h3 className="mt-3 text-xl font-medium text-center">Create a Workspace</h3>

        <form onSubmit={handleSubmit}>
        <div className='mt-4'>
          <Label htmlFor="name">Workspace Name</Label>
          <Input
            id="workspaceName"
            type="text"
            name='workspaceName'
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            placeholder="Enter workspace name"
            className="mt-1"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <div className="mt-4">
        <Label htmlFor="description">Description</Label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className='mt-1' name='description' required placeholder="Add a description for your workspace." id="description" />
      </div>

      <div className='mt-4'>
        {loading ? <Button className="w-full px-6 py-3 text-sm font-medium tracking-wide capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 bg-green-500 text-white hover:bg-green-600" disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>:   <Button  type="submit" className='h-10 px-4 py-2 w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-500 text-white hover:bg-green-600'>
        Create Workspace
        </Button>}
      </div>

        </form>
    </div>
</div>
        </div>
       
    )
}

export default page