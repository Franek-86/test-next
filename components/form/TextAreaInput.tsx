import React from "react";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
type TextAreaType = {
  name: string;
  title: string;
  defaultValue: string;
};
const TextAreaInput = ({ name, title, defaultValue }: TextAreaType) => {
  return (
    <div className='mt-5'>
      <Label
        className='capitalize mb-2 font-semibold capitalize'
        htmlFor={name}
      >
        {title}
      </Label>
      <Textarea name={name} defaultValue={defaultValue} rows={15} />
    </div>
  );
};

export default TextAreaInput;
