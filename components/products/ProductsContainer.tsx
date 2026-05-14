import React from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { LuList } from "react-icons/lu";
import { LuLayoutGrid } from "react-icons/lu";
import { fetchAllProducts } from "@/utils/actions";
import Link from "next/link";
import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import EmptyList from "../global/EmptyList";

const ProductsContainer = async ({
  layout,
  search,
}: {
  layout: string;
  search: string;
}) => {
  const products = await fetchAllProducts({ search });
  let productsLength = products.length;
  let searchParams = `&search=${search}`;
  return (
    <section>
      <div className='flex justify-between items-center'>
        <div className=''>
          <h2>
            {productsLength} product{productsLength > 0 && "s"}
          </h2>
        </div>
        <div className='flex justify-between items-center'>
          <Button asChild variant={layout === "grid" ? "default" : "ghost"}>
            <Link href={`/products?layout=grid${search ? searchParams : ""}`}>
              <LuLayoutGrid />
            </Link>
          </Button>
          <Button asChild variant={layout === "list" ? "default" : "ghost"}>
            <Link href={`/products?layout=list${search ? searchParams : ""}`}>
              <LuList />
            </Link>
          </Button>
        </div>
      </div>
      <Separator className='mt-2' />
      {productsLength === 0 ? (
        <EmptyList />
      ) : layout === "grid" ? (
        <ProductsGrid products={products} />
      ) : (
        <ProductsList products={products} />
      )}
    </section>
  );
};

export default ProductsContainer;
