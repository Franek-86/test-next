"use client";

import React, { useState } from "react";
import SelectProductAmount, {
  Mode,
} from "../single-product/SelectProductAmount";
import FormContainer from "../form/FormContainer";
import FormButton from "../form/FormButton";
import { removeCartItem, updateCartItem } from "@/utils/actions";
import { toast } from "sonner";

const ThirdColumn = ({ id, quantity }: { id: string; quantity: number }) => {
  const [amount, setAmount] = useState(quantity);
  const [isLoading, setLoading] = useState(false);
  const handleAmountChange = async (value: number) => {
    console.log("this is the value I'm passing in:", value);

    setLoading(true);
    toast("...updating item amount");
    await updateCartItem({ id: id, amount: value });
    setAmount(value);
    toast("item amount successfully updated");
  };
  return (
    <div className='flex flex-col'>
      <SelectProductAmount
        amount={amount}
        setAmount={handleAmountChange}
        mode={Mode.CartItem}
        isLoading={isLoading}
      />
      <FormContainer actionTest={removeCartItem}>
        <input type='hidden' name='id' value={id} />
        <FormButton sizeBtn='sm' text='remove' className='mt-8' />
      </FormContainer>
    </div>
  );
};

export default ThirdColumn;
