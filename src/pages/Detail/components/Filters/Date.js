import React, { useState, useEffect, useContext } from 'react';
import styled, { css } from 'styled-components';
import { DetailContext } from '../../Context';

function Date() {
  const { reviews } = useContext(DetailContext);
  const sortedByBestReviews = [...reviews.sort((a, b) => b.rating - a.rating)];

  return <div>{}dsadsds</div>;
}

export default Date;
