import styled from 'styled-components';
import { RiCloseFill } from 'react-icons/ri';
import { useRef, useReducer, useState } from 'react';

function ModalPopup(props) {
  const popup = useRef();
  return (
    <ModalBody>
      <ModalBg ref={popup}>
        <ModalBox>
          <ModalHead>
            <ModalClose onClick={props.event}>
              <RiCloseFill size="2rem" />
            </ModalClose>
          </ModalHead>
          <ModalText>
            <p>아이디 / 비밀번호가 일치하지 않습니다.</p>
            <p>확인 후 다시 시도해 주세요.</p>
            <ModalBtn type="button" onClick={props.event}>
              확인
            </ModalBtn>
          </ModalText>
        </ModalBox>
      </ModalBg>
    </ModalBody>
  );
}
const ModalBody = styled.div`
  position: relative;
  width: 100%;
  z-index: 130;
`;
const ModalBg = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: 470px;
  width: 45%;
  padding: 20px;
  background: #fff;
  border-radius: 20px;
  transform: translate(-50%, -50%);
  @media only screen and (max-width: 414px) {
    max-width: 300px;
    width: 300px;
  } ;
`;

const ModalHead = styled.div`
  display: flex;
  justify-content: end;
`;

const ModalClose = styled.span`
  display: block;
  color: ${props => props.theme.defaultInput};
  cursor: pointer;
`;

const ModalText = styled.div`
  padding: 20px 30px;
  text-align: center;
  & p {
    margin-bottom: 5px;
  }
  @media only screen and (max-width: 414px) {
    padding: 20px 0;
  } ;
`;

const ModalBtn = styled.button`
  width: 100px;
  padding: 10px;
  margin: 20px 0 0;
  background: ${props => props.theme.point};
  color: ${props => props.theme.white};
  border-radius: 0;
  border: none;
  cursor: pointer;
`;
export default ModalPopup;
