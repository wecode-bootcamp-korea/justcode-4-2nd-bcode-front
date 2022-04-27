import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FiX } from 'react-icons/fi';

function CartModalList(props) {
  const navigate = useNavigate();

  const priceBefore = props.price_before + '원';
  const priceAfter = props.price_after + '원';
  const discount =
    Math.round((1 - props.price_after / props.price_before) * 100, -1) + '%';

  const goToDetailPage = () => {
    navigate(`/detail/${props.id}`);
    window.location.reload();
  };

  return (
    <CartSection>
      <CartClick onClick={goToDetailPage}>
        <img src={props.image_url} />
        <CartInfo>
          <span className="brandName">{props.brandname}</span>
          <span className="cartName">{props.name}</span>
          <CartPrice>
            {discount === '0%' ? (
              ''
            ) : (
              <span className="discountPrice">{discount}</span>
            )}
            <span className="afterPrice">{priceAfter}</span>
            {discount === '0%' ? (
              ''
            ) : (
              <span className="beforePrice">{priceBefore}</span>
            )}
          </CartPrice>
        </CartInfo>
      </CartClick>
      <FiX
        className="icon"
        style={{ stroke: 'black', strokeWidth: '1' }}
        onClick={() => props.deleteCartItem(props.id)}
      />
    </CartSection>
  );
}

const CartSection = styled.div`
  position: relative;
  img {
    width: 150px;
    border-radius: 12px;
  }
  .icon {
    position: absolute;
    font-size: 20px;
    right: 90px;
    top: 20px;
    cursor: pointer;
  }
`;

const CartClick = styled.div`
  display: flex;
  padding: 20px 40px;
  cursor: pointer;
`;

const CartInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 20px;
  .brandName {
    font-size: 14px;
    color: #b8b8b8;
    padding-bottom: 10px;
  }
  .cartName {
    font-size: 14px;
    font-weight: 500;
    padding-bottom: 60px;
  }
`;

const CartPrice = styled.div`
  span {
    padding: 2px;
  }
  .discountPrice {
    font-size: 16px;
    color: #b8b8b8;
  }
  .afterPrice {
    font-size: 16px;
    font-weight: 500;
  }
  .beforePrice {
    font-size: 14px;
    color: #b8b8b8;
    text-decoration: line-through;
  }
`;

export default CartModalList;
