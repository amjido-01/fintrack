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
import { useQueryClient } from "@tanstack/react-query";


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
    const { workspaceId } = useParams();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(
    null
  );

  
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


      const deleteIncome = async (id: string) => {
        try {
          await axios.delete(`/api/income/${id}`);
          queryClient.invalidateQueries({
            queryKey:['workspace', workspaceId, {type: "done"}]
          })
          // refetchCurrentWorkspace();
        } catch (error) {
        }
      };

      // Handle the delete confirmation popover
  const handleDeletePopover = (id: string) => {
    setSelectedTransactionId(id);
    setAlertMessage("Are you sure you want to delete this transaction?");
    setAlertTitle("Delete Transaction");
    setIsDialogOpen(true);
  };

  const handleAlertDialogOk = () => {
    if (selectedTransactionId) {
      setLoading(true);
      deleteIncome(selectedTransactionId);
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
              <TableCell className={`${income.isDeleted ? ' line-through opacity-[0.5]' : ''}`}>{income.date}</TableCell>
              <TableCell className={`${income.isDeleted ? ' line-through opacity-[0.5]' : ''}`}>{income.incomeSource}</TableCell>
              <TableCell className={`${income.isDeleted ? ' line-through opacity-[0.5]' : ''}`}>{income.category}</TableCell>
              <TableCell className={`${income.isDeleted ? ' line-through opacity-[0.5]' : ''}`}>${income.amount.toFixed(2)}</TableCell>
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
                </DropdownMenu>}
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