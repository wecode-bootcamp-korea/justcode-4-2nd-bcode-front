import styled, { css } from 'styled-components';
import { BsBagX } from 'react-icons/bs';
import Category from './Category';

function CartModal(props) {
  return (
    <CartSection>
      <div
        className={props.cartModalClassName}
        onMouseOver={() => {
          props.setCartClassName('cartModalChange');
        }}
        onMouseOut={() => {
          props.setCartClassName('cartModal');
        }}
      >
        <CartHeader>
          <CartTitle>장바구니</CartTitle>
          <span>전체삭제</span>
        </CartHeader>
        <CartMain></CartMain>
        <NoCartitem>
          <BsBagX className="icon" />
          <span>장바구니에 담긴 상품이 없습니다.</span>
        </NoCartitem>
      </div>
    </CartSection>
  );
}

const Cartcss = css`
  position: absolute;
  width: 525px;
  height: 800px;
  top: 167px;
  right: 0px;
  border: 1px solid #b4b4b4;
  background-color: white;
  box-shadow: 30px 30px 70px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in;
  z-index: 200;
`;
const CartSection = styled.section`
  .cartModal {
    ${Cartcss}
    transform: translateX(120%);
    @media (max-width: 375px) {
      display: none;
      width: 100%;
    }
  }
  .cartModalChange {
    ${Cartcss}
    visibility: visible;
    transform: translateX(0%);
    @media (max-width: 375px) {
      display: block;
      width: 100%;
    }
  }
`;

const CartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  margin: 30px;
  border-bottom: 3px solid black;
  span {
    color: #a6a6a6;
    font-size: 12px;
    cursor: pointer;
  }
`;

const NoCartitem = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .icon {
    font-size: 70px;
  }
  span {
    padding: 50px;
  }
`;

const CartTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const CartMain = styled.section``;

export default CartModal;
