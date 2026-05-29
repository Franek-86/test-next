import FavoriteToggleButtons from "@/components/products/FavoriteToggleButtons";
import ProductsReviews from "@/components/rating/ProductsReviews";
import SubmitReview from "@/components/rating/SubmitReview";
import AddToCart from "@/components/single-product/AddToCart";
import Breadcrumbs from "@/components/single-product/Breadcrumbs";
import ProductRating from "@/components/single-product/ProductRating";
import ShareButton from "@/components/single-product/ShareButton";
import { fetchExistingReview, fetchSingleProduct } from "@/utils/actions";
import { formattedValue } from "@/utils/formattedValue";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

const SingleProduct = async ({ params }: { params: { id: string } }) => {
  const { userId } = await auth();
  let { id } = await params;
  let productId = id;

  const product = await fetchSingleProduct({ productId });
  const isExistingReview =
    userId && !(await fetchExistingReview(userId, productId));
  if (product) {
    const { name, company, description, image, price } = product;
    let formattedPrice = formattedValue(price);
    return (
      <section>
        <Breadcrumbs name={name} />
        <div className='grid gap-y-6 lg:grid-cols-2 lg:gap-x-16 mt-6'>
          <div className='relative border h-100'>
            <Image
              alt={name}
              src={image}
              sizes='(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw'
              fill
              className='w-full rounded object-cover'
            />
          </div>
          <div className=''>
            <div className='flex items-center gap-x-2 mb-1'>
              <h2 className='text-2xl font-bold capitalize'>{name}</h2>
              <div className='flex gap-x-2 items-center'>
                <FavoriteToggleButtons productId={productId} className='' />

                <ShareButton name={name} productId={productId} />
              </div>
            </div>
            <ProductRating productId={productId} />
            <p>{formattedPrice}</p>
            <h2 className='mt-3'>{company}</h2>
            <p className='mt-6'>{description}</p>
            <AddToCart productId={productId} />
          </div>
        </div>
        <div>
          <ProductsReviews productId={id} />
          {isExistingReview && <SubmitReview productId={id} />}
        </div>
      </section>
    );
  }
};

export default SingleProduct;
