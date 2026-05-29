"use client";
import { useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import SelectProductAmount, { Mode } from "./SelectProductAmount";
import { useState } from "react";
import { ProductSignInButton } from "../form/Buttons";
import FormContainer from "../form/FormContainer";
import { addToCartAction } from "@/utils/actions";
import FormButton from "../form/FormButton";

const AddToCart = ({ productId }: { productId: string }) => {
  const { userId } = useAuth();
  const [amount, setAmount] = useState(1);
  return (
    <>
      <h4 className='capitalize font-semibold mt-4'>amount</h4>
      <SelectProductAmount
        mode={Mode.SingleProduct}
        amount={amount}
        setAmount={setAmount}
      />
      {userId ? (
        <FormContainer actionTest={addToCartAction}>
          <input type='hidden' name='productId' value={productId} />
          <input type='hidden' name='amount' value={amount} />
          <FormButton text='add to card' sizeBtn='lg' className='mt-4' />
        </FormContainer>
      ) : (
        <ProductSignInButton />
      )}
    </>
  );
};

export default AddToCart;
