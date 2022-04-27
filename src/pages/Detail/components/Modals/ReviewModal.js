import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../Context';

const Box = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 200%;
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  @media (max-width: 820px) {
    height: 300%;
  }
`;

const Modal = styled.form`
  border-radius: 5px;
  width: 900px;
  height: 750px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 400px;

  .close {
    font-size: 50px;
    position: absolute;
    right: 50px;
    top: 50px;
    opacity: 0.5;
  }
  .fileInput {
    padding: 10px;
    font-size: 20px;
  }
  .content {
    &:focus {
      outline: none;
    }
    width: 400px;
    height: 400px;
    resize: none;
    font-size: 20px;
    border: 2px solid #ee2c7a;

    @media (max-width: 375px) {
      width: 300px;
    }
  }

  .submit {
    border: 2px solid #ee2c7a;
    background-color: white;
    padding: 20px;
    font-size: 20px;
  }
  select {
    padding: 10px 20px;
    margin: 20px 0;
  }

  fieldset {
    display: flex;
    flex-direction: row-reverse;
    margin: 30px;
    input[type='radio'] {
      display: none;
      &:checked ~ label {
        text-shadow: 0 0 0 rgba(250, 208, 0, 0.99);
      }
    }
    label {
      -webkit-text-fill-color: transparent;
      -webkit-text-stroke-width: 1.7px;
      -webkit-text-stroke-color: #ee2c7a;
      text-shadow: 0 0 0 white;
      cursor: pointer;
    }
  }
`;

const Preview = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  img {
    width: 100%;
    height: 100%;

    @media (max-width: 375px) {
      width: 80%;
    }
  }
`;

function ReviewModal({ reviewModalOpen, setReviewModalOpen, formMethod }) {
  const { user_id } = useContext(UserContext);
  const [imgPreview, setImgPreview] = useState('');
  const { product_id } = useParams();
  const { register, handleSubmit, watch, reset } = useForm();

  let watchImg = watch('image');
  let fileImg;
  useEffect(() => {
    if (watchImg) {
      fileImg = watchImg[0];
      if (!fileImg) {
        setImgPreview(null);
      } else {
        if (fileImg.size > 20000000) {
          alert('사진의 용량이 너무 큽니다');
          watchImg.value = null;
        } else {
          setImgPreview(URL.createObjectURL(fileImg));
        }
      }
    }
  }, [watchImg]);

  const cleanData = fileImg => {
    URL.revokeObjectURL(fileImg);
    setImgPreview(null);
    reset();
    setReviewModalOpen(false);
  };

  const onSubmit = data => {
    const newFormData = new FormData();

    newFormData.set('productId', product_id);
    newFormData.set('userId', user_id);
    newFormData.set('rating', data.rating);
    newFormData.set('content', data.content);
    newFormData.set('reviewImage', watchImg[0]);

    if (!watch('rating') || !!watchImg) {
      alert('모든 정보를 입력했는지 다시 확인해 주세요');
    } else {
      if (formMethod.method === 'POST') {
        fetch('http://localhost:8000/review/', {
          method: 'POST',
          headers: {},
          body: newFormData,
        })
          .then(cleanData(fileImg))
          .then(alert('리뷰를 등록했습니다'));
      } else if (formMethod.method === 'PATCH') {
        fetch(`http://localhost:8000/review/${formMethod.review_id}`, {
          method: 'PATCH',
          headers: {},
          body: {
            content: data.content,
            rating: data.rating,
            image: imgPreview,
          },
        })
          .then(cleanData(fileImg))
          .then(alert('리뷰를 수정했습니다'));
      }
    }
  };

  const closeModal = () => {
    cleanData(fileImg);
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {reviewModalOpen && (
        <Box>
          <Modal
            method={formMethod.method}
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            <AiOutlineClose className="close" onClick={() => closeModal()} />
            <input
              className="fileInput"
              type="file"
              accept="image/*"
              {...register('image', { required: true })}
            />
            {imgPreview && (
              <Preview>
                <img src={imgPreview} alt="다른 사진을 업로드 해 주세요" />
              </Preview>
            )}
            <textarea
              className="content"
              {...register('content', { required: true })}
              placeholder="댓글을 입력하세요."
            />

            <fieldset>
              <input
                type="radio"
                name="reviewStar"
                value="5"
                id="rate1"
                {...register('rating')}
              />
              <label for="rate1">★</label>
              <input
                type="radio"
                name="reviewStar"
                value="4"
                id="rate2"
                {...register('rating')}
              />
              <label for="rate2">★</label>
              <input
                type="radio"
                name="reviewStar"
                value="3"
                id="rate3"
                {...register('rating')}
              />
              <label for="rate3">★</label>
              <input
                type="radio"
                name="reviewStar"
                value="2"
                id="rate4"
                {...register('rating')}
              />
              <label for="rate4">★</label>
              <input
                type="radio"
                name="reviewStar"
                value="1"
                id="rate5"
                {...register('rating')}
              />
              <label for="rate5">★</label>
              <span style={{ marginRight: '10px' }} class="text-bold">
                별점을 선택해주세요
              </span>
            </fieldset>

            <input className="submit" type="submit" value="리뷰 작성 완료" />
          </Modal>
        </Box>
      )}
    </>
  );
}

export default ReviewModal;
