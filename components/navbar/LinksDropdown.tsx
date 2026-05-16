// "use client";
import { navLinks } from "@/utils/navLinks";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuAlignLeft } from "react-icons/lu";
import Link from "next/link";
import { Show, SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";
import { Separator } from "radix-ui";
import UserIcon from "./UserIcon";
const LinksDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='flex gap-4 max-w-[100px]' asChild>
        {/* <Button variant='outline'>Open</Button> */}
        <Button variant='outline' size='icon' className='flex'>
          <LuAlignLeft className='w-6 h-6' />
        </Button>
      </DropdownMenuTrigger>
      <UserIcon />
      <DropdownMenuContent className='w-40' sideOffset={20}>
        <Show when='signed-in'>
          {navLinks.map((item) => {
            return (
              <DropdownMenuItem key={item.label}>
                <Link href={item.href} className='full-width'>
                  {item.label}
                </Link>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutButton />
          </DropdownMenuItem>
        </Show>
        <Show when='signed-out'>
          <DropdownMenuItem>
            <SignInButton mode='modal'>
              <Link href='/' className='text-left w-full'>
                sign in
              </Link>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignUpButton mode='modal'>
              <Link href='/' className='text-left w-full'>
                sign up
              </Link>
            </SignUpButton>
          </DropdownMenuItem>
        </Show>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LinksDropdown;
