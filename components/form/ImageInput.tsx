import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const ImageInput = () => {
  return (
    <div className='mt-2'>
      <Label className='mb-2'>Add image</Label>
      <Input name='image' type='file' accept='image/*' />
    </div>
  );
};

export default ImageInput;
