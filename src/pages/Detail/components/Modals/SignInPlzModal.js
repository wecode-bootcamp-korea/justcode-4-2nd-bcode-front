import React from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';

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

const Modal = styled.div`
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

  color: #ee2c7a;
  font-size: 35px;
  margin-bottom: 20px;

  .link {
    text-decoration: none;
    margin-top: 20px;
  }
  .close {
    font-size: 70px;
    position: absolute;
    top: 100px;
  }
`;

function SignInPlzModal({ signInPlzModalOpen, setSignInPlzModalOpen }) {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {signInPlzModalOpen && (
        <Box>
          <Modal>
            <AiOutlineClose
              className="close"
              onClick={() => setSignInPlzModalOpen(false)}
            />
            <span>로그인을 한 후 이용할 수 있습니다.</span>
            <Link className="link" to="/login">
              <span>로그인하러 가기 &rarr;</span>
            </Link>
          </Modal>
        </Box>
      )}
    </>
  );
}

export default SignInPlzModal;
