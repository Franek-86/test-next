"use client";
import { Button } from "@/components/ui/button";
import { adminLinks } from "@/utils/navLinks";

import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";
const Sidebar = () => {
  const pathName = usePathname();
  console.log("tt323", pathName);

  return (
    <div className='grid'>
      {adminLinks.map((link) => {
        const isActive = pathName === link.href;
        const variant = isActive ? "default" : "ghost";

        return (
          <Button variant={variant} key={link.href} asChild>
            <Link
              className='w-full justify-start pl-2 capitalize'
              href={link.href}
            >
              {link.label}
            </Link>
          </Button>
        );
      })}
    </div>
  );
};

export default Sidebar;
