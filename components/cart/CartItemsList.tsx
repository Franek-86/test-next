"use client";
import { FirstColumn, FourthColumn, SecondColumn } from "./CartItemColumns";
import { Prisma } from "@/app/generated/prisma/browser";
import { CartItemGetPayload } from "../../app/generated/prisma/models/CartItem";
import { Card } from "../ui/card";
import ThirdColumn from "./ThirdColumn";

const CartItemsList = ({
  cartItems,
}: {
  cartItems: CartItemGetPayload<{ include: { product: true } }>[];
}) => {
  return (
    <div>
      {cartItems.map((cartItem) => {
        const { id, amount } = cartItem;
        const { image, company, name, price, id: productId } = cartItem.product;
        return (
          <Card key={id} className='p-8 flx lg:flex-row gap-x-4 my-4'>
            <FirstColumn image={image} name={name} />
            <SecondColumn name={name} productId={productId} company={company} />
            <ThirdColumn id={id} quantity={amount} />
            <FourthColumn price={price} />
          </Card>
        );
      })}
    </div>
  );
};

export default CartItemsList;
