import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 285px;
  @media only screen and (max-width: 820px) {
    width: 180px;
  }
  @media only screen and (max-width: 375px) {
    width: 315px;
  }
`;

const Wrapper = styled.div`
  @media only screen and (max-width: 375px) {
    display: flex;
    justify-content: center;
  }
`;

const ImgContainer = styled.div`
  max-width: 224px;
  max-height: 224px;
  margin-bottom: 10px;
  @media only screen and (max-width: 820px) {
    max-width: 135px;
    max-height: 135px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const Info = styled.div`
  @media only screen and (max-width: 375px) {
    margin-top: 10px;
    margin-left: 50px;
    font-size: 12px;
  }
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
  @media only screen and (max-width: 375px) {
    width: 100px;
  }
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

function Card({ item }) {
  const { id } = useParams();
  const priceBefore = item.price_before + '원';
  const priceAfter = item.price_after + '원';
  const discount =
    Math.round((1 - item.price_after / item.price_before) * 100, -1) + '%';

  return (
    <div>
      <Container>
        <Link
          style={{ textDecoration: 'none', color: 'inherit' }}
          to="/detail?id=${id}"
        >
          <Wrapper>
            <ImgContainer>
              <Img src={item.image_url} />
            </ImgContainer>
            <Info>
              <Product>
                <span>{item.brands.name}</span>
                <span>{item.name}</span>
              </Product>
              <Price>
                <div>
                  <span>{discount === '0%' ? null : discount}</span>
                  <span>{priceAfter}</span>
                </div>
                <span>{priceBefore === priceAfter ? null : priceBefore}</span>
              </Price>
              <Rate>
                <span>
                  <FaStar color="#ffb33c" />
                </span>
                <span>{item.reviews}</span>
                <span>|</span>
                <span>리뷰()</span>
              </Rate>
            </Info>
          </Wrapper>
        </Link>
      </Container>
    </div>
  );
}

export default Card;
