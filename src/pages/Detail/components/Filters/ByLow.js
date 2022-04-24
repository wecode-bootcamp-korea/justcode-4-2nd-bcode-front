import React, { useContext } from 'react';
import { DetailContext } from '../../Context';
import Review from '../Review';

function Low() {
  const { reviews } = useContext(DetailContext);

  const sortedReviews = [...reviews.sort((a, b) => a.rating - b.rating)];

  return (
    <div>
      {sortedReviews.map(review => (
        <Review key={review.id} review={review} />
      ))}
    </div>
  );
}

export default Low;
