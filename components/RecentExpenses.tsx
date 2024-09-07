import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar";


  interface Expense {
    id: string;
    expenseName: string;
    amount: number;
    date: string;
    category: string;
    note: string;
    workspaceId: string;
  }

  
  export function RecentExpenses({ expenses}: { expenses: Expense[] }) {
    const onlyTenExpenses = expenses?.slice(0, 5)
    const expenseList = onlyTenExpenses?.map(expense => 
      <li key={expense.id} className="flex items-center list-none">
      <Avatar className="h-9 w-9">
        <AvatarImage src="/avatars/01.png" alt="Avatar" />
        <AvatarFallback>OM</AvatarFallback>
      </Avatar>

      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{expense.expenseName}</p>
        <p className="text-sm text-muted-foreground">
          {expense.date}
        </p>
      </div>
      
      <div className="ml-auto font-medium">N{expense.amount}</div>
      </li>
    )

    return (
      <ul className="space-y-8">
        {expenseList}
      </ul>
    )
  }

  