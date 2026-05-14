import { Button } from "../ui/button";

const AddToCart = ({ productId }: { productId: string }) => {
  return (
    <Button size='lg' className='capitalize text-lg mt-8'>
      add to cart
    </Button>
  );
};

export default AddToCart;
