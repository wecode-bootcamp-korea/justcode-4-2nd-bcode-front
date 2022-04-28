import styled, { css } from 'styled-components';
import { BsBagX } from 'react-icons/bs';
import Category from './Category';
import { useEffect, useState } from 'react';
import CartModalList from './CartModalList';

function CartModal(props) {
  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/cart/now`, {
      method: 'GET',
      headers: {
        'content-Type': 'application/json',
        authorization: localStorage.getItem('userId'),
      },
    })
      .then(res => res.json())
      .then(data => {
        setCartItem(data);
      });
  }, []);

  //장바구니 삭제
  const deleteCartItem = id => {
    const result = cartItem.filter(item => item.products.id !== id);
    setCartItem(result);
    fetch(`http://localhost:8000/cart/${id}`, {
      method: 'DELETE',
      headers: {
        'content-Type': 'application/json',
        authorization: localStorage.getItem('userId'),
      },
    })
      .then(res => res.json())
      .then(data => {});
  };

  const deleteAll = () => {
    setCartItem([]);
    fetch(`http://localhost:8000/cart/all`, {
      method: 'DELETE',
      headers: {
        'content-Type': 'application/json',
        authorization: localStorage.getItem('userId'),
      },
    })
      .then(res => res.json())
      .then(data => {});
  };

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
          <span onClick={deleteAll}>전체삭제</span>
        </CartHeader>
        {cartItem == false ? (
          <NoCartitem>
            <BsBagX className="icon" />
            <span>장바구니에 담긴 상품이 없습니다.</span>
          </NoCartitem>
        ) : (
          <Wrap>
            <CartMain>
              {cartItem.map((comment, index) => {
                return (
                  <CartModalList
                    key={index}
                    id={comment.products.id}
                    brandname={comment.products.brands.name}
                    name={comment.products.name}
                    image_url={comment.products.image_url}
                    price_after={comment.products.price_after}
                    price_before={comment.products.price_before}
                    deleteCartItem={deleteCartItem}
                  />
                );
              })}
            </CartMain>
          </Wrap>
        )}
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
    @media (max-width: 530px) {
      display: none;
      width: 100%;
    }
  }
  .cartModalChange {
    ${Cartcss}
    visibility: visible;
    transform: translateX(0%);
    @media (max-width: 530px) {
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

const CartMain = styled.section`
  overflow: scroll;
  height: 100%;
`;

const Wrap = styled.div`
  overflow: hidden;
  height: 600px;
`;

export default CartModal;
