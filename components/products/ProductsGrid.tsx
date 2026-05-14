import { Products } from "@/app/generated/prisma/browser";
// import { Card, CardContent } from "../ui/card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import FavoriteToggleButtons from "./FavoriteToggleButtons";
import { formattedValue } from "@/utils/formattedValue";

const ProductsGrid = ({ products }: { products: Products[] }) => {
  return (
    <div className='mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {products.map((product) => {
        const { name, id, price, image } = product;
        let productId = id;
        return (
          <article key={id} className='group relative'>
            <Link href={`products/${productId}`}>
              <Card className='shadow-lg hover:shadow-xl duration-500'>
                <CardContent>
                  <div className='relative h-48 overflow-hidden rounded'>
                    <Image
                      src={image}
                      alt={name}
                      // width={5}
                      // height={5}
                      fill
                      sizes='(max-width:768px) 100vw, (max-width:1200) 50vw, 33vw'
                      className='relative rounded object-cover group-hover:scale-110 duration-600'
                    />
                  </div>
                  <div className='mt-3 text-center capitalize'>
                    <h2>{name}</h2>
                    <p className='text-muted-foreground'>
                      {formattedValue(price)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <FavoriteToggleButtons
              className='absolute top-7 right-7 z-5 cursor-pointer'
              productId={productId}
            />
          </article>
        );
      })}
    </div>
  );
};

export default ProductsGrid;
