import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { CartNoData, CartData } from './CartData';
import { getCookie } from '../../cookie';
import { BiMinus, BiPlus } from 'react-icons/bi';

function Cart() {
  const deliveryFee = 2500;
  const [cartList, setCartList] = useState([]);
  const intoString = dataname => {
    return dataname.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  };
  const deleteData = id => {
    const result = cartList.filter(item => item.products.id !== id);
    setCartList(result);
    fetch(`http://localhost:8000/cart/${id} `, { method: 'DELETE' });
  };
  const totalPrice = cartList
    .map(order => {
      let array = [];
      array.push(order.products.price_before * order.products.quantity);
      array.push(order.products.price_after * order.products.quantity);
    })
    .reduce(function (prev, curr) {
      return prev + curr;
    }, 0);

  useEffect(() => {
    fetch(`http://localhost:8000/cart/now`, { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        setCartList(data);
      });
  }, []);
  // console.log(cartList);
  return (
    <CartWrap>
      <CartHeader>
        <H3>장바구니</H3>
        <ol>
          <PathNow>장바구니</PathNow>
          <li>&gt;</li>
          <li> 주문/결제</li>
          <li>&gt;</li>
          <li>주문완료</li>
        </ol>
      </CartHeader>
      <div>
        <CartListTable>
          <colgroup>
            <col width="50" />
            <col width="*" />
            <col width="100" />
            <col width="100" />
            <col width="110" />
            <col width="100" />
          </colgroup>
          <CartListHead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>상품명/옵션명/상품가격</th>
              <th>수량</th>
              <th>할인금액</th>
              <th>판매가격</th>
              <th>주문</th>
            </tr>
          </CartListHead>
          <tbody>
            {cartList.length !== 0 ? (
              cartList.map(order => {
                return (
                  <CartData
                    key={order.id}
                    data={order.products}
                    quantity={order.quantity}
                    event={deleteData}
                  />
                );
              })
            ) : (
              <CartNoData />
            )}

            <TotalPriceArea>
              <td colSpan="6">
                <TotalPayList>
                  <PriceInfo>
                    총 상품금액
                    <span>
                      500
                      <b>원</b>
                    </span>
                  </PriceInfo>
                  <TotalSymbol>
                    <BiMinus size="2rem" strokeWidth="1" />
                  </TotalSymbol>
                  <PriceInfo>
                    총 할인금액
                    <span>
                      500
                      <b>원</b>
                    </span>
                  </PriceInfo>
                  <TotalSymbol>
                    <BiPlus size="2rem" />
                  </TotalSymbol>
                  <PriceInfo>
                    배송비
                    <span>
                      {intoString(deliveryFee)}
                      <b>원</b>
                    </span>
                  </PriceInfo>
                </TotalPayList>
              </td>
            </TotalPriceArea>
            <PaymentArea>
              <td colSpan="99">
                결제 예상 금액 <span>10000</span>원
              </td>
            </PaymentArea>
            <tr />
          </tbody>
        </CartListTable>
        <BtnArea>
          <PayBlackBtn type="button">선택상품 주문하기</PayBlackBtn>
          <PayBtn type="button">전체주문</PayBtn>
        </BtnArea>
      </div>
    </CartWrap>
  );
}

const CartWrap = styled.div`
  width: 1100px;
  margin: 0 auto;
  padding: 80px 100px;
  box-sizing: border-box;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 30px;
  & ol {
    display: flex;
    font-size: ${props => props.theme.fontSize.small};
    color: ${props => props.theme.defaultInput};
    & li {
      margin: 0 2px;
    }
  }
`;
const PathNow = styled.li`
  color: ${props => props.theme.text};
  font-weight: 500;
`;
const H3 = styled.h3`
  font-size: ${props => props.theme.fontSize.h3};
  font-weight: 500;
`;
const CartListTable = styled.table`
  table-layout: fixed;
`;
const CartListHead = styled.thead`
  border-top: 2px solid #333;
  & th {
    padding: 10px 0;
    background: #f9f9f9;
    font-size: ${props => props.theme.fontSize.small};
  }
`;
const TotalPriceArea = styled.tr`
  border-top: 2px solid #333;
`;
const TotalPayList = styled.ul`
  display: flex;
  align-items: center;
  padding: 20px 0;

  & li {
    font-size: ${props => props.theme.fontSize.small};
    display: flex;
    flex-direction: column;
    text-align: center;
  }
`;
const PriceInfo = styled.li`
  width: 300px;
  & span {
    margin: 20px 0 50px;
    font-size: ${props => props.theme.fontSize.h3};
    font-weight: 500;
    & b {
      margin-left: 5px;
      font-size: ${props => props.theme.fontSize.small};
      font-weight: 400;
    }
  }
`;
const TotalSymbol = styled.li`
  width: 30px;
  margin-bottom: 20px;
`;
const PaymentArea = styled.tr`
  & td {
    padding: 40px 30px;
    background: #f9f9f9;
    text-align: right;
    font-size: ${props => props.theme.fontSize.h5};
    & span {
      margin: 0 0 0 5px;
      font-size: ${props => props.theme.fontSize.h2};
      color: ${props => props.theme.point};
      font-weight: 600;
    }
  }
`;

const BtnArea = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const PayBtn = styled.button`
  padding: 15px 20px;
  margin: 0 2px;
  background: ${props => props.theme.point};
  border: 1px solid ${props => props.theme.point};
  font-size: ${props => props.theme.fontSize.h6};
  color: ${props => props.theme.white};
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background: ${props => props.theme.white};
    color: ${props => props.theme.point};
  }
`;

const PayBlackBtn = styled(PayBtn)`
  background: #222;
  border: 1px solid #222;
  &:hover {
    color: #222;
  }
`;
export default Cart;
