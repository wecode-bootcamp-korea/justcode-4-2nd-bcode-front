import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';

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
  background-color: white;
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
    top: 15px;
    right: 15px;
    opacity: 0.5;
  }
  .content {
  }
  .priveiw {
    width: 200px;
    height: 100px;
  }
`;

function ReviewModal({ reviewModalOpen, setReviewModalOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [file, setFile] = useState('');
  const [previewURL, setPreviewURL] = useState('');
  const [preview, setPreview] = useState(null);
  const fileRef = useRef();
  const onSubmit = data => console.log(data);

  useEffect(() => {
    if (file !== '')
      //처음 파일 등록하지 않았을 때를 방지
      setPreview(<img className="img_preview" src={previewURL} />);
    return () => {};
  }, [previewURL]);

  const handleFileOnChange = event => {
    //파일 불러오기
    event.preventDefault();
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onloadend = e => {
      setFile(file);
      setPreviewURL(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleFileButtonClick = e => {
    //버튼 대신 클릭하기
    e.preventDefault();
    fileRef.current.click(); // file 불러오는 버튼을 대신 클릭함
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
          >
            <AiOutlineClose onClick={() => setReviewModalOpen(false)} />
            <input
              className="content"
              {...register('content', { required: true })}
            />
            <input
              type="file"
              accept="image/*"
              {...register('image_url', { required: true })}
              onClick={handleFileButtonClick}
            />
            <input
              ref={fileRef}
              hidden={true}
              id="file"
              type="file"
              onChange={handleFileOnChange}
            />
            <div className="priveiw">{preview}</div>
            <input type="submit" value="리뷰 작성 완료" />
          </Modal>
        </Box>
      )}
    </>
  );
}

export default ReviewModal;
