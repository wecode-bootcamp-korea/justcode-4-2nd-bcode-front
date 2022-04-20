import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const Container = styled.div``;

const ImgContainer = styled.div`
  max-width: 224px;
  max-height: 224px;
  margin-bottom: 10px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const Product = styled.div`
  display: flex;
  flex-direction: column;

  & span {
    margin-bottom: 6px;
    font-size: 16px;
    font-weight: 700;
    color: #000;
  }
  & span:first-child {
    color: #999999;
  }
`;
const Price = styled.div`
  & div {
    margin-bottom: 5px;
  }
  & span {
    font-size: 16px;
    font-weight: 700;
  }
  & div > span:first-child {
    margin-right: 7px;
    color: #ee2d7a;
  }
  & div > span:last-child {
    color: #000;
  }
  & div + span {
    text-decoration: line-through;
    color: #999999;
  }
`;

const Rate = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  & span {
    display: flex;
    align-items: center;
    margin-right: 5px;
  }
  & span > span {
    font-size: 13px;
    color: #999999;
  }
`;

function Card(products) {
  const priceBefore = products.price_before + '원';
  const priceAfter = products.price_after + '원';
  const discount =
    Math.round((1 - products.price_after / products.price_before) * 100, -1) +
    '%';

  return (
    <div>
      <Container>
        <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/detail">
          <ImgContainer>
            <Img src={products.image_url} />
          </ImgContainer>
          <Product>
            <span>{products.brand}</span>
            <span>{products.name}</span>
          </Product>
          <Price>
            <div>
              <span>{discount}</span>
              <span>{priceAfter}</span>
            </div>
            <span>{priceBefore}</span>
          </Price>
          <Rate>
            <span>
              <FaStar color="#ffb33c" />
            </span>
            <span>{products.rate}</span>
            <span>|</span>
            <span>리뷰()</span>
          </Rate>
        </Link>
      </Container>
    </div>
  );
}

export default Card;
