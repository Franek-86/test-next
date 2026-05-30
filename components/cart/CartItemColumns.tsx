import React from "react";
import ThirdColumn from "./ThirdColumn";
import Image from "next/image";
import Link from "next/link";
import { Card } from "../ui/card";
import { formattedValue } from "@/utils/formattedValue";

export const FirstColumn = ({
  name,
  image,
}: {
  name: string;
  image: string;
}) => {
  return (
    <>
      <div className='relative w-36 h-36 sm:h-48 sm:w-48'>
        <Image
          alt={name}
          src={image}
          fill
          sizes='(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw'
          className='w-48 h-48 sm:h-36 object-cover rounded-md w-full'
        />
      </div>
    </>
  );
};
export const SecondColumn = ({
  name,
  company,
  productId,
}: {
  name: string;
  company: string;
  productId: string;
}) => {
  return (
    <>
      <div className='w-32'>
        <Link href={`/products/${productId}`}>
          <h3 className='text-lg font-medium hover:underline'>{name}</h3>
        </Link>
        <h4 className='text-sm font-bold'>{company}</h4>
      </div>
    </>
  );
};
export const FourthColumn = ({ price }: { price: number }) => {
  return (
    <>
      <p className='md:ml-auto font-bold'>Price {formattedValue(price)}</p>
    </>
  );
};
