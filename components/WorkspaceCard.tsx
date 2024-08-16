"use client"
import React from 'react';
import WorkSpaceDialog from './WorkSpaceDialog';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  

const WorkspaceCard = () => {
  return (
    <Card className='w-[20rem]'>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Take control of your expenses and save more money with budgets!</CardDescription>
  </CardHeader>
  <CardContent>
    <WorkSpaceDialog />
  </CardContent>
</Card>
  )
}

export default WorkspaceCard