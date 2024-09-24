import React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  interface Income {
    id: string;
    incomeSource: string;
    amount: number;
    date: string;
    category: string;
    description: string;
    workspaceId: string;
  }


  export function TransactionsList({ income }: { income: Income[] }) {
    const onlyNotDeleted = income?.filter((income) => !income.isDeleted)
    const onlyTenIncome = onlyNotDeleted?.slice(0, 5)
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {onlyTenIncome?.map((income) => (
            <TableRow key={income.id}>
              <TableCell>{income?.date}</TableCell>
              <TableCell>{income?.description}</TableCell>
              <TableCell>{income?.category}</TableCell>
              <TableCell>${income?.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }