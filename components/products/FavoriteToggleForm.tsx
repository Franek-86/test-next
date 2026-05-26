"use client";
import { actionFavoriteProduct } from "@/utils/actions";
import React from "react";
import FormContainer from "../form/FormContainer";
import { usePathname } from "next/navigation";
import { FavoriteToggleButton } from "../form/Buttons";

type FavoriteToggleFormType = {
  productId: string;
  favoriteId: string | null;
};

const FavoriteToggleForm = ({
  productId,
  favoriteId,
}: FavoriteToggleFormType) => {
  const pathName = usePathname();

  const actionFavorite = actionFavoriteProduct.bind(null, {
    productId,
    favoriteId,
    pathName,
  });
  return (
    <FormContainer actionTest={actionFavorite}>
      <FavoriteToggleButton favorite={favoriteId ? true : false} />
    </FormContainer>
  );
};

export default FavoriteToggleForm;
