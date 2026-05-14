import React from "react";
import { FaStar } from "react-icons/fa";

const ProductRating = ({ productId }: { productId: string }) => {
  let amount = 25;
  let value = 4.5;
  return (
    <div className='flex items-center'>
      <FaStar />
      (total {amount}) {value}
    </div>
  );
};

export default ProductRating;
