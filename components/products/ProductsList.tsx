import React from "react";

import { Products } from "@/app/generated/prisma/browser";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { formattedValue } from "@/utils/formattedValue";
import Image from "next/image";
import FavoriteToggleButtons from "./FavoriteToggleButtons";

const ProductsList = ({ products }: { products: Products[] }) => {
  return (
    <div className='grid gap-y-4'>
      {products.map((product) => {
        const { name, company, id, image, price } = product;
        return (
          <div key={id} className='relative mt-16'>
            <Card>
              <CardContent>
                <Link href={`/products/id`}>
                  <div className='grid md:grid-cols-3 gap-6  gap-y-6'>
                    <div className='p-2 h-64 md:h-48 w-48 w-full relative'>
                      <Image
                        alt={name}
                        src={image}
                        fill
                        sizes='(max-width:768px) 100vw, (max-width:1200px) 50vw, 33wv'
                        className='object-cover rounded-md'
                      />
                    </div>

                    <div className=''>
                      <h2 className='text-xl capitalize font-medium'>{name}</h2>
                      <h5 className='text-muted-foreground'>{company}</h5>
                    </div>
                    <div className='md:ml-auto'>
                      <p>{formattedValue(price)}</p>
                    </div>
                  </div>
                </Link>
                <div className='absolute bottom-5 right-5 z-5'>
                  <FavoriteToggleButtons productId={id} />
                </div>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsList;
