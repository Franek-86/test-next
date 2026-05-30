import React from "react";
import CartItemsList from "@/components/cart/CartItemsList";
import CartTotals from "@/components/cart/CartTotals";
import { fetchCartItems, fetchOrCreateCart, updateCart } from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SectionTitle from "@/components/global/SectionTitle";
fetchCartItems;
const Cart = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/");
  let cart = await fetchOrCreateCart({ userId: userId });
  await updateCart(cart);
  // const { temp, cartItems } = await updateCart(cart);

  return (
    <>
      {cart.cartItems.length === 0 ? (
        <SectionTitle title='cart is empty' />
      ) : (
        <SectionTitle title='your cart' />
      )}
      <div className='grid grid-4 lg:grid-cols-12 mt-8'>
        <div className='lg:col-span-8'>
          {/* <CartItemsList cartItems={cartItems} /> */}
          <CartItemsList cartItems={cart.cartItems} />
        </div>
        <div className='lg:col-span-4 lg:pl-4'>
          <CartTotals cart={cart} />
          {/* <CartTotals cart={temp} /> */}
        </div>
      </div>
    </>
  );
};

export default Cart;
