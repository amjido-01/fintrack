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
    const { workspaceId } = useParams();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>(
    null
  );

  console.log(workspaceId, "workspaceId");
  
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
      console.log(data, "data from transaltions Page");

      // Handle the delete confirmation popover
  const handleDeletePopover = (id: string) => {
    setSelectedExpenseId(id);
    setAlertMessage("Are you sure you want to delete this transaction?");
    setAlertTitle("Delete Transaction");
    setIsDialogOpen(true);
  };

  const handleAlertDialogOk = () => {
    if (selectedExpenseId) {
      setLoading(true);
    //   deleteExpense(selectedExpenseId);
      setIsDialogOpen(false);
      setLoading(false);
    }
  };
  return (
    <div className="mt-20 container mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of your Transctions!
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
              <TableCell>{income.date}</TableCell>
              <TableCell>{income.incomeSource}</TableCell>
              <TableCell>{income.category}</TableCell>
              <TableCell>${income.amount.toFixed(2)}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleDeletePopover(income.id)}>
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

      <Popover
        showCancelButton={ true}
        alertDescription={alertMessage}
        alertTitle={alertTitle}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        handleAlertDialogOk={handleAlertDialogOk}
      />
    </div>
  )
}

export default Page