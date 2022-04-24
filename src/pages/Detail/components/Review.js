import React, { useContext, useState } from 'react';
import { DetailContext, UserContext, ReviewContext } from '../Context';
import styled from 'styled-components';
import {
  AiTwotoneStar,
  AiOutlineUser,
  AiOutlineHeart,
  AiOutlineEdit,
  AiOutlineDelete,
} from 'react-icons/ai';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 20px;
  padding: 70px 0;
  border-bottom: 1px solid silver;
  position: relative;

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
  .date {
    opacity: 0.7;
    padding-left: 10px;
  }

  .edit {
    position: absolute;
    display: flex;
    flex-direction: row;
    right: 0px;
    font-size: 30px;
  }
`;

function Review({ review }) {
  const { itemRate } = useContext(DetailContext);
  const { user } = useContext(UserContext);
  const { setReviewModalOpen, setFormMethod } = useContext(ReviewContext);

  const deleteReview = () => {
    fetch(`http://localhost:8000/review/${review.id}`, {
      method: 'DELETE',
    });
  };

  const updateReview = () => {
    setFormMethod({ method: 'PATCH', review_id: review.id });
    setReviewModalOpen(true);
  };

  return (
    <Wrapper>
      <User>
        <AiOutlineUser className="userIcon" />
        <span>{review.users.username.slice(0, 4) + '***'}</span>
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
          <span className="date">
            {review.created_at.split('-').join('.').slice(0, 10)}
          </span>
        </div>

        <span>{review.content}</span>
        <div className="heartBox">
          <AiOutlineHeart />
          &nbsp;
          {review.reviews_likes.length}
          {user === review.users.id && (
            <div className="edit">
              <AiOutlineEdit
                style={{ marginRight: '10px' }}
                onClick={() => updateReview()}
              />
              <AiOutlineDelete onClick={() => deleteReview()} />
            </div>
          )}
        </div>
      </Content>
    </Wrapper>
  );
}

export default Review;
