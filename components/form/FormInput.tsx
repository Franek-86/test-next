import { Input } from "../ui/input";
import { Label } from "../ui/label";

import React from "react";
type FormInputType = {
  name: string;
  title: string;
  type: string;
  defaultValue: string;
  placeholder: string;
};
const FormInput = ({
  name,
  title,
  type,
  defaultValue,
  placeholder,
}: FormInputType) => {
  return (
    <div className='mt-2'>
      <Label className='mb-2 capitalize'>{title || name}</Label>
      <Input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default FormInput;
