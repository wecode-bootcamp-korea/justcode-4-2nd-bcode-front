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

function CartData() {
  return (
    <CartDataTr>
      <ProductCheck>
        <input type="checkbox" />
      </ProductCheck>

      <td>
        <ProductWrap>
          <ProductImg>
            <img src="" alt="" />
          </ProductImg>
          <ProductInfo>
            <Brand>아이오페</Brand>
            <li>앰플</li>
            <li>
              <Discount>30%</Discount>
              <span>10000원</span>
              <BeforePrice>10000원</BeforePrice>
            </li>
          </ProductInfo>
        </ProductWrap>
      </td>
      <td>
        <select>
          <option>1개</option>
          <option>2개</option>
        </select>
      </td>
      <td>10000원</td>
      <td>10000원</td>
      <td>
        <span>
          <BsX />
          삭제
        </span>
      </td>
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
  }
`;

const ProductWrap = styled.div`
  display: flex;
`;
const ProductCheck = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProductImg = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  overflow: hidden;
  background: #f3f3f3;
`;
const ProductInfo = styled.ul`
  margin-left: 10px;
  font-size: ${props => props.theme.fontSize.small};
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
export { CartNoData, CartData };
