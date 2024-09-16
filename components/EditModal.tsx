import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface EditModalProps {
  title: string;
  expense: {
    expenseName: string;
    amount: number;
    date: string;
    category: string;
  };
  onSave: (updatedExpense: any) => void; // Callback to handle save
}

export function EditModal({ title, expense, onSave }: EditModalProps) {
  const [editExpense, setEditExpense] = useState(expense);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    onSave(editExpense);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Edit Expense</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">{title}</h4>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="expenseName">Name</Label>
              <Input
                id="expenseName"
                name="expenseName"
                value={editExpense.expenseName}
                onChange={handleChange}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                value={editExpense.amount}
                onChange={handleChange}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={editExpense.date}
                onChange={handleChange}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={editExpense.category}
                onChange={handleChange}
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
        <Button className="mt-4" onClick={handleSubmit}>
          Save
        </Button>
      </PopoverContent>
    </Popover>
  );
}
