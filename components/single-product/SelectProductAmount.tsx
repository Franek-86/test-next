import React, { SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "../ui/select";

export enum Mode {
  CartItem = "CartItem",
  SingleProduct = "SingleProduct",
}

type SelectSingleProductAmountProps = {
  mode: Mode.SingleProduct;
  amount: Number;
  setAmount: (value: SetStateAction<number>) => void;
};

type SelectCartItemAmountProps = {
  mode: Mode.CartItem;
  amount: Number;
  setAmount: (value: number) => Promise<void>;
  isLoading: Boolean;
};

const SelectProductAmount = (
  props: SelectSingleProductAmountProps | SelectCartItemAmountProps,
) => {
  const { mode, amount, setAmount } = props;

  const cartItem = mode === Mode.CartItem;

  return (
    <Select
      defaultValue={amount.toString()}
      onValueChange={(value) => setAmount(Number(value))}
    >
      <SelectTrigger
        disabled={cartItem && props.isLoading ? true : false}
        className={cartItem ? "w-[100px]" : "w-[150px]"}
      >
        <SelectValue defaultValue={amount.toString()} />
      </SelectTrigger>
      <SelectContent>
        {Array.from(
          { length: cartItem ? Number(amount) + 10 : 10 },
          (_, index) => {
            let selectValue = index + 1;
            return (
              <SelectItem
                defaultValue={selectValue}
                value={selectValue.toString()}
                key={index}
              >
                {selectValue}
              </SelectItem>
            );
          },
        )}
      </SelectContent>
    </Select>
  );
};

export default SelectProductAmount;
