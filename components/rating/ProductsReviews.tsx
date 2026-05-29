import { fetchProductReviews } from "@/utils/actions";
import React from "react";
import CardRating from "./CardRating";

const ProductsReviews = async ({ productId }: { productId: string }) => {
  const reviews = await fetchProductReviews({ productId });

  return (
    <div>
      <div className='grid md:grid-cols-2 gap-x-8 my-8 gap-y-8'>
        {reviews.map((review, index) => {
          const { authImage, authName, comment, rating } = review;
          const infoReview = {
            image: authImage,
            name: authName,
            comment,
            rating,
          };
          return <CardRating key={index} infoReview={infoReview} />;
        })}
      </div>
    </div>
  );
};

export default ProductsReviews;
