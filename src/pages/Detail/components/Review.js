import React, { useState, useEffect, useContext } from 'react';
import { DetailContext } from '../Context';
import styled from 'styled-components';
import { AiTwotoneStar, AiOutlineUser, AiOutlineHeart } from 'react-icons/ai';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 20px;
  padding: 70px 0;
  border-bottom: 1px solid silver;
  @media (max-width: 820px) {
    font-size: 15px;
  }
`;
const User = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 50px;

  .userIcon {
    margin-bottom: 10px;
    font-size: 50px;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  div {
    padding: 10px 0;
    line-height: 30px;
  }

  span {
    line-height: 150%;
  }
  .heartBox {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    border-radius: 10px;
    border: 1px silver solid;
    padding: 5px;
  }
`;

function Review({ review }) {
  const { itemRate } = useContext(DetailContext);
  return (
    <Wrapper>
      <User>
        <AiOutlineUser className="userIcon" />
        <span>{review.username.slice(0, 4) + '***'}</span>
      </User>
      <Content>
        <div>
          {itemRate(review.rating).map(i =>
            i !== 0 ? (
              <AiTwotoneStar style={{ color: '#ffb23a' }} />
            ) : (
              <AiTwotoneStar style={{ color: 'silver' }} />
            )
          )}
        </div>

        <span>{review.content}</span>
        <div className="heartBox">
          <AiOutlineHeart />
          &nbsp;
          {review.Reviews_likes.length}
        </div>
      </Content>
    </Wrapper>
  );
}

export default Review;
