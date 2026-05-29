"use client";
import React, { useState } from "react";
import RatingInput from "./RatingInput";
import FormContainer from "../form/FormContainer";
import { Button } from "../ui/button";
import FormButton from "../form/FormButton";
import { Card } from "../ui/card";
import TextAreaInput from "../form/TextAreaInput";
import { useUser } from "@clerk/nextjs";
import { createReviewAction } from "@/utils/actions";

const SubmitReview = ({ productId }: { productId: string }) => {
  const [isReviewFormVisible, setReviewFormVisible] = useState(false);
  const { user } = useUser();
  return (
    <div>
      <Button
        size='lg'
        className='capitalize'
        onClick={() => {
          setReviewFormVisible((prev) => !prev);
        }}
      >
        add a review
      </Button>
      {isReviewFormVisible && (
        <div>
          <Card className='p-8 bordered mt-2'>
            <FormContainer actionTest={createReviewAction}>
              <input type='hidden' name='productId' value={productId} />
              <input type='hidden' name='authImage' value={user?.imageUrl} />
              <input
                type='hidden'
                name='authName'
                value={user?.firstName ? user?.firstName : "User"}
              />
              <RatingInput name='rating' />
              <TextAreaInput
                defaultValue='Very good!'
                title='comment'
                name='comment'
              />
              <FormButton text='submit review' sizeBtn='lg' className='mt-5' />
            </FormContainer>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SubmitReview;
