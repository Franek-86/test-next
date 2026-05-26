import React from "react";
import { Button } from "../ui/button";
import { FaHeart } from "react-icons/fa";
import FavoriteToggleForm from "./FavoriteToggleForm";

import { CardSignInButton } from "../form/Buttons";
import { checkFavoriteProduct } from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";

const FavoriteToggleButtons = async ({
  productId,
  className,
}: {
  productId: string;
  className?: string;
}) => {
  const { userId } = await auth();
  console.log("here userId", userId);
  if (!userId) {
    return (
      <div className='absolute top-[1rem] right-[1rem]'>
        <CardSignInButton />
      </div>
    );
  }

  const favoriteId = await checkFavoriteProduct({ productId });
  return <FavoriteToggleForm productId={productId} favoriteId={favoriteId} />;
};

export default FavoriteToggleButtons;
