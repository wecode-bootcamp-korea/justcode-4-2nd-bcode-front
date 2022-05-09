import React, { useContext, useEffect } from 'react';
import { DetailContext, UserContext, ReviewContext } from '../Context';
import styled from 'styled-components';
import {
  AiTwotoneStar,
  AiOutlineUser,
  AiOutlineHeart,
  AiOutlineEdit,
  AiOutlineDelete,
  AiTwotoneHeart,
} from 'react-icons/ai';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 20px;
  padding: 70px 0;
  border-bottom: 1px solid silver;
  position: relative;

  @media (max-width: 820px) {
    font-size: 20px;
  }
  img {
    width: 150px;
    height: 130px;
    border: 1px dashed silver;
    border-radius: 10px;
    position: absolute;
    right: 10px;
    @media (min-width: 375px) and (max-width: 819px) {
      height: 35%;
      width: 30%;
      bottom: 50px;
    }
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
    bottom: 0;
    font-size: 30px;
  }
`;

function Review({ review }) {
  const { itemRate } = useContext(DetailContext);
  const { userId } = useContext(UserContext);
  const { setReviewModalOpen, setFormMethod } = useContext(ReviewContext);
  const { reviewLikes } = useContext(DetailContext);

  const deleteReview = () => {
    fetch(`http://localhost:8000/review/${review.id}`, {
      method: 'DELETE',
    });
    window.location.reload();
  };

  const updateReview = () => {
    setFormMethod({ method: 'PATCH', review_id: review.id });
    setReviewModalOpen(true);
  };

  const isLike = review.reviews_likes.length !== 0 ? true : false;

  const clickLike = isLike => {
    if (userId == null || userId == undefined) {
      return alert('로그인이 필요한 기능입니다.');
    } else {
      if (isLike === false) {
        fetch('http://localhost:8000/review/likes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: localStorage.getItem('userId'),
          },
          body: JSON.stringify({ reviewId: review.id }),
        });
      } else if (isLike === true) {
        fetch(
          `http://localhost:8000/review/likes/${review.reviews_likes[0].id}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: localStorage.getItem('userId'),
            },
          }
        );
      }
      window.location.reload();
    }
  };

  const reviewLikeCount =
    reviewLikes.filter(i => i.id === review.id).length !== 0
      ? reviewLikes.filter(i => i.id === review.id)[0].like_count
      : 0;

  return (
    <Wrapper>
      <User>
        <AiOutlineUser className="userIcon" />
        <span>{review.users.username.slice(0, 4) + '***'}</span>
      </User>
      <Content>
        <div>
          {itemRate(review.rating).map((i, index) =>
            i !== 0 ? (
              <AiTwotoneStar key={index} style={{ color: '#ffb23a' }} />
            ) : (
              <AiTwotoneStar key={index} style={{ color: 'silver' }} />
            )
          )}
          <span className="date">
            {review.created_at.split('-').join('.').slice(0, 10)}
          </span>
        </div>

        <span>{review.content}</span>
        <div className="heartBox" onClick={() => clickLike(isLike)}>
          {isLike ? (
            <AiTwotoneHeart style={{ color: 'red' }} />
          ) : (
            <AiOutlineHeart style={{ color: 'black' }} />
          )}
          &nbsp;
          {reviewLikeCount}
        </div>
        {userId === review.users.id && (
          <div className="edit">
            <AiOutlineEdit
              style={{ marginRight: '10px' }}
              onClick={() => updateReview()}
            />
            <AiOutlineDelete onClick={() => deleteReview()} />
          </div>
        )}
      </Content>
      {review.image && (
        <img src={'http://localhost:8000/' + review.image} alt="리뷰 이미지" />
      )}
    </Wrapper>
  );
}

export default Review;
