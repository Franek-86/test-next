"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { RiLoader4Fill } from "react-icons/ri";
import { useFormStatus } from "react-dom";

type FormButtonType = {
  text: string;
  sizeBtn:
    | "default"
    | "xs"
    | "sm"
    | "lg"
    | "icon"
    | "icon-xs"
    | "icon-sm"
    | "icon-lg"
    | null
    | undefined;
  className?: string;
};
const FormButton = ({ text, sizeBtn, className }: FormButtonType) => {
  const { pending } = useFormStatus();
  console.log("status", pending);

  return (
    <Button
      type='submit'
      className={cn("capitalize", className)}
      size={sizeBtn}
    >
      {pending ? (
        <div className='flex items-center'>
          <RiLoader4Fill className='animate-spin mr-2' />
          <span>
            {text === "update product"
              ? "updating product"
              : text === "update image"
                ? "updating image"
                : "Adding product"}
          </span>
        </div>
      ) : (
        text
      )}
    </Button>
  );
};

export default FormButton;
