"use client";
import React, { useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Popover from "@/components/Popover";
import { Toggle } from "@/components/ui/toggle";
import { Ellipsis } from "lucide-react";
import { Edit2Icon, DeleteIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Loader2, ChevronLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { MainNav } from "@/components/main-nav";
import { useSession } from "next-auth/react";
import Link from "next/link";
interface Income {
    id: string;
    incomeSource: string;
    amount: number;
    date: string;
    category: string;
    description: string;
    workspaceId: string;
  }

const Page = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
    const { workspaceId } = useParams();

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const [isEditFormOpen, setIsEditFormOpen] = useState(false);

    const [loading, setLoading] = useState(false);
    const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(
    null
  );

  const userId = session?.user?.id;
  
    const getWorkspace = async () => {
        const res = await axios.get(`/api/get-workspace/${workspaceId}`);
        return res.data;
      };

    
      const { data, isLoading, error, refetch: refetchCurrentWorkspace } = useQuery<
        any,
        Error
      >({
        queryKey: ["workspace", workspaceId, {type: "done"}],
        queryFn: getWorkspace,
      });
      console.log(data)

      const workspaceCurrency = data?.currency === "USD" ? "$" : data?.currency === "NGN" ? "₦" : data?.currency === "SAR" ? "ر.س" : data?.currency === "QAR" ? "ر.ق" : data?.currency === "AED" ? "د.إ" : "₦";


      const deleteIncome = async (id: string) => {
        try {
          await axios.delete(`/api/income/${id}`);
          queryClient.invalidateQueries({
            queryKey:['workspace', workspaceId, {type: "done"}]
          })
          // refetchCurrentWorkspace();
        } catch (error) {
          console.error("Error deleting income:", error);
        }
      };

        // edit function
        const editIncome = async (id: string, updatedIncome: Income) => {
          try {
            await axios.put(`/api/income/${id}`, updatedIncome);
            queryClient.invalidateQueries({
              queryKey:['workspace', workspaceId, {type: "done"}]
            })
            // refetchCurrentWorkspace();
          } catch (error) {
            console.error("Error editing income:", error);
          }
        }
  

      const handleDeletePopover = (id: string) => {
        setSelectedTransactionId(id);
        setIsDeleteDialogOpen(true);
      };
      
    
      const handleEditPopover = (id: string) => {
        setSelectedTransactionId(id);
        setIsEditDialogOpen(true);
      };

      // Handle the delete confirmation popover

      const handleDeleteConfirmation = () => {
        if (selectedTransactionId) {
          setLoading(true);
          deleteIncome(selectedTransactionId);
          setIsDeleteDialogOpen(false);
          setLoading(false);
        }
      };

      const handleEditConfirmation = () => {
        setIsEditDialogOpen(false);
        setIsEditFormOpen(true);
      }

      const handleEditSave = () => {

      }

      if (isLoading) return  <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <Loader2 className="h-6 w-6 animate-spin mb-2" />
        <p>please wait...</p>
      </div>
  </div>

if (error) return <div className="flex justify-center items-center h-screen">
<div className="flex flex-col items-center">
  <p>An error has occured while fetching data</p>
</div>
</div>;
 
  return (
    <div className=" container mx-auto mt-16">
      {/* <MainNav /> */}
      <Link href={`/user/${userId}/workspace/${data?.workspaceName}/${workspaceId}/dashboard`} className="flex mb-8 items-center space-x-3 rtl:space-x-reverse">
      <ChevronLeft className="h-6 w-6" />
      Back
      </Link>
      
      <div className="">
        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of your income Transctions!
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
          {data?.income?.map((income: Income) => (
            <TableRow key={income.id}>
              <TableCell className={`${income.isDeleted ? ' line-through opacity-[0.5]' : ''}`}>{income.date}</TableCell>
              <TableCell className={`${income.isDeleted ? ' line-through opacity-[0.5]' : ''}`}>{income.incomeSource}</TableCell>
              <TableCell className={`${income.isDeleted ? ' line-through opacity-[0.5]' : ''}`}>{income.category}</TableCell>
              <TableCell className={`${income.isDeleted ? ' line-through opacity-[0.5]' : ''}`}>{workspaceCurrency + " " + income.amount.toFixed(2)}</TableCell>
              <TableCell>
                {income.isDeleted ? <p className=" text-red-500 font-bold">Deleted</p>  : <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Toggle variant="outline" aria-label="Toggle actions">
                      <Ellipsis className="h-4 w-4" />
                    </Toggle>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => handleEditPopover(income.id)}>
                        <Edit2Icon className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeletePopover(income.id)}>
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
  )
}

export default Page