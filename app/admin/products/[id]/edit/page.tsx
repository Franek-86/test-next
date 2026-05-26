import FormButton from "@/components/form/FormButton";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import UpdateProductImage from "@/components/form/UpdateProductImage";
import { Checkbox } from "@/components/ui/checkbox";
import {
  fetchAdminProductDetails,
  updateProductAction,
  updateProductImageAction,
} from "@/utils/actions";

import React from "react";

const EditProduct = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  console.log("tttttttttttt", id);
  const product = await fetchAdminProductDetails({ productId: id });
  const { name, company, price, featured, description } = product;
  return (
    <section>
      <h1 className='capitalize font-semibold text-2xl'>update product</h1>
      <div className='p-8 border rounded'>
        <UpdateProductImage
          name={name}
          image={product.image}
          text='update product image'
          action={updateProductImageAction}
        >
          <input type='hidden' name='id' value={id} />
          <input type='hidden' name='url' value={product.image} />
        </UpdateProductImage>
        <FormContainer actionTest={updateProductAction}>
          <div className='grid gap-4 md:grid-cols-2 gap-y-8'>
            <input type='hidden' name='id' value={id} />
            <FormInput
              type='text'
              name='name'
              title='product'
              defaultValue={name}
              placeholder={name}
            />
            <FormInput
              type='text'
              name='company'
              title='company'
              defaultValue={company}
              placeholder={company}
            />
            <PriceInput defaultValue={price} />
          </div>
          <div className='mt-8'>
            <TextAreaInput
              name='description'
              title='description'
              defaultValue={description}
            />
          </div>
          <div className='mt-6'>
            <Checkbox defaultChecked={featured} />
          </div>
          <FormButton text='update product' sizeBtn='lg' className='mt-6' />
        </FormContainer>
      </div>
    </section>
  );
};

export default EditProduct;
