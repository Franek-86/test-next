import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { LuShoppingBag } from "react-icons/lu";
import { fetchCartItems } from "@/utils/actions";

const CartButton = async () => {
  let itemsNumber = (await fetchCartItems()) || 0;
  return (
    <div>
      <Button
        asChild
        variant='outline'
        size='icon'
        // className='flex justify-center align-center'
        className='rounded-full'
      >
        <Link href='/cart' className='relative'>
          <LuShoppingBag />
          <span className='absolute -top-3 -right-3 w-6 h-6 bg-primary rounded-full text-white flex justify-center items-center text-xs'>
            {itemsNumber}
          </span>
        </Link>
      </Button>
    </div>
  );
};

export default CartButton;
