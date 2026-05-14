import React from "react";
import EmptyList from "../global/EmptyList";
import SectionTitle from "../global/SectionTitle";
import { prisma } from "@/utils/db";

import ProductsList from "../products/ProductsList";
import ProductsGrid from "../products/ProductsGrid";
import { fetchFeaturedProducts } from "@/utils/actions";

const FeaturedProducts = async () => {
  // const products = await prisma.products.findMany();
  const products = await fetchFeaturedProducts();
  // console.log("t123", test);
  if (products.length === 0) return <EmptyList />;
  return (
    <section className='mt-24'>
      <SectionTitle className='mb-8' title='Featured Products' />
      <ProductsGrid products={products} />
    </section>
  );
};

export default FeaturedProducts;
