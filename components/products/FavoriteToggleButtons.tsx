import React from "react";
import { Button } from "../ui/button";
import { FaHeart } from "react-icons/fa";
const FavoriteToggleButtons = ({
  productId,
  className,
}: {
  productId: string;
  className?: string;
}) => {
  return (
    <Button className={className} variant='outline' size='icon'>
      <FaHeart />
    </Button>
  );
};

export default FavoriteToggleButtons;
