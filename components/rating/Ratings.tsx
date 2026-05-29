import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

const Ratings = ({ rating }: { rating: number }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1 <= rating);
  return (
    <div className='flex gap-x-1 ms-3'>
      {stars.map((star, index) => {
        const className = `w-5 h-5 ${star ? "text-primary" : "text-gray-400"}`;
        return star ? (
          <FaStar key={index} className={className} />
        ) : (
          <FaRegStar key={index} className={className} />
        );
      })}
    </div>
  );
};

export default Ratings;
