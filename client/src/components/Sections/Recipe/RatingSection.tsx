import React, { useState } from 'react';
import {
  useGetReviewsQuery,
  useAddReviewMutation,
} from '@/redux/Service/review';
import { useRouter, useParams } from "next/navigation";
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { FaStar } from 'react-icons/fa'; // Importing star icons for rating
import Image from 'next/image';

interface RatingSectionProps {
  foodItemId: string;
}

const RatingSection: React.FC<RatingSectionProps> = ({ foodItemId }) => {
  const [showAll, setShowAll] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');

  const { data } = useGetReviewsQuery(foodItemId);
  const reviews2 = data?.reviews // Ensure reviews2 is an array
  console.log("reviews2",reviews2)

  const [addReview] = useAddReviewMutation();

  const handleAddReview = async () => {
    if (!rating || !comment.trim()) {
      alert("Please provide both a rating and a comment.");
      return;
    }

    try {
      await addReview({ foodItemId, rating, comment }).unwrap();
      setComment('');
      setRating(0);
    } catch (error) {
      console.error('Failed to add review', error);
    }
  };

  return (
    <div className="mb-8">
      <CardContent className="py-6 px-0 sm:px-2">
        {/* Rating & reviews2 Summary */}
        <div className="flex flex-col px-0 sm:px-6 md:flex-row md:flex-wrap gap-8">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-4">Rating & reviews2</h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl font-bold">
                {reviews2?.length > 0
                  ? (reviews2?.reduce((acc, review) => acc + review.rating, 0) / reviews2.length).toFixed(1)
                  : 'No Ratings'}
              </div>
              <div>
                <div className="text-sm text-gray-500">
                  Based on {reviews2?.length} reviews2
                </div>
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-6" />

        {/* Add Review Section */}
        <div className="my-6">
          <h4 className="text-lg font-medium">Add a Review</h4>
          <div className="flex items-center mt-4 mb-2">
            <span className="text-gray-700 mr-3">Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer ${star <= (hover || rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(rating)}
              />
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review here..."
            className="w-full border rounded p-2 mt-2 mb-4"
          />
          <Button onClick={handleAddReview} disabled={!rating || !comment.trim()}>
            Submit Review
          </Button>
        </div>

        {/* Display reviews2 */}
        <div className={`space-y-6 ${showAll ? 'max-h-[500px] overflow-y-scroll' : ''}`}>
  {reviews2?.slice(0, showAll ? reviews2?.length : 2).map((review) => (
    <div key={review._id} className="space-y-4">
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src={review.customer.avatar || ''} />
            <AvatarFallback>{review.customer.name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium text-sm sm:text-base">{review.customer.name}</h4>
            <div className="flex items-center">
              {[...Array(review.rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-500" />
              ))}
            </div>
            <span>{review.comment}</span>
          </div>
        </div>
      </div>
      {/* <p className="text-gray-600">{review.comment}</p> */}

      {/* Optional: Display food images if available */}
      {review.foodImage.length > 0 && (
        <div className="flex gap-2 mt-4">
          {review.foodImage.map((image, idx) => (
            <Image key={idx} src={image} alt="Food image" width={50} height={50} />
          ))}
        </div>
      )}
    </div>
  ))}
</div>
        <Button variant="outline" className="w-full mt-6" onClick={() => setShowAll(!showAll)}>
          {showAll ? 'See Less' : 'Show All reviews'}
        </Button>
      </CardContent>
    </div>
  );
};

export default RatingSection;

