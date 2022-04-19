import React, { useContext } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../Context';
import { AiOutlineClose } from 'react-icons/ai';

const Modal = styled.div`
  position: absolute;
  border: 1px solid black;
  width: 340px;
  height: 250px;
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
    background-color: #f4f4f4;
  }
  .notice {
    opacity: 0.6;
  }
`;

function BenefitModal() {
  const { setBenefitModalOpen, benefitModalOpen, item } =
    useContext(ModalContext);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <div>
      {benefitModalOpen ? (
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
            <span style={{ color: 'blue' }}>{item.price_after / 100}p</span>
          </div>

          <li>
            아모레퍼시픽 뷰티포인트 통합 회원 대상 최종 결제 금액의 1% 적립
          </li>
          <li>배송 후 구매 확정 시 적립</li>
          <span className="notice">
            ※ 할인과 포인트 사용액을 제외하고 적립되므로, 적립액은 쿠폰 할인
            적용과 뷰티포인트 사용액에 따라 달라질 수 있습니다.
          </span>
        </Modal>
      ) : null}
    </div>
  );
}

export default BenefitModal;
