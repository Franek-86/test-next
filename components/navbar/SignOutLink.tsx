import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

const SignOutLink = () => {
  const handleLogOut = () => {
    toast("Logging out");
  };
  return (
    <Link href='/' onClick={handleLogOut}>
      <SignOutButton />
    </Link>
  );
};

export default SignOutLink;
