import React, { useState, useEffect, useContext } from 'react';
import styled, { css } from 'styled-components';
import { DetailContext } from '../../Context';
import Review from '../Review';

function High() {
  const { reviews } = useContext(DetailContext);

  const sortedReviews = [...reviews.sort((a, b) => b.rating - a.rating)];

  return (
    <div>
      {sortedReviews.map(review => (
        <Review key={review.id} review={review} />
      ))}
    </div>
  );
}

export default High;
