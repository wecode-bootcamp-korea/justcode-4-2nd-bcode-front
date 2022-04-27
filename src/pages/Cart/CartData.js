import styled from 'styled-components';
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

function CartData({ data, quantity, event }) {
  //onChange event
  console.log(data);
  const changeQuantity = (e, val) => {
    // console.log(e.target.value);
    fetch(
      `http://localhost:8000/cart/${data.id}?setQuantity=${e.target.value}`,
      { method: 'PUT' }
    );
  };

  const intoString = dataname => {
    return dataname.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  };
  let discountRate =
    Math.round((1 - data.price_after / data.price_before) * 100) + '%';
  return (
    <CartDataTr>
      <td>
        <input type="checkbox" />
      </td>

      <td>
        <ProductWrap>
          <ProductImg>
            <img src={data.image_url} alt={data.name} />
          </ProductImg>
          <ProductInfo>
            <Brand>{data.brands.name}</Brand>
            <li>{data.name}</li>
            <li>
              <Discount>{discountRate}</Discount>
              <span>{intoString(data.price_before)}원</span>
              <BeforePrice>{intoString(data.price_after)}원</BeforePrice>
            </li>
          </ProductInfo>
        </ProductWrap>
      </td>
      <td>
        <select defaultValue={quantity} onChange={changeQuantity}>
          <option value="null">선택</option>
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
      <Price>{Number(data.price_before * quantity).toLocaleString()}원</Price>
      <Price>{Number(data.price_after * quantity).toLocaleString()}원</Price>
      <DeleteData>
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
