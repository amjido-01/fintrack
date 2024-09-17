"use client";
import React, { useState, useEffect } from "react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2 } from "lucide-react";

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
  const { workspaceId } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>(
    null
  );

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editExpense, setEditExpense] = useState<Partial<Expense>>({
    id: "",
    expenseName: "",
    amount: 0,
    date: "",
    category: "",
    note: "",
  });


  const getWorkspace = async () => {
    const res = await axios.get(`/api/get-workspace/${workspaceId}`);
    return res.data;
  };

  const { data, isLoading, error, refetch: refetchCurrentWorkspace } = useQuery<
    any,
    Error
  >({
    queryKey: ["workspace", workspaceId],
    queryFn: getWorkspace,
  });

  // delete expense
  const deleteExpense = async (id: string) => {
    try {
      await axios.delete(`/api/expense/${id}`);
      refetchCurrentWorkspace();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

   // Open the edit modal with expense data
   const handleEditPopover = (expense: Expense) => {
    setEditExpense(expense); // Set the selected expense details
    setIsEditModalOpen(true); // Open the modal
  };

  // Handle input changes in the edit form
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

   const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/expense/${editExpense.id}`, editExpense);
      setIsEditModalOpen(false); // Close the modal
      refetchCurrentWorkspace(); // Refresh the workspace data
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  // Handle the delete confirmation popover
  const handleDeletePopover = (id: string) => {
    setSelectedExpenseId(id);
    setAlertMessage("Are you sure you want to delete this expense?");
    setAlertTitle("Delete Expense");
    setIsDialogOpen(true);
  };

  const handleAlertDialogOk = () => {
    if (selectedExpenseId) {
      setLoading(true);
      deleteExpense(selectedExpenseId);
      setIsDialogOpen(false);
      setLoading(false);
    }
  };

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
    <div className="mt-20 container mx-auto">
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
              <TableCell>{expense.date}</TableCell>
              <TableCell>{expense.expenseName}</TableCell>
              <TableCell>{expense.category}</TableCell>
              <TableCell>${expense.amount.toFixed(2)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Toggle variant="outline" aria-label="Toggle actions">
                      <Ellipsis className="h-4 w-4" />
                    </Toggle>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
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
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Popover for confirmation */}
      <Popover
        showCancelButton={ true}
        alertDescription={alertMessage}
        alertTitle={alertTitle}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        handleAlertDialogOk={handleAlertDialogOk}
      />
    </div>
  );
};

export default ExpensesPage;
