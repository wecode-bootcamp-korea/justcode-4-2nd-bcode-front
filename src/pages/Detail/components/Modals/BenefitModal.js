import React, { useContext } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../../Context';
import { AiOutlineClose } from 'react-icons/ai';

const Modal = styled.div`
  position: absolute;
  border: 1px solid black;
  width: 340px;
  height: 200px;
  z-index: 333;
  background-color: white;
  padding: 20px;
  .top {
    font-size: 15px;
    display: flex;
    justify-content: space-between;
  }
  .close {
    font-size: 25px;
  }
  .accumulate {
    background-color: #e8e1e1;
    display: flex;
    height: 30px;
    align-items: center;
    span:first-child {
      margin-right: 30px;
      margin-left: 10px;
    }
  }
  .notice {
    opacity: 0.6;
  }
  ul {
    list-style: disc;
    margin-left: 15px;
    line-height: 140%;
    margin-bottom: 30px;
    li {
      margin-top: 10px;
    }
  }

  @media (max-width: 820px) {
    width: 200px;
    height: 200px;
  }
`;

function BenefitModal() {
  const { setBenefitModalOpen, benefitModalOpen, item } =
    useContext(ModalContext);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <div>
      {benefitModalOpen && (
        <Modal>
          <div className="top">
            <span>뷰티 포인트</span>
            <AiOutlineClose
              className="close"
              onClick={() => setBenefitModalOpen(false)}
            />
          </div>
          <div className="accumulate">
            <span>기본 적립 1%</span>
            <span style={{ color: '#5F9DE4' }}>{item.price_after / 100}p</span>
          </div>
          <ul>
            <li>
              아모레퍼시픽 뷰티포인트 통합 회원 대상
              <br />
              <span style={{ color: '#5F9DE4' }}>최종 결제 금액의 1% 적립</span>
            </li>
            <li>배송 후 구매 확정 시 적립</li>
          </ul>
          <span className="notice">
            ※ 할인과 포인트 사용액을 제외하고 적립되므로, 적립액은 쿠폰 할인
            적용과 뷰티포인트 사용액에 따라 달라질 수 있습니다.
          </span>
        </Modal>
      )}
    </div>
  );
}

export default BenefitModal;
