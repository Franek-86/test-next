"use client";
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

const LinksDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='flex gap-4 max-w-[100px]' asChild>
        {/* <Button variant='outline'>Open</Button> */}
        <Button variant='outline' size='icon'>
          <LuAlignLeft className='w-6 h-6' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-40' sideOffset={20}>
        {navLinks.map((item) => {
          return (
            <DropdownMenuItem key={item.label}>
              <Link href={item.href} className='full-width'>
                {item.label}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LinksDropdown;
