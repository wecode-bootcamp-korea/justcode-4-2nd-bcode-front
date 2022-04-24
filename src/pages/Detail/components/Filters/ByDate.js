import React, { useContext } from 'react';
import { DetailContext } from '../../Context';
import Review from '../Review';

function ByDate() {
  const { reviews } = useContext(DetailContext);

  reviews.forEach(element => {
    element.created_at = element.created_at.slice(0, 10);
  });

  const sortedReviews = [
    ...reviews.sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    ),
  ];

  return (
    <div>
      {sortedReviews.map(review => (
        <Review key={review.id} review={review} />
      ))}
    </div>
  );
}

export default ByDate;
