import React, { useState, useEffect, useContext } from 'react';
import styled, { css } from 'styled-components';
import { AiTwotoneStar, AiOutlineEdit } from 'react-icons/ai';
import { DetailContext, ReviewContext } from '../Context';
import Line from '../components/Filters/Line';
import High from '../components/Filters/High';
import ReviewModal from '../components/Modals/ReviewModal';

const Wrapper = styled.div`
  border-top: 1px solid black;
  margin: 0 100px;
  margin-top: 100px;

  .reviewBox {
    color: #ee2c7a;
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 40px 0;
    border-bottom: 1px solid #ee2c7a;
    .writeReview {
      font-size: 50px;
      margin-left: 50px;
    }
  }
`;

const Rate = styled.div`
  font-size: 30px;
  padding: 100px 0;
  border-bottom: 1px solid silver;

  span {
    padding-right: 30px;
  }
`;

const Filter = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #e8e1e1;
  font-size: 25px;
  padding: 30px 0;
  button {
    font-size: 20px;
    border: none;
    background-color: inherit;
    margin-right: 10px;
  }
  span {
    margin-left: 20px;
  }
`;

function Reviews() {
  const { reviews, itemRate, item } = useContext(DetailContext);
  const [filter, setFilter] = useState(<High />);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  return (
    <Wrapper>
      <div className="reviewBox">
        상품 리뷰({reviews.length}){' '}
        <AiOutlineEdit
          className="writeReview"
          onClick={() => setReviewModalOpen(true)}
        />
        <ReviewModal
          reviewModalOpen={reviewModalOpen}
          setReviewModalOpen={setReviewModalOpen}
        />
      </div>

      <Rate>
        <span>고객 평점</span>
        {itemRate(Math.ceil(item.rate)).map(i =>
          i !== 0 ? (
            <AiTwotoneStar style={{ color: '#ffb23a' }} />
          ) : (
            <AiTwotoneStar style={{ color: 'silver' }} />
          )
        )}
        &nbsp;
        {Number(item.rate).toFixed(1)}
      </Rate>
      <ReviewContext.Provider value={{ setFilter }}>
        <Filter>
          <span>총 {reviews.length}</span>
          <Line />
        </Filter>
        {filter}
      </ReviewContext.Provider>
    </Wrapper>
  );
}

export default Reviews;