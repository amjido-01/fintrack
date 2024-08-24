import React from 'react';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

const ExpensesDialog = () => {
    const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger className='py-3 w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-500 text-white hover:bg-green-600'>
            Create Expense
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create new Expense</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
      <div>
      {/* <form onSubmit={handleSubmit} className="space-y-4">
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
  </form> */}
      </div>
    </DialogContent>
  </Dialog>
  )
}

export default ExpensesDialog