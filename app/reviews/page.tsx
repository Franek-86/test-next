import IconButton from "@/components/form/Buttons";
import FormButton from "@/components/form/FormButton";
import FormContainer from "@/components/form/FormContainer";
import SectionTitle from "@/components/global/SectionTitle";
import CardRating from "@/components/rating/CardRating";
import { Button } from "@/components/ui/button";
import { deleteReviewAction, fetchProductReviewsByUser } from "@/utils/actions";
const Reviews = async () => {
  const reviews = await fetchProductReviewsByUser();
  if (reviews.length === 0) {
    return <SectionTitle title='There are currently no reviews left by you' />;
  }

  return (
    <>
      <section className='grid md:grid-cols-2 gap-8 mt-4'>
        {reviews.map((review) => {
          const { rating, comment } = review;
          const { name, image } = review.product;
          const infoReview = { rating, comment, name, image };
          return (
            <CardRating key={review.id} infoReview={infoReview}>
              <DeleteReview reviewId={review.id} />
            </CardRating>
          );
        })}
      </section>
    </>
  );
};

const DeleteReview = ({ reviewId }: { reviewId: string }) => {
  const deleteAction = deleteReviewAction.bind(null, { reviewId: reviewId });
  return (
    <FormContainer actionTest={deleteAction}>
      <Button type='submit' variant='ghost'>
        <IconButton actionType='delete' />
      </Button>
    </FormContainer>
  );
};

export default Reviews;
