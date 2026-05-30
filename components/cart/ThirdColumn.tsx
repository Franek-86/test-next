"use client";

import React, { useState } from "react";
import SelectProductAmount, {
  Mode,
} from "../single-product/SelectProductAmount";
import FormContainer from "../form/FormContainer";
import FormButton from "../form/FormButton";
import { removeCartItem } from "@/utils/actions";

const ThirdColumn = ({ id, quantity }: { id: string; quantity: number }) => {
  const [amount, setAmount] = useState(quantity);
  const handleAmountChange = async (value: number) => {
    setAmount(value);
  };
  return (
    <div className='flex flex-col'>
      <SelectProductAmount
        amount={amount}
        setAmount={handleAmountChange}
        mode={Mode.CartItem}
        isLoading={false}
      />
      <FormContainer actionTest={removeCartItem}>
        <input type='hidden' name='id' value={id} />
        <FormButton sizeBtn='sm' text='remove' className='mt-8' />
      </FormContainer>
    </div>
  );
};

export default ThirdColumn;
