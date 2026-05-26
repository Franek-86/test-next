"use client";
import Image from "next/image";
import React, { useState } from "react";
import FormButton from "./FormButton";
import FormContainer from "./FormContainer";
import { ActionType } from "@/utils/types";
import { Button } from "../ui/button";
import ImageInput from "./ImageInput";
import { ActionTestType } from "@/utils/types";
type UpdateProductImageType = {
  name: string;
  text: string;
  image: string;
  action: ActionTestType;
  children?: React.ReactNode;
};
const UpdateProductImage = (props: UpdateProductImageType) => {
  const [isUpdateImageVisible, setUpdateImageVisible] = useState(false);
  const { name, text, image, action } = props;
  return (
    <div className='mb-8'>
      <div className='mb-4'>
        <Image
          src={image}
          width={200}
          height={200}
          alt={name}
          className='object-cover mb-4 rounded w-[200px] h-[200px]'
        />

        <Button
          onClick={() => {
            setUpdateImageVisible((prev) => !prev);
          }}
        >
          {text}
        </Button>
      </div>
      {isUpdateImageVisible && (
        <div className='max-w-md'>
          <FormContainer actionTest={action}>
            {props.children}
            <ImageInput />
            <FormButton className='mt-4' text='update image' sizeBtn='lg' />
          </FormContainer>
        </div>
      )}
    </div>
  );
};

export default UpdateProductImage;
