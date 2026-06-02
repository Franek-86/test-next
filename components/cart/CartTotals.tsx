import React from "react";
import { Cart } from "@/app/generated/prisma/client";
import FormContainer from "../form/FormContainer";
import FormButton from "../form/FormButton";
import { Separator } from "../ui/separator";
import { Card, CardContent, CardTitle } from "../ui/card";
import { formattedValue } from "@/utils/formattedValue";
import { createOrder } from "@/utils/actions";

const CartTotals = ({ cart }: { cart: Cart }) => {
  const { shipping, tax, cartTotal, orderTotal, numItemsInCart } = cart;
  return (
    <Card className='p-8 my-4'>
      <CardContent>
        <RowContent label='subtotal' amount={cartTotal} />
        <RowContent label='tax' amount={tax} />
        <RowContent label='shipping' amount={shipping} />
        <CardTitle className='font-semibold mt-4'>
          <RowContent label='order total' amount={orderTotal} last />
        </CardTitle>
      </CardContent>
      {numItemsInCart > 0 && (
        <FormContainer actionTest={createOrder}>
          <FormButton text='order' sizeBtn='lg' />
        </FormContainer>
      )}
    </Card>
  );
};
const RowContent = ({
  label,
  amount,
  last,
}: {
  label: string;
  amount: number;
  last?: boolean;
}) => {
  return (
    <div className='mt-2'>
      <p className='flex justify-between text-sm'>
        <span className='capitalize'>{label}</span>
        <span>{formattedValue(amount)}</span>
      </p>
      {last ? null : <Separator className='mt-2' />}
    </div>
  );
};
export default CartTotals;
