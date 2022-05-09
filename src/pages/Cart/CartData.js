import styled from 'styled-components';
import { useState } from 'react';
import { BsBagX, BsX } from 'react-icons/bs';

function CartNoData() {
  return (
    <tr>
      <td colSpan="99">
        <CartNoDataDiv>
          <p>
            <BsBagX size="2rem" />
          </p>

          <b>장바구니에 담긴 상품이 없습니다.</b>
        </CartNoDataDiv>
      </td>
    </tr>
  );
}

function CartData({ data, quantity, event, changeState }) {
  // console.log(data);
  const [discountTotal, setDiscountTotal] = useState(
    (data.products.price_before - data.products.price_after) * quantity
  );
  const [afterTotal, setAfterTotal] = useState(
    data.products.price_after * quantity
  );

  const deleteHandler = () => {
    event(data.products.id);
  };

  const changeQuantity = e => {
    fetch(
      `http://localhost:8000/cart/${data.products.id}?setQuantity=${e.target.value}`,
      {
        method: 'PUT',
        headers: {
          'content-Type': 'application/json',
          Authorization: localStorage.getItem('userId'),
        },
      }
    );
    setDiscountTotal(
      (data.products.price_before - data.products.price_after) * e.target.value
    );
    setAfterTotal(data.products.price_after * e.target.value);
  };

  const intoString = dataname => {
    return dataname.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  };
  let discountRate =
    Math.round(
      (1 - data.products.price_after / data.products.price_before) * 100
    ) + '%';
  return (
    <CartDataTr>
      <td>
        <input type="checkbox" />
      </td>

      <td>
        <ProductWrap>
          <ProductImg>
            <img src={data.products.image_url} alt={data.products.name} />
          </ProductImg>
          <ProductInfo>
            <Brand>{data.products.brands.name}</Brand>
            <li>{data.products.name}</li>
            <li>
              <Discount>{discountRate}</Discount>
              <span>{intoString(data.products.price_before)}원</span>
              <BeforePrice>
                {intoString(data.products.price_after)}원
              </BeforePrice>
            </li>
          </ProductInfo>
        </ProductWrap>
      </td>
      <td>
        <select
          defaultValue={quantity > 10 ? 10 : quantity}
          onChange={e => {
            changeQuantity(e);
            changeState(e);
          }}
        >
          <option value="1">1개</option>
          <option value="2">2개</option>
          <option value="3">3개</option>
          <option value="4">4개</option>
          <option value="5">5개</option>
          <option value="6">6개</option>
          <option value="7">7개</option>
          <option value="8">8개</option>
          <option value="9">9개</option>
          <option value="10">10개</option>
        </select>
      </td>
      <Price>{intoString(discountTotal)}원</Price>
      <Price>{intoString(afterTotal)}원</Price>
      <DeleteData onClick={deleteHandler}>
        <BsX size={22} />
        <span>삭제</span>
      </DeleteData>
    </CartDataTr>
  );
}
const CartNoDataDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 30px 0;
  text-align: center;
  & p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 70px;
    margin: 20px auto;
    background: #f4f4f4;
    border-radius: 50px;
  }
  & b {
    margin: 0 0 10px 0;
  }
`;
const CartDataTr = styled.tr`
  & td {
    padding: 20px 0;
    text-align: center;
    vertical-align: middle;
  }
`;

const ProductWrap = styled.div`
  display: flex;
`;

const ProductImg = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  overflow: hidden;
  background: #f3f3f3;
  & img {
    width: 100%;
  }
`;
const ProductInfo = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: end;
  margin-left: 10px;
  padding: 10px 0;
  font-size: ${props => props.theme.fontSize.small};
  & li {
    text-align: left;
    margin-bottom: 5px;
  }
  & span {
    margin: 0 1px;
  }
`;
const Brand = styled.li`
  color: ${props => props.theme.defaultInput};
`;
const Discount = styled.span`
  color: ${props => props.theme.point};
`;
const BeforePrice = styled.span`
  color: ${props => props.theme.defaultInput};
  text-decoration: line-through;
`;
const Price = styled.td`
  font-weight: 500;
`;
const DeleteData = styled.td`
  cursor: pointer;
  & span {
    vertical-align: super;
  }
`;

export { CartNoData, CartData };
