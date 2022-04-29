import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

function CarouselCard({ item }) {
  const priceBefore = item.price_before.toLocaleString() + '원';
  const priceAfter = item.price_after.toLocaleString() + '원';
  const discount =
    Math.round((1 - item.price_after / item.price_before) * 100, -1) + '%';
  const navigate = useNavigate();

  const goToDetail = id => {
    navigate(`/detail/${item.id}`);
    window.scrollTo(0, 0);
  };
  return (
    <Container onClick={goToDetail}>
      <Product>
        <ImgContainer>
          <Img src={item.image_url} />
        </ImgContainer>
        <Info>
          <Name>
            <BrandTitle>{item.brand_name}</BrandTitle>
            <Title>{item.name}</Title>
          </Name>
          <Price>
            <span>
              {discount === '0%' ? '' : <Discount>{discount}</Discount>}
              <PriceAfter>{priceAfter}</PriceAfter>
            </span>
            {priceBefore === priceAfter ? (
              ''
            ) : (
              <PriceBefore>{priceBefore}</PriceBefore>
            )}
          </Price>
          <Review>
            <span>
              <FaStar color="#ffb33c" />
            </span>
            <Grade>{item.ratingAvg && item.ratingAvg.toFixed(1)}</Grade>
            <span>|</span>
            <Count>리뷰({item.contentCnt})</Count>
          </Review>
        </Info>
      </Product>
    </Container>
  );
}

export default CarouselCard;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
`;
// 수정 필요
const Product = styled.div`
  min-height: 150px;
  flex-basis: 150px;
  flex-shrink: 1;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImgContainer = styled.div`
  display: flex;
  width: 120px;
  height: 120px;
  margin-bottom: 10px;
  @media only screen and (max-width: 1550px) {
    width: 180px;
    height: 180px;
  }
`;

const Img = styled.img`
  flex-grow: 1;
  width: 100%;
  height: 100%;
  border-radius: 5%;
`;

const Info = styled.div`
  width: 120px;
  text-align: left;
  @media only screen and (max-width: 1550px) {
    width: 180px;
  }
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin-bottom: 6px;
  font-size: ${props => props.theme.fontSize.default};
  color: ${props => props.theme.text};
`;

const BrandTitle = styled(Title)`
  color: ${props => props.theme.lightGray};
`;

const Price = styled.div`
  font-size: ${props => props.theme.fontSize.default};
  font-weight: 700;
  & span {
    display: flex;
    margin-bottom: 3px;
  }
`;

const Discount = styled.span`
  margin-right: 7px;
  color: #ee2d7a;
`;
const PriceBefore = styled.span`
  text-decoration: line-through;
  color: ${props => props.theme.lightGray};
`;
const PriceAfter = styled.span`
  color: ${props => props.theme.text};
`;

const Review = styled.div`
  display: flex;
  margin-top: 5px;
  font-size: 12px;
  & span {
    margin-right: 5px;
  }
`;

const Grade = styled.span`
  font-weight: 600;
`;

const Count = styled.span`
  font-weight: 600;
  color: ${props => props.theme.lightGray};
`;
