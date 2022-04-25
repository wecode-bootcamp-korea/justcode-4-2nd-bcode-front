import React, { useContext } from 'react';
import { DetailContext } from '../../Context';
import Review from '../Review';

function Byfilter({ filter }) {
  const { reviews } = useContext(DetailContext);

  let sortedReviews = [];

  switch (filter) {
    case 'high': {
      sortedReviews = [...reviews.sort((a, b) => b.rating - a.rating)];
      break;
    }
    case 'low': {
      sortedReviews = [...reviews.sort((a, b) => a.rating - b.rating)];
      break;
    }
    case 'date': {
      if (reviews.map(i => i.created_at.length > 11)) {
        reviews.forEach(element => {
          element.created_at = element.created_at.slice(0, 10);
        });
      }
      sortedReviews = [
        ...reviews.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ),
      ];
      break;
    }
    default: {
      sortedReviews = [...reviews.sort((a, b) => b.rating - a.rating)];
      break;
    }
  }

  return (
    <div>
      {sortedReviews.map(review => (
        <Review key={review.id} review={review} />
      ))}
    </div>
  );
}

export default Byfilter;
