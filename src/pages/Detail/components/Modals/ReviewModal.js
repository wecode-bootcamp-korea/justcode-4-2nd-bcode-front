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
  const { userId } = useContext(UserContext);
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
          alert('????????? ????????? ?????? ?????????');
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
    const oldFormData = new FormData();

    if (!watch('rating')) {
      alert('?????? ????????? ??????????????? ?????? ????????? ?????????');
    } else {
      if (formMethod.method === 'POST') {
        newFormData.set('productId', product_id);
        newFormData.set('userId', userId);
        newFormData.set('rating', data.rating);
        newFormData.set('content', data.content);
        newFormData.set('reviewImage', watchImg ? watchImg[0] : null);

        fetch('http://localhost:8000/review/', {
          method: 'POST',
          headers: { Authorization: localStorage.getItem('userId') },
          body: newFormData,
        })
          .then(cleanData(fileImg))
          .then(alert('????????? ??????????????????'));
      } else if (formMethod.method === 'PATCH') {
        oldFormData.set('rating', data.rating);
        oldFormData.set('content', data.content);
        oldFormData.set('reviewImage', watchImg ? watchImg[0] : null);

        fetch(`http://localhost:8000/review/${formMethod.review_id}`, {
          method: 'PATCH',
          headers: { Authorization: localStorage.getItem('userId') },
          body: oldFormData,
        })
          .then(cleanData(fileImg))
          .then(alert('????????? ??????????????????'));
      }
    }
    window.location.reload();
  };

  const closeModal = () => {
    cleanData(fileImg);
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {reviewModalOpen && (
        <Box>
          <Modal method={formMethod.method} onSubmit={handleSubmit(onSubmit)}>
            <AiOutlineClose className="close" onClick={() => closeModal()} />
            <input
              className="fileInput"
              type="file"
              accept="image/*"
              {...register('image')}
            />
            {imgPreview && (
              <Preview>
                <img src={imgPreview} alt="?????? ????????? ????????? ??? ?????????" />
              </Preview>
            )}
            <textarea
              className="content"
              {...register('content', { required: true })}
              placeholder="????????? ???????????????."
            />

            <fieldset>
              <input
                type="radio"
                name="reviewStar"
                value="5"
                id="rate1"
                {...register('rating')}
              />
              <label htmlFor="rate1">???</label>
              <input
                type="radio"
                name="reviewStar"
                value="4"
                id="rate2"
                {...register('rating')}
              />
              <label htmlFor="rate2">???</label>
              <input
                type="radio"
                name="reviewStar"
                value="3"
                id="rate3"
                {...register('rating')}
              />
              <label htmlFor="rate3">???</label>
              <input
                type="radio"
                name="reviewStar"
                value="2"
                id="rate4"
                {...register('rating')}
              />
              <label htmlFor="rate4">???</label>
              <input
                type="radio"
                name="reviewStar"
                value="1"
                id="rate5"
                {...register('rating')}
              />
              <label htmlFor="rate5">???</label>
              <span style={{ marginRight: '10px' }}>????????? ??????????????????</span>
            </fieldset>

            <input className="submit" type="submit" value="?????? ?????? ??????" />
          </Modal>
        </Box>
      )}
    </>
  );
}

export default ReviewModal;
