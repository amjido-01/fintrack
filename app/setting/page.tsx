"use client"
import React from 'react'
import WorkspaceSwitcher from '@/components/workspace-switcher';
import { MainNav } from '@/components/main-nav';
import UserAvatar from '@/components/ui/UserAvatar';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,}
  from "@/components/ui/card";
  import { Label } from "@/components/ui/label";
  import { Input } from "@/components/ui/input";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,}
    from "@/components/ui/select"
  

    // Placeholder data - replace with actual data fetching logic
const initialWorkspace = {
  id: '1',
  name: 'Personal Expenses',
  currency: 'USD',
  members: [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Owner' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
  ],
  categories: [
    { id: '1', name: 'Food & Dining' },
    { id: '2', name: 'Transportation' },
    { id: '3', name: 'Utilities' },
    { id: '4', name: 'Entertainment' },
  ],
  budgetLimit: 2000,
}


const Page = () => {
  const [workspace, setWorkspace] = useState(initialWorkspace)
    const [newCategory, setNewCategory] = useState('')
    const [newMemberEmail, setNewMemberEmail] = useState('')

  const getWorkspaces = async () => {
    const res = await axios.get(`/api/workspace`);
    return res.data;
  }

  const {data: workspaces, isLoading, error, refetch} = useQuery({queryKey: ['workspaces'], queryFn: getWorkspaces});


  return (
    <div className='container mx-auto px-4'>
       <div className="border-b">
            <div className="flex h-16 items-center px-4">
              {/* <WorkspaceSwitcher 
              workspaces={workspaces} 
               /> */}
              <MainNav className="mx-6" />
             
              <div className="ml-auto flex items-center space-x-4">
                <UserAvatar />
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold mt-4 mb-8">Workspace Settings</h1>

          <div className='md:w-1/2'>
          <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Manage your workspace name and currency</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="workspace-name">Workspace Name</Label>
              <Input
                id="workspace-name"
                value={workspace.name}
                onChange={(e) => setWorkspace(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={workspace.currency}
                onValueChange={(value) => setWorkspace(prev => ({ ...prev, currency: value }))}
              >
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
          </div>
    </div>
  )
}

export default Page