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
  } from "@/components/ui/alert-dialog"

  interface PopoverProps {
    isDialogOpen: boolean;
    setIsDialogOpen: (isDialogOpen: boolean) => void;
    handleAlertDialogOk: () => void;
    alertTitle: string;
    alertDescription: string;
  }
const Popover: React.FC<PopoverProps> = ({isDialogOpen, setIsDialogOpen, handleAlertDialogOk, alertTitle, alertDescription}) => {
  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
        <AlertDialogDescription>
        {alertDescription}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction className='text-white' onClick={handleAlertDialogOk}>Ok</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default Popover