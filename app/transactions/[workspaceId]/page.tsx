"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
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
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { MainNav } from "@/components/main-nav";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, } from '@/components/ui/select';
  import { Textarea } from "@/components/ui/textarea";
  
interface Income {
    id: string;
    incomeSource: string;
    amount: number;
    date: string;
    category: string;
    description: string;
    workspaceId: string;
    isDeleted: boolean
  }

  
const categories = ["Salary", "Business", "Freelance", "Investment", "Gift", "Other"
]

const Page = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const { workspaceId } = useParams();
  const {toast} = useToast()

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const [isEditFormOpen, setIsEditFormOpen] = useState(false);

    const [loading, setLoading] = useState(false);
    const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(
    null
  );
  const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);


    const [incomeSource, setIncomeSource] = useState('')
    const [amount, setAmount] = useState<number>()
    // const [error, setError] = useState('')
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState(categories[0])
    const [customCategory, setCustomCategory] = useState<string | null>(null)

    const userId = session?.user?.id;
  
    const getWorkspace = async () => {
        const res = await axios.get(`/api/get-workspace/${workspaceId}`);
        return res.data;
      };

      useEffect(() => {
        if (!isEditFormOpen) {
          setIncomeSource('');
          setAmount(undefined);
          setCategory(categories[0]);
          setDate('');
          setDescription('');
          setSelectedIncome(null);
          setSelectedTransactionId(null);
        }
      }, [isEditFormOpen]);

    
      const { data, isLoading, error, refetch: refetchCurrentWorkspace } = useQuery<
        any,
        Error
      >({
        queryKey: ["workspace", workspaceId, {type: "done"}],
        queryFn: getWorkspace,
      });

      const workspaceCurrency = data?.currency === "USD" ? "$" : data?.currency === "NGN" ? "₦" : data?.currency === "SAR" ? "ر.س" : data?.currency === "QAR" ? "ر.ق" : data?.currency === "AED" ? "د.إ" : "₦";

      const deleteIncome = async (id: string) => {
        try {
          await axios.delete(`/api/income/${id}`);
          refetchCurrentWorkspace();
          queryClient.invalidateQueries({
            queryKey:['workspace', workspaceId, {type: "done"}]
          })

          // show toast
          toast({
            title: "Workspace deleted",
            description: "Income has been successfully deleted.",
            variant: "default",
          })

        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to delete income. Please try again.",
            variant: "destructive",
          })
          console.error("Error deleting income:", error);
        }
      };

        // edit function
        const editIncome = async (id: string, updatedIncome: Income): Promise<void> => {
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
      
    
      const handleEditPopover = (income: Income) => {
        setSelectedTransactionId(income?.id);
        setSelectedIncome(income);
        setIncomeSource(income.incomeSource);
        setAmount(income.amount);
        setCategory(income.category);
        setDate(income.date.split('T')[0]);
        setDescription(income.description);
        setIsEditDialogOpen(true);
      };


      const mutation = useMutation({
        mutationFn: ({ id, updatedIncome }: { id: string; updatedIncome: Partial<Income> }) => 
          axios.put(`/api/income/${id}`, updatedIncome),
        onSuccess: () => {
          refetchCurrentWorkspace();
          queryClient.invalidateQueries({
            queryKey: ['workspace', workspaceId, { type: "done" }]
          });
          toast({
            title: "Income updated",
            description: "Your income has been updated successfully.",
          });
        },
        onError: (error: Error) => {
          console.error("Error editing income:", error);
          toast({
            title: "Error",
            description: `An error occurred while updating income: ${error.message}`,
            variant: "destructive",
          });
        }
      });
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

      const handleEditSave = async (e: React.FormEvent) => {
        e.preventDefault();
      
        if (!selectedTransactionId || !selectedIncome) {
          toast({
            title: "Error",
            description: "No transaction selected for update.",
            variant: "destructive",
          });
          return;
        }
      
        setLoading(true);
      
        const updatedIncome = {
          incomeSource: incomeSource || selectedIncome.incomeSource,
          amount: amount ?? selectedIncome.amount,
          category: category || selectedIncome.category,
          date: date || selectedIncome.date,
          description: description || selectedIncome.description,
        };
      
        console.log("Updating income:", updatedIncome);
      
        mutation.mutate(
          { id: selectedTransactionId, updatedIncome },
          {
            onSuccess: (data) => {
              console.log("Update successful:", data);
              setIsEditFormOpen(false);
              toast({
                title: "Success",
                description: "Income has been successfully updated.",
              });
              refetchCurrentWorkspace();
            },
            onError: (error: any) => {
              console.error("Update failed:", error);
              toast({
                title: "Error",
                description: `Failed to update income: ${error.message}`,
                variant: "destructive",
              });
            },
            onSettled: () => {
              setLoading(false);
            },
          }
        );
      };
      


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
              <TableCell className={`${income.isDeleted ? ' line-through opacity-[0.5]' : ''}`}>{new Date(income.date).toDateString()}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleEditPopover(income)}>
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
    <form onSubmit={handleEditSave} className="space-y-4">
  <div>
    <Label htmlFor="incomeSource">Income Source</Label>
    <Input
      id="incomeSource"
      type="text"
      value={incomeSource || ""}
      onChange={(e) => setIncomeSource(e.target.value)}
      placeholder="e.g., Salary, Freelance, Gift"
      className="mt-1"
    />
  </div>
  <div className="mt-1">
    <Label htmlFor="amount">Amount</Label>
    <Input
      id="amount"
      type="number"
      value={amount || ""}
      onChange={(e) => setAmount(Number(e.target.value))}
      placeholder="Enter amount"
      className="mt-1"
    />
  </div>
  <div className="mt-1">
    <Label htmlFor="category">Category</Label>
    <Select value={category || categories[0]} onValueChange={setCategory}>
      <SelectTrigger>
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((cat) => (
          <SelectItem key={cat} value={cat}>
            {cat}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
  <div className="mt-1">
    <Label htmlFor="date">Date</Label>
    <Input
      id="date"
      type="date"
      value={date || ""}
      onChange={(e) => setDate(e.target.value)}
      className="mt-1"
    />
  </div>
  <div className="mt-1">
    <Label htmlFor="description">Description</Label>
    <Textarea
      id="description"
      value={description || ""}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Description"
      className="mt-1"
    />
  </div>
  <Button className="text-white" type="submit" disabled={loading}>
    {loading ? (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Saving...
      </>
    ) : (
      "Save"
    )}
  </Button>
    </form>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default Page