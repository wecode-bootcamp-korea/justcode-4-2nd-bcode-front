import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import OrderBox from './components/OrderBox';
import Reviews from './components/Reviews';
import { DetailContext } from './Context';

const Wrapper = styled.div`
  display: flex;

  flex-direction: column;
  margin: 0 100px;
  margin-top: 100px;
  justify-content: center;
  @media (max-width: 375px) {
    flex-direction: column;
  }
  @media (max-width: 820px) {
    margin: 0;
    margin-top: 100px;
  }
  .detail {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
`;
const ImgBox = styled.img`
  margin: 0 140px;
  @media screen and (max-width: 1920px) {
    width: 35%;
  }
  @media (max-width: 820px) {
    width: 35%;
    height: 60%;
    margin: 300px 100px;
  }
  @media (max-width: 375px) {
    width: 100%;
    margin: 0;
  }
`;

function Detail() {
  const [item, setItem] = useState();
  const [reviews, setReviews] = useState();
  const [loading, setLoading] = useState(true);

  const processOnlyItem = res => {
    res.reviews = res.Reviews.length;
    res.rate =
      res.Reviews.map(review => review.rating).reduce((acc, cur) => acc + cur) /
      res.reviews;

    return res;
  };

  useEffect(() => {
    fetch('http://localhost:3000/data/detail.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        setReviews(res.Reviews);
        setItem(processOnlyItem(res));
        setLoading(false);
      });
  }, []);

  const itemRate = count => {
    const arr = [];
    for (let i = 1; i < count + 1; i++) {
      arr[i] = i;
    }
    for (let j = count + 1; j < 6; j++) {
      arr[j] = 0;
    }
    arr.shift();
    return arr;
  };

  return (
    <Wrapper>
      {loading ? (
        <div>loading...</div>
      ) : (
        <DetailContext.Provider value={{ item, itemRate, reviews }}>
          <div className="detail">
            <ImgBox src={item.image_url} />
            <OrderBox />
          </div>

          <Reviews />
        </DetailContext.Provider>
      )}
    </Wrapper>
  );
}

export default Detail;
