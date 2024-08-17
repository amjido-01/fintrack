"use client"
import React from 'react'
import { Button } from '@/components/ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { z } from 'zod';
import { useSession } from "next-auth/react";
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Define Zod schema
;


const WorkSpaceDialog = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

   const [loading, setLoading] = useState(false);
   const [workspaceName, setWorkspaceName] = useState('');
   const [error, setError] = useState('');
   const [open, setOpen] = useState(false);

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
      });
      
      setLoading(false);
      
      // Check if the request was successful
      if (response.status === 201) {
        alert('Workspace created successfully');
        setWorkspaceName(''); // Reset workspace name input
        setOpen(false);
        // router.push(`/user/${userId}workspace/${workspaceName}`)
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


    return (
        <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='h-10 px-4 py-2 w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-500 text-white hover:bg-green-600'>
              Create a new workspace
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new workspace</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div>
        <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Workspace Name</Label>
        <Input
          id="workspaceName"
          type="text"
          name='workspaceName'
          value={workspaceName}
          onChange={handleChange}
          placeholder="Enter workspace name"
          className="mt-1"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      <Button  type="submit" className='h-10 px-4 py-2 w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-500 text-white hover:bg-green-600'>
      {loading ? "Creating..." : "Create Workspace"}
      </Button>
    </form>
        </div>
      </DialogContent>
    </Dialog>
    )
}

export default WorkSpaceDialog