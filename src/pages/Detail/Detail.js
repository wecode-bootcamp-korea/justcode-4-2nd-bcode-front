import React from 'react';
import styled from 'styled-components';
import OrderBox from './components/OrderBox';

const Wrapper = styled.div`
  display: flex;
  margin-top: 100px;
`;
const ImgBox = styled.img`
  margin: 0 140px;
`;

function Detail() {
  const item = {
    brand: '아리따움 브랜드관',
    name: '5겹 코든 화장솜 80ea',
    price_before: 3500,
    price_after: 2000,
    rate: 3.9,
    reviews: 21323,
  };

  return (
    <Wrapper>
      <ImgBox src="https://raw.githubusercontent.com/youngseoKim-kr/B-code-img/master/img/1.jpg" />
      <OrderBox item={item} />
    </Wrapper>
  );
}

export default Detail;
