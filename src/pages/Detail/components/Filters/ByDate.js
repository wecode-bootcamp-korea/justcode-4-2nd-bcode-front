import React, { useState, useEffect, useContext } from 'react';
import styled, { css } from 'styled-components';
import { DetailContext } from '../../Context';
import Review from '../Review';

function ByDate() {
  const { reviews } = useContext(DetailContext);

  const slicedDate = () =>
    reviews.forEach(element => {
      element.created_at = element.created_at.slice(0, 10);
    });

  useEffect(() => {
    slicedDate();
    reviews.sort((a, b) => new Date(a) - new Date(b));
  }, []);

  return (
    <div>
      {reviews.map(review => (
        <Review key={review.id} review={review} />
      ))}
    </div>
  );
}

export default ByDate;
