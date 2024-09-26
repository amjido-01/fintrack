"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Popover from "@/components/Popover";
import { Toggle } from "@/components/ui/toggle";
import { Ellipsis, ChevronLeft } from "lucide-react";
import { Edit2Icon, DeleteIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";;
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {Label} from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useSession } from "next-auth/react";
interface Expense {
  id: string;
  expenseName: string;
  amount: number;
  date: string;
  category: string;
  note: string;
  workspaceId: string;
}

const ExpensesPage = () => {
  const {data: session} = useSession();
  const queryClient = useQueryClient();
  const { workspaceId } = useParams();

     const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
     
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>(
    null
  );

  // const [editExpense, setEditExpense] = useState<Partial<Expense>>({
  //   id: "",
  //   expenseName: "",
  //   amount: 0,
  //   date: "",
  //   category: "",
  //   note: "",
  // });

  const userId = session?.user?.id;

  const getWorkspace = async () => {
    const res = await axios.get(`/api/get-workspace/${workspaceId}`);
    return res.data;
  };

  const { data, isLoading, error,  refetch: refetchCurrentWorkspace } = useQuery<
    any,
    Error
  >({
    queryKey: ["workspace", workspaceId],
    queryFn: getWorkspace,
  });

  const workspaceCurrency = data?.currency === "USD" ? "$" : data?.currency === "NGN" ? "₦" : data?.currency === "SAR" ? "ر.س" : data?.currency === "QAR" ? "ر.ق" : data?.currency === "AED" ? "د.إ" : "₦";

  // delete expense
  const deleteExpense = async (id: string) => {
    try {
      await axios.delete(`/api/expense/${id}`);
      queryClient.invalidateQueries({
        queryKey:['workspace', workspaceId, {type: "done"}]
      })
    } catch (error) {
      console.log("Error deleting expense:", error);
    }
  };

 const editExpense = async (id: string, updatedExpense: Expense) => {
  try {
    await axios.put(`/api/expense/${id}`, updatedExpense);
    queryClient.invalidateQueries({
      queryKey:['workspace', workspaceId, {type: "done"}]
    })
  } catch (error) {
    console.log("Error editing expense:", error);
  }
 }

 const handleDeletePopover = (id: string) => {
  setSelectedExpenseId(id);
  setIsDeleteDialogOpen(true);
  };

  const handleEditPopover = (id: string) => {
    setSelectedExpenseId(id);
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteConfirmation = () => {
    if (selectedExpenseId) {
      setLoading(true);
      deleteExpense(selectedExpenseId);
      setIsDeleteDialogOpen(false);
      setLoading(false);
    }
  };
  

  const handleEditConfirmation = () => {
    setIsEditDialogOpen(false)
    setIsEditFormOpen(true);
  }

  const handleEditSave = () => {

  }

  // Render logic
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-6 w-6 animate-spin" />
        <p>Loading expenses...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-600">Failed to load expenses: {error.message}</p>;
  }

  return (
    <div className="mt-16 container mx-auto">

         <Link href={`/user/${userId}/workspace/${data?.workspaceName}/${workspaceId}/dashboard`} className="flex mb-8 items-center space-x-3 rtl:space-x-reverse">
      <ChevronLeft className="h-6 w-6" />
      Back
      </Link>

      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of your expenses!
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.expenses?.map((expense: Expense) => (
            <TableRow key={expense.id}>
              <TableCell className={`${expense.isDeleted ? ' line-through opacity-[0.5]' : ''}`}>{expense.date}</TableCell>
              <TableCell className={`${expense.isDeleted ? ' line-through opacity-[0.5]' : ''}`}>{expense.expenseName}</TableCell>
              <TableCell className={`${expense.isDeleted ? ' line-through opacity-[0.5]' : ''}`}>{expense.category}</TableCell>
              <TableCell className={`${expense.isDeleted ? ' line-through opacity-[0.5]' : ''}`}>${expense.amount.toFixed(2)}</TableCell>
              <TableCell>
              {expense.isDeleted ? <p className=" text-red-500 font-bold">Deleted</p> :  <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Toggle variant="outline" aria-label="Toggle actions">
                      <Ellipsis className="h-4 w-4" />
                    </Toggle>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() =>  handleEditPopover(expense.id)}>
                        <Edit2Icon className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeletePopover(expense.id)}>
                        <DeleteIcon className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>}

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete Income</AlertDialogTitle>
        <AlertDialogDescription>
        Are you sure you want to delete this income?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className='flex items-center gap-3'>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction className='text-white' onClick={handleDeleteConfirmation}>
          {loading ? <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Deleting...
          </> : <DeleteIcon className="mr-2 h-4 w-4" />}
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

      <AlertDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Edit Income</AlertDialogTitle>
        <AlertDialogDescription>
        Are you sure you want to Edit this income?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className='flex items-center gap-3'>
        <AlertDialogCancel>Cancel</AlertDialogCancel>

        <AlertDialogAction className='text-white' onClick={handleEditConfirmation}>
            Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

    
  <Dialog open={isEditFormOpen} onOpenChange={setIsEditFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSave}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="incomeSource" className="text-right">
                  Income Source
                </Label>
                <Input
                  id="incomeSource"
                  name="incomeSource"
                  // defaultValue={selectedIncome?.incomeSource}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  // defaultValue={selectedIncome?.amount}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  // defaultValue={selectedIncome?.date}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Input
                  id="category"
                  name="category"
                  // defaultValue={selectedIncome?.category}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  name="description"
                  // defaultValue={selectedIncome?.description}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button className="text-white" type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default ExpensesPage;
