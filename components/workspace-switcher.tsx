"use client"

import * as React from "react"
import {
  CaretSortIcon,
  CheckIcon,
} from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import WorkSpaceDialog from "./WorkSpaceDialog"
import { Workspace } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
// import useWorkspaceStore from "@/store/useWorkspaceStore"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface WorkspaceSwitcherProps extends PopoverTriggerProps {
  workspaces: Workspace[];
}


export default function WorkspaceSwitcher({ className, workspaces }: WorkspaceSwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const [showNewWorkspaceDialog, setShowNewWorkspaceDialog] = React.useState(false)
  const [id, setId] = React.useState<string>("")
  
  const session = useSession();
  const userId = session?.data?.user?.id;
  // setId(userId)
  // console.log(selectedWorkspace.id);
  console.log(workspaces);
  const router = useRouter();
const {workspaceId}  = useParams()
console.log("my id here: ", workspaceId);

const workspace = workspaces.filter(workspace => workspace.id == workspaceId)

console.log("this is my id: ", workspace);
const [selectedWorkspace, setSelectedWorkspace] = React.useState<Workspace>(workspace[0]);
console.log("this is the selected: ", selectedWorkspace)

  
  return (
    <Dialog open={showNewWorkspaceDialog} onOpenChange={setShowNewWorkspaceDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("w-[200px] justify-between", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={`https://avatar.vercel.sh/${selectedWorkspace?.workspaceName}.png`}
                alt={selectedWorkspace?.workspaceName}
                className="grayscale"
              />
              <AvatarFallback>W</AvatarFallback>
            </Avatar>
            <p className="truncate">
            {workspaces.find((workspace) => workspace.id === selectedWorkspace?.id)?.workspaceName}
            </p>
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0">
          <Command>
            <CommandInput placeholder="Search workspace..." />
            <CommandList>
              <CommandEmpty>No workspace  found.</CommandEmpty>

              {workspaces?.map((workspace) => (
                <CommandGroup className="" key={workspace.id}>
                    <CommandItem
                      key={workspace.id}
                      onSelect={() => {
                        setSelectedWorkspace(workspace)
                        setOpen(false)
                        router.push(`/user/${workspace.createdById}/workspace/${workspace.workspaceName}/${workspace.id}/dashboard`)
                      }}
                      className="text-sm"
                    >
                      <div>
                      <div className="flex">
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                          src={`https://avatar.vercel.sh/${workspace.workspaceName}.png`}
                          alt={workspace.workspaceName}
                          className="grayscale"
                        />
                        <AvatarFallback>W</AvatarFallback>
                      </Avatar>

                      {workspace.workspaceName}
                      </div>
                      <p className="mt-1 text-[10px] pl-2 truncate">{workspace.description}</p>
                      </div>
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedWorkspace.id === workspace.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                </CommandGroup>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <CommandItem>
                <WorkSpaceDialog />
                </CommandItem>                
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </Dialog>
  )
}