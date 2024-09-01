import React from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  

const transactions = [
    { id: 1, date: "2023-06-01", description: "Groceries", category: "Food", amount: 85.20 },
    { id: 2, date: "2023-06-02", description: "Netflix", category: "Entertainment", amount: 13.99 },
    { id: 3, date: "2023-06-03", description: "Gas", category: "Transportation", amount: 45.00 },
    { id: 4, date: "2023-06-04", description: "Electricity", category: "Utilities", amount: 120.50 },
    { id: 5, date: "2023-06-05", description: "Dinner", category: "Food", amount: 65.30 },
  ]

  export function TransactionsList() {
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
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>${transaction.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }