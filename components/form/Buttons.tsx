"use client";
import { LucidePenSquare } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";
import { LuTrash2 } from "react-icons/lu";
import { IoReload } from "react-icons/io5";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getUser } from "@/utils/actions";
import { TbReload } from "react-icons/tb";

type ActionType = "edit" | "delete";

export const IconButton = ({ actionType }: { actionType: ActionType }) => {
  const { pending } = useFormStatus();
  const renderIcon = () => {
    switch (actionType) {
      case "edit":
        return <LucidePenSquare />;
      case "delete":
        return <LuTrash2 />;
        break;

      default:
        const never: never = actionType;
        throw new Error(`this "${never}" is not correct`);
    }
  };
  return pending ? <IoReload className='animate-spin' /> : renderIcon();
};

export const CardSignInButton = () => {
  return (
    <div>
      <SignInButton mode='modal'>
        <Button
          type='button'
          size='icon'
          variant='outline'
          className='p-2 rounded'
        >
          <FaRegHeart />
        </Button>
      </SignInButton>
    </div>
  );
};

export const FavoriteToggleButton = ({ favorite }: { favorite: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type='submit'
      size='icon'
      variant='outline'
      className='p-2 rounded absolute top-[1rem] right-[1rem]'
    >
      {pending ? <TbReload /> : favorite ? <FaHeart /> : <FaRegHeart />}
    </Button>
  );
};
export default IconButton;
