import React from 'react';
import { signOut } from 'next-auth/react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Button } from './button'
const UserAvatar = () => {
  return (
    <DropdownMenu>
  <DropdownMenuTrigger>
  <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" />
   <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </DropdownMenuTrigger>
  <DropdownMenuContent className='min-w-[13rem] mr-4'>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>
     <Button onClick={() => signOut({callbackUrl: "/"})} className="w-full px-6 py-3 text-sm font-medium tracking-wide capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 bg-green-500 text-white hover:bg-green-600"> Sign Out</Button>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

  )
}

export default UserAvatar