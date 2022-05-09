import React, { useContext } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../../Context';
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
  width: 400px;
  height: 150px;
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
  .continue {
    color: #ee2c7a;
    border: 1px solid #ee2c7a;
  }
  .go {
    background-color: #ee2c7a;
    color: white;
  }
  span {
    font-weight: 600;
    margin-top: 5px;
  }
`;

const BtnBox = styled.div`
  display: flex;
  margin-top: 20px;

  div {
    padding: 7px;
    margin: 0 5px;
  }
`;

function CartModal() {
  const { setCartModalOpen, cartModalOpen } = useContext(ModalContext);
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {cartModalOpen && (
        <Box>
          <Modal>
            <AiOutlineClose
              className="close"
              onClick={() => setCartModalOpen(false)}
            />
            <span>
              선택하신 상품을 <br />
              장바구니에 담았습니다.
            </span>
            <BtnBox>
              <div className="continue" onClick={() => setCartModalOpen(false)}>
                쇼핑 계속하기
              </div>

              <div className="go">
                {' '}
                <Link
                  to="/cart"
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  장바구니 가기
                </Link>
              </div>
            </BtnBox>
          </Modal>
        </Box>
      )}
    </>
  );
}

export default CartModal;
