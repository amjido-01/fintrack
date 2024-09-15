import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
const Popover = ({isDialogOpen, setIsDialogOpen, handleAlertDialogOk}: any) => {
  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Expense Added Successfully</AlertDialogTitle>
        <AlertDialogDescription>
        Your expense has been created successfully.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction onClick={handleAlertDialogOk}>Ok</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default Popover