"use client"
import React, { useEffect } from 'react'
import { MainNav } from '@/components/main-nav'
import UserAvatar from '@/components/ui/UserAvatar'
import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useSession } from "next-auth/react";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Loader2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useParams } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

const currencies = ["AED", "USD", "NGN", "SAR", "QAR"]

interface Workspace {
  workspaceName: string
  currency: string
}

const Page = () => {
  const { workspaceId }  = useParams()
  const { data: session } = useSession()
  const [currency, setCurrency] = useState("")
  const [workspaceName, setWorkspaceName] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const userId = session?.user?.id
  const getWorkspace = async (): Promise<Workspace> => {
    const res = await axios.get(`/api/get-workspace/${workspaceId}`)
    return res.data
  }

  const { data: currentWorkSpace, isLoading: currentLoading, error: currentError, refetch: refetchCurrentWorkspace } = useQuery<Workspace, Error>({
    queryKey: ['workspace', workspaceId],
    queryFn: getWorkspace,
  })

  useEffect(() => {
    if (currentWorkSpace) {
      setWorkspaceName(currentWorkSpace.workspaceName)
      setCurrency(currentWorkSpace.currency)
    }
  }, [currentWorkSpace])

  const updateWorkspace = async (data: Partial<Workspace>): Promise<Workspace> => {
    const res = await axios.put(`/api/update-workspace/${workspaceId}`, data)
    return res.data
  }

  const mutation = useMutation({
    mutationFn: updateWorkspace,
    onSuccess: () => {
      refetchCurrentWorkspace()
      queryClient.invalidateQueries({ queryKey: ['workspace', workspaceId] })
      toast({
        title: "Settings updated",
        description: "Your workspace settings have been updated successfully.",
      })
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `An error occurred while updating your settings: ${error.message}`,
        variant: "destructive",
      })
    },
  })

  const handleSave = () => {
    setIsSaving(true)
    mutation.mutate({ workspaceName, currency }, {
      onSettled: () => setIsSaving(false)
    })
  }

  if (currentLoading) return <div className="flex justify-center items-center h-screen">
  <div className="flex flex-col items-center">
    <Loader2 className="h-6 w-6 animate-spin mb-2" />
    <p>please wait...</p>
  </div>
</div>
  if (currentError) return <div>An error occurred: {currentError.message}</div>

  return (
    <div className='container mx-auto px-4'>
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav userId={userId} workspaceName={currentWorkSpace?.workspaceName} workspaceId={workspaceId as string} />
          <div className="ml-auto flex items-center space-x-4">
            <UserAvatar />
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold mt-4 mb-8">Workspace Settings</h1>
      <div className='flex justify-center'>
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
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={currency} onValueChange={(value) => setCurrency(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Change workspace currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((curr) => (
                      <SelectItem key={curr} value={curr}>
                        {curr}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-6">
                <Button className='text-white' onClick={handleSave} disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Page