import React from 'react'
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { z } from 'zod';
import { useState } from 'react'
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const schema = z.object({
  workspaceName: z.string().min(1).max(50),
});

type Inputs = z.infer<typeof schema>;

const WorkSpaceDialog = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Inputs>({workspaceName: ''});


  const {workspaceName} = data;

  const handleChange =  (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({...data, [e.target.name]: e.target.value});
  }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      if(!workspaceName) {
         alert('Please enter a workspace name');
         return;
      }

      axios.post('/api/workspace', {
          workspaceName,
      }).then(() => {
         setLoading(false);
         setData({workspaceName: ''});
         alert('Workspace created successfully');
      }).catch(() => {
         setLoading(false);
         setData({workspaceName: ''});
         alert('Workspace creation failed');
      })

     
  }
    



    return (
        <Dialog>
      <DialogTrigger>
      <Button className='h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-500 text-white hover:bg-green-600'>
                  <PlusIcon />
                  Create a new workspace
                  </Button>
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
          value={data.workspaceName}
          onChange={handleChange}
        //   {...register('name')}
          placeholder="Enter workspace name"
          className="mt-1"
        />
        {/* {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>} */}
      </div>

      <Button type="submit" className="w-full">
        Create Workspace
      </Button>
    </form>
        </div>
      </DialogContent>
    </Dialog>
    )
}

export default WorkSpaceDialog