import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';
import { useParams } from 'react-router-dom';

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
    font-size: 25px;
    position: absolute;
    right: 0;
    opacity: 0.5;
  }
  .content {
    &:focus {
      outline: none;
    }
    width: 400px;
    height: 400px;
    resize: none;
    font-size: 20px;
    @media (max-width: 375px) {
      width: 300px;
    }
  }

  select {
    padding: 10px 20px;
    margin: 20px 0;
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

function ReviewModal({ reviewModalOpen, setReviewModalOpen }) {
  const [imgPreview, setImgPreview] = useState('');
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const watchImg = watch('image');
  let file;
  useEffect(() => {
    if (watchImg) {
      file = watchImg[0];
      if (!file) {
        setImgPreview(null);
      } else {
        setImgPreview(URL.createObjectURL(file));
      }
    }
  }, [watchImg]);

  const cleanData = file => {
    URL.revokeObjectURL(file);
    setImgPreview(null);
    reset();
    setReviewModalOpen(false);
  };

  const onSubmit = data => {
    console.log(data);
    fetch('http://localhost:8000/review/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: {
        productId: id,
        content: data.content,
        rating: data.rating,
        image: data.image,
      },
    }).then(cleanData(file));
  };

  const closeModal = () => {
    cleanData(file);
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {reviewModalOpen && (
        <Box>
          <Modal
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
            enctype="multipart/form-data"
            name="reviewForm"
          >
            <AiOutlineClose onClick={() => closeModal()} />
            <input
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
              placeholder="댓글을 입력하세요"
            />
            <select form="reviewForm" {...register('rating')} required>
              <option value="1">1점</option>
              <option value="2">2점</option>
              <option value="3">3점</option>
              <option value="4">4점</option>
              <option value="5">5점</option>
            </select>

            <input type="submit" value="리뷰 작성 완료" />
          </Modal>
        </Box>
      )}
    </>
  );
}

export default ReviewModal;
