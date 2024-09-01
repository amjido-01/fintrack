import React from 'react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Loader2 } from "lucide-react";
import {PlusCircle} from "lucide-react"
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
    SelectValue, } from './ui/select';

const ExpensesDialog = () => {
    const [open, setOpen] = useState(false)
    const [expenseName, setExpenseName] = useState('')
    const [date, setDate] = useState('')
    const [expenseAmount, setExpenseAmount] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [note, setNote] = useState('')
    const [data, setData] = useState({})

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setData({
          expenseName,
          date,
          expenseAmount,

        })
        setOpen(false)
    }
    console.log(data);
    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger className='py-2 px-4 w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-500 text-white hover:bg-green-600'>
              <PlusCircle className="mr-2 h-4 w-4" />
               New Workspace
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
      <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <Label htmlFor="name">Expense Name</Label>
      <Input
        id="expenseName"
        type="text"
        name='expenseName'
        value={expenseName}
        onChange={(e) => setExpenseName(e.target.value)}
        placeholder="Enter workspace name"
        className="mt-1"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
    <div className="mt-1">
      <Label htmlFor="amount">Amount</Label>
      <Input
        id="amount"
        type="text"
        name='amount'
        value={expenseAmount}
        onChange={(e) => setExpenseAmount(e.target.value)}
        placeholder="Enter amount"
        className="mt-1"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
    <div className="mt-1">
    <Label htmlFor="category">Category</Label>
      <Select>
      <SelectTrigger>
      <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
      <SelectItem value="food">Food</SelectItem>
      <SelectItem value="transportation">Transportation</SelectItem>
      <SelectItem value="entertainment">Entertainment</SelectItem>
      <SelectItem value="utilities">Utilities</SelectItem>
      <SelectItem value="bills">Bills</SelectItem>
      <SelectItem value="other">Other</SelectItem>
      </SelectContent>
      </Select>
      
    </div>

    <div className="mt-1">
      {/* date picker */}
      <label htmlFor="date">Date</label>
      <input type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
    </div>

    <div className="mt-1">
    <Label htmlFor="note">Note</Label>
    <Textarea value={note} onChange={(e) => setNote(e.target.value)} className='mt-1' name='description' required placeholder="Optional additional notes." id="note" />
  </div>
    <div className="mt-6">
      {loading? <Button className="w-full px-6 py-3 text-sm font-medium tracking-wide capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 bg-green-500 text-white hover:bg-green-600" disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button> : <Button type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 bg-green-500 text-white hover:bg-green-600"> Add Expense </Button>}

    </div>
  </form>
      </div>
    </DialogContent>
  </Dialog>
  )
}

export default ExpensesDialog