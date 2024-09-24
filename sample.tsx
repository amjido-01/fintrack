"use client"
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation';
import { useSession } from "next-auth/react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';
import { MainNav } from "@/components/main-nav"
import UserAvatar from '@/components/ui/UserAvatar';
import WorkspaceSwitcher from "@/components/workspace-switcher"

const SettingsPage = () => {
  const { data: session, status } = useSession();
  let { workspaceId } = useParams()

  const getWorkspace = async () => {
    const res = await axios.get(`/api/get-workspace/${workspaceId}`);
    return res.data;
  }

  const { data: currentWorkSpace, isLoading, error } = useQuery(
    { queryKey: ['workspace', workspaceId], queryFn: getWorkspace }
  );

  if (isLoading) return <Loader2 className="h-6 w-6 animate-spin" />
  if (error) return <div>Error: {error.message}</div>
  if (!session) return <div>No Active Session</div>

  return (
    <div className="flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <WorkspaceSwitcher />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserAvatar />
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">Workspace Settings</h2>

        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add form for updating workspace name, description, currency */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expense Categories</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add/Edit/Delete expense categories */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Income Sources</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add/Edit/Delete income sources */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Configure notification preferences */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Options for data export, import, or deletion */}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SettingsPage





// "use client"

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { PlusCircle, Trash2 } from 'lucide-react'

// // Placeholder data - replace with actual data fetching logic
// const initialWorkspace = {
//   id: '1',
//   name: 'Personal Expenses',
//   currency: 'USD',
//   members: [
//     { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Owner' },
//     { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
//   ],
//   categories: [
//     { id: '1', name: 'Food & Dining' },
//     { id: '2', name: 'Transportation' },
//     { id: '3', name: 'Utilities' },
//     { id: '4', name: 'Entertainment' },
//   ],
//   budgetLimit: 2000,
// }

// export default function WorkspaceSettingsPage() {
//   const [workspace, setWorkspace] = useState(initialWorkspace)
//   const [newCategory, setNewCategory] = useState('')
//   const [newMemberEmail, setNewMemberEmail] = useState('')
//   const router = useRouter()

//   const handleSave = () => {
//     // Implement save logic here
//     console.log('Saving workspace settings:', workspace)
//     router.push('/dashboard')
//   }

//   const addCategory = () => {
//     if (newCategory) {
//       setWorkspace(prev => ({
//         ...prev,
//         categories: [...prev.categories, { id: Date.now().toString(), name: newCategory }]
//       }))
//       setNewCategory('')
//     }
//   }

//   const removeCategory = (id: string) => {
//     setWorkspace(prev => ({
//       ...prev,
//       categories: prev.categories.filter(category => category.id !== id)
//     }))
//   }

//   const addMember = () => {
//     if (newMemberEmail) {
//       setWorkspace(prev => ({
//         ...prev,
//         members: [...prev.members, { id: Date.now().toString(), name: '', email: newMemberEmail, role: 'Viewer' }]
//       }))
//       setNewMemberEmail('')
//     }
//   }

//   const removeMember = (id: string) => {
//     setWorkspace(prev => ({
//       ...prev,
//       members: prev.members.filter(member => member.id !== id)
//     }))
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Workspace Settings</h1>
      
//       <div className="space-y-8">
//         <Card>
//           <CardHeader>
//             <CardTitle>General Settings</CardTitle>
//             <CardDescription>Manage your workspace name and currency</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="workspace-name">Workspace Name</Label>
//               <Input
//                 id="workspace-name"
//                 value={workspace.name}
//                 onChange={(e) => setWorkspace(prev => ({ ...prev, name: e.target.value }))}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="currency">Currency</Label>
//               <Select
//                 value={workspace.currency}
//                 onValueChange={(value) => setWorkspace(prev => ({ ...prev, currency: value }))}
//               >
//                 <SelectTrigger id="currency">
//                   <SelectValue placeholder="Select currency" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="USD">USD - US Dollar</SelectItem>
//                   <SelectItem value="EUR">EUR - Euro</SelectItem>
//                   <SelectItem value="GBP">GBP - British Pound</SelectItem>
//                   <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Workspace Members</CardTitle>
//             <CardDescription>Manage members of your workspace</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Name</TableHead>
//                   <TableHead>Email</TableHead>
//                   <TableHead>Role</TableHead>
//                   <TableHead>Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {workspace.members.map((member) => (
//                   <TableRow key={member.id}>
//                     <TableCell>{member.name}</TableCell>
//                     <TableCell>{member.email}</TableCell>
//                     <TableCell>{member.role}</TableCell>
//                     <TableCell>
//                       {member.role !== 'Owner' && (
//                         <Button variant="ghost" size="sm" onClick={() => removeMember(member.id)}>
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//             <div className="flex items-center mt-4">
//               <Input
//                 placeholder="Enter email to invite"
//                 value={newMemberEmail}
//                 onChange={(e) => setNewMemberEmail(e.target.value)}
//                 className="mr-2"
//               />
//               <Button onClick={addMember}>
//                 <PlusCircle className="h-4 w-4 mr-2" />
//                 Add Member
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Expense Categories</CardTitle>
//             <CardDescription>Customize your expense categories</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {workspace.categories.map((category) => (
//                 <div key={category.id} className="flex items-center justify-between">
//                   <span>{category.name}</span>
//                   <Button variant="ghost" size="sm" onClick={() => removeCategory(category.id)}>
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 </div>
//               ))}
//             </div>
//             <div className="flex items-center mt-4">
//               <Input
//                 placeholder="New category name"
//                 value={newCategory}
//                 onChange={(e) => setNewCategory(e.target.value)}
//                 className="mr-2"
//               />
//               <Button onClick={addCategory}>
//                 <PlusCircle className="h-4 w-4 mr-2" />
//                 Add Category
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Budget Limit</CardTitle>
//             <CardDescription>Set a monthly budget limit for this workspace</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="flex items-center space-x-2">
//               <Label htmlFor="budget-limit">Monthly Budget Limit</Label>
//               <Input
//                 id="budget-limit"
//                 type="number"
//                 value={workspace.budgetLimit}
//                 onChange={(e) => setWorkspace(prev => ({ ...prev, budgetLimit: parseFloat(e.target.value) }))}
//               />
//             </div>
//           </CardContent>
//         </Card>

//         <div className="flex justify-end space-x-4">
//           <Button variant="outline" onClick={() => router.push('/dashboard')}>Cancel</Button>
//           <Button onClick={handleSave}>Save Changes</Button>
//         </div>
//       </div>
//     </div>
//   )
// }