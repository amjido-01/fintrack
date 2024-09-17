"use client"
import React from 'react'
import { Button } from '@/components/ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { z } from 'zod';
import { Textarea } from "@/components/ui/textarea"
import { useSession } from "next-auth/react";
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Popover from './Popover';
// import useWorkspaceStore from '@/store/useWorkspaceStore';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Define Zod schema


const WorkSpaceDialog = () => {
  // connst {setWorkspaces} = useWorkspaceStore();
  const router = useRouter();
  const { data: session, status } = useSession();

   const [loading, setLoading] = useState(false);
   const [workspaceName, setWorkspaceName] = useState('');
   const [description, setDescription] = useState('');
   const [error, setError] = useState('');
   const [open, setOpen] = useState(false);
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [alertTitle, setAlertTitle] = useState("");
   const [alertMessage, setAlertMessage] = useState("");
   const [newWorkspaceId, setNewWorkspaceId] = useState('');

   const userId = session?.user.id;

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
      console.log("response", response.data.id)
      
      // Check if the request was successful
      if (response.status === 201) {
        alert('Workspace created successfully');
        setWorkspaceName(''); // Reset workspace name input
        setDescription("")
        setOpen(false);
        window.location.href=`/user/${userId}/workspace/${workspaceName}/${response.data.id}/dashboard`
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
      <DialogTrigger className='py-3 w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>
            new workspace
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
          onChange={(e) => setWorkspaceName(e.target.value)}
          placeholder="Enter workspace name"
          className="mt-1"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
      <div className="">
      <Label htmlFor="description">Description</Label>
      <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className='mt-1' name='description' required placeholder="Add a description for your workspace." id="description" />
    </div>
      <Button  type="submit" className='w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-500 text-white hover:bg-green-600'>
      {loading ? "Creating..." : "Create Workspace"}
      </Button>
    </form>
        </div>
      </DialogContent>
    </Dialog>
    )
}

export default WorkSpaceDialog