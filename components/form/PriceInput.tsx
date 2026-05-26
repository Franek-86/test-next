import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
type PriceInputType = {
  defaultValue?: number;
};
const PriceInput = ({ defaultValue }: PriceInputType) => {
  const name = "price";
  return (
    <div className='mt-2'>
      <Label htmlFor={name} className='mb-2'>
        Price $
      </Label>
      <Input
        type='number'
        name={name}
        defaultValue={defaultValue || 100}
        min={0}
        max={10000}
      />
    </div>
  );
};

export default PriceInput;
