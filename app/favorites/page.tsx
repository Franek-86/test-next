import SectionTitle from "@/components/global/SectionTitle";
import ProductsGrid from "@/components/products/ProductsGrid";
import { fetchUserFavorites } from "@/utils/actions";

import React from "react";

const Favorites = async () => {
  const favorites = await fetchUserFavorites();
  if (favorites.length === 0) {
    return <SectionTitle title='You have got no faves yet' />;
  }
  return (
    <div>
      <SectionTitle title='favorites' />;
      <ProductsGrid products={favorites.map((favorite) => favorite.product)} />
    </div>
  );
};

export default Favorites;
