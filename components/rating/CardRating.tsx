import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";

import Image from "next/image";
import Ratings from "./Ratings";
import CommentRating from "./CommentRating";
import { Button } from "../ui/button";

type CardRatingType = {
  infoReview: {
    name: string;
    image: string;
    rating: number;
    comment: string;
  };
  children?: React.ReactElement;
};

const CardRating = ({ infoReview, children }: CardRatingType) => {
  return (
    <section>
      <Card className='relative'>
        <CardHeader>
          <div className='flex items-center'>
            <Image
              src={infoReview.image}
              alt={infoReview.name}
              width={48}
              height={48}
              className='rounded-full w-16 h-16'
            />
            <div className=''>
              <Ratings rating={infoReview.rating} />
              <div className='ms-3 text-lg font-semibold capitalize'>
                {infoReview.name}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CommentRating comment={infoReview.comment} />
        </CardContent>
        <div className='absolute top-5 right-5 z-3'>{children}</div>
      </Card>
    </section>
  );
};

export default CardRating;
