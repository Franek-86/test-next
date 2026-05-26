// "use client";
import CheckboxInput from "@/components/form/CheckBoxInput";
import FormButton from "@/components/form/FormButton";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInput from "@/components/form/ImageInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { test } from "@/utils/actions";
import { faker } from "@faker-js/faker";

const AddProduct = () => {
  const product = faker.commerce.product();
  const company = faker.company.name();
  const description = faker.lorem.paragraph({ min: 10, max: 30 });
  // function test(formData: FormData) {
  //   console.log(formData.get("product"));

  // }
  return (
    <section>
      <h1 className='text-2xl capitalize mb-5'>add product</h1>
      <div className='p-8 border rounded-md'>
        <FormContainer actionTest={test}>
          <div className='grid my-5 lg:grid-cols-2 lg:gap-x-5'>
            <FormInput
              type='text'
              title='product'
              name='name'
              defaultValue={product}
              placeholder={product}
            />
            <FormInput
              type='text'
              title='company'
              name='company'
              defaultValue={company}
              placeholder={company}
            />
            <ImageInput />
            <PriceInput />
          </div>
          <TextAreaInput
            title='description'
            name='description'
            defaultValue={description}
          />
          <CheckboxInput title='featured' name='featured' flag={false} />
          {/* <Button className='mt-2' type='submit'>
            Test
          </Button> */}
          <FormButton sizeBtn='lg' text='submit form' className='mt-5' />
        </FormContainer>
      </div>
    </section>
  );
};

export default AddProduct;
