import { fetchRatings } from "@/utils/actions";
import React from "react";
import { FaStar } from "react-icons/fa";

const ProductRating = async ({ productId }: { productId: string }) => {
  const { amount, value } = await fetchRatings({ productId });
  // let amount = 25;
  // let value = 4.5;
  return (
    <div className='flex items-center'>
      <FaStar />
      (total {amount}) {value}
    </div>
  );
};

export default ProductRating;
