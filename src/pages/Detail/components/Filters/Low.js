import React, { useState, useEffect, useContext } from 'react';
import styled, { css } from 'styled-components';
import { DetailContext } from '../../Context';

function Low() {
  const { reviews } = useContext(DetailContext);
  const sortedByBestReviews = [...reviews.sort((a, b) => b.rating - a.rating)];

  return <div>{}1111</div>;
}

export default Low;
