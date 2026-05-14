import ProductsContainer from "@/components/products/ProductsContainer";
import { log } from "node:console";
import React from "react";
const Products = async ({
  searchParams,
}: {
  searchParams: { layout?: string; search?: string };
}) => {
  let params = await searchParams;

  const layout = params.layout || "grid";
  const search = params.search || "";
  console.log("test", layout, search);
  return <ProductsContainer layout={layout} search={search} />;
};

export default Products;
