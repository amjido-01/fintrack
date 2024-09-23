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
import {  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, } from '@/components/ui/select';


// Define Zod schema
const workspaceSchema = z.object({
  workspaceName: z.string().min(1, "Workspace name is required").refine((val) => !val.includes(' '), "Workspace name cannot contain spaces"),
  description: z.string().min(1, "Description is required"),
  currency: z.string().min(1, "Currency is required"),
});

const currencies = ["AED", "USD", "NGN", "SAR", "QAR"]


const WorkSpaceDialog = () => {
  // connst {setWorkspaces} = useWorkspaceStore();
  const router = useRouter();
  const { data: session, status } = useSession();

   const [loading, setLoading] = useState(false);
   const [workspaceName, setWorkspaceName] = useState('');
   const [description, setDescription] = useState('');
  //  const [error, setError] = useState('');
  const [errors, setErrors] = useState<{ workspaceName?: string; description?: string, currency?: string }>({});
   const [open, setOpen] = useState(false);
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [alertTitle, setAlertTitle] = useState("");
   const [alertMessage, setAlertMessage] = useState("");
   const [newWorkspaceId, setNewWorkspaceId] = useState('');
   const [workspaceNameValue, setWorkspaceNameValue] = useState('');
   const [workspaceIdValue, setWorkspaceIdValue] = useState('');
   const [currency, setCurrency] = useState('');

   const userId = session?.user.id;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
   
    const validation = workspaceSchema.safeParse({workspaceName, description, currency});
    if(!validation.success) {
      const errorMessages = validation.error.format();
      setErrors({
        workspaceName: errorMessages.workspaceName?._errors?.[0],
        currency: errorMessages.currency?._errors?.[0],
        description: errorMessages.description?._errors?.[0],
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/workspace', {
        workspaceName,
        description
      });
      
      setLoading(false);
      console.log("response", response.data.id)
      
      // Check if the request was successful
      if (response.status === 201) {
        // get workspace id
        
        alert('Workspace created successfully');
        setWorkspaceIdValue(response.data.id);
        setWorkspaceNameValue(workspaceNameValue)
        setWorkspaceName(''); // Reset workspace name input
        setDescription("")
        setCurrency("")
        setAlertTitle('Workspace Created Successfully');
        setAlertMessage('Your workspace has been created successfully.');
        setIsDialogOpen(true);
        setOpen(false);
        // window.location.href=`/user/${userId}/workspace/${workspaceName}/${response.data.id}/dashboard`
      } else {
        setErrors(response.data.error || 'Workspace creation failed');
      }
    } catch (err) {
      setLoading(false);
      if (axios.isAxiosError(err) && err.response) {
        setErrors(err.response.data.error || 'Workspace creation failed');
        setAlertTitle("Error");
        setAlertMessage(err.response.data.error || "Workspace creation failed");
        setIsDialogOpen(true);
        setLoading(false);
      } else {
      setAlertTitle("Error");
      setAlertMessage("Workspace creation failed");
      setIsDialogOpen(true);
      setLoading(false);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleAlertDialogOk() {
    setIsDialogOpen(false);
    if (alertTitle === "Error") {
      setOpen(true); 
    } else {
      router.push(`/user/${userId}/workspace/${workspaceNameValue}/${workspaceIdValue}/dashboard`)
      setOpen(false); 
    }
    setLoading(false)
  }


    return (
      <div>

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
      <div className='mt-1'>
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
          {errors.workspaceName && <p className="text-red-500 text-sm mt-1">{errors.workspaceName}</p>}
      </div>
      <div className="mt-1">
    <Label htmlFor="currency">Currency</Label>
      <Select value={currency} onValueChange={(value) => setCurrency(value)}>
      <SelectTrigger>
      <SelectValue placeholder="Please select workspace currency" />
      </SelectTrigger>
      <SelectContent>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem key={currency} value={currency}>
            {currency}
          </SelectItem>
        ))}
    {/* {data && Object.entries(data).map(([code]) => (
    <SelectItem key={code} value={code}>
      {code}
    </SelectItem>
    ))} */}
  </SelectContent>
      </SelectContent>
      </Select>
      {errors.currency && <p className="text-red-500 text-sm mt-1">{errors.currency}</p>}
        </div>
      <div className="mt-1">
      <Label htmlFor="description">Description</Label>
      <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className='mt-1' name='description' placeholder="Add a description for your workspace." id="description" />
      {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
    </div>
      <Button  type="submit" className='w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-500 text-white hover:bg-green-600'>
      {loading ? "Creating..." : "Create Workspace"}
      </Button>
    </form>
        </div>
      </DialogContent>
    </Dialog>

{/* <Popover showCancelButton={false} alertDescription={alertMessage} alertTitle={alertTitle} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} handleAlertDialogOk={handleAlertDialogOk} /> */}
      </div>

    )
}

export default WorkSpaceDialog