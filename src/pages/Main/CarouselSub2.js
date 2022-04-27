import styled from 'styled-components';
import { RiArrowRightSLine } from 'react-icons/ri';
import { useState, useEffect } from 'react';
import { CarouselBtn } from '../../components/Carousel/CarouselBtn';

function CarouselCard2() {
  const [data, setData] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8000/category/2', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        setData(data);
      });
  }, []);

  const handleLeftClick = () => {
    setSlideIndex(slideIndex > 0 ? slideIndex - 1 : null);
  };

  const handleRightClick = () => {
    setSlideIndex(slideIndex < 3 ? slideIndex + 1 : 3);
  };

  return (
    <Container>
      <Header>
        <Title>영서's PICK,아뤼따움에서 가장 핫한 제품들</Title>
        <UpdateDate></UpdateDate>
      </Header>
      <Section>
        <ImgLink href="#">
          <ImgBox>
            <img
              src="https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="section"
            />
            <ImgCaption>
              <strong>
                카테고리 페이지 바로가기
                <RiArrowRightSLine
                  style={{ fontSize: '1.5rem', verticalAlign: 'sub' }}
                />
              </strong>
              <p>더 많은 제품을 찾아보세요!</p>
            </ImgCaption>
          </ImgBox>
        </ImgLink>
        <CarouselContainer>
          <CarouselWrapper>
            <SlideWrapper slideIndex={slideIndex}>
              {data.map(item => {
                return (
                  <Slide key={item.id}>
                    <CarouselCard item={item} />
                  </Slide>
                );
              })}
            </SlideWrapper>
          </CarouselWrapper>
          <BtnWrapper>
            <CarouselBtn type="left" event={handleLeftClick} />
            <CarouselBtn type="right" event={handleRightClick} />
          </BtnWrapper>
        </CarouselContainer>
      </Section>
    </Container>
  );
}
{
  /* <Arrow type="right" onClick={() => handleClick('right')}>
        <AiOutlineRight />
      </Arrow>
      <Arrow type="left" onClick={() => handleClick('left')}>
        <AiOutlineLeft />
      </Arrow>{' '} */
}

const Container = styled.div`
  max-width: 1325px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin: 100px auto;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0px 90px;
  margin: 50px;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;
const UpdateDate = styled.span`
  font-size: 16px;
  color: #999999;
`;
const Section = styled.div`
  width: 1300px;
  display: flex;
  justify-content: space-evenly;
`;

const ImgLink = styled.a`
  display: block;
  width: 300px;
  overflow: hidden;
  color: inherit;
  text-decoration: none;
  @media only screen and (max-width: 414px) {
    margin: 0 auto 50px;
    width: 90%;
  } ;
`;
const ImgBox = styled.figure`
  width: 100%;
  background: #f4f4f4;
  & img {
    height: 255px;
  }
  & figcaption {
    padding: 20px 20px 35px 20px;
    background: #000;
  }
`;
const ImgCaption = styled.figcaption`
  color: ${props => props.theme.defaultInput};
  & strong {
    display: inline-block;
    margin-bottom: 20px;
    color: ${props => props.theme.white};
    font-size: ${props => props.theme.fontSize.h4};
  }
`;
const CarouselContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CarouselWrapper = styled.div`
  max-width: 2190px;
  overflow: hidden;
  margin: 0 auto;
`;

const SlideWrapper = styled.div`
  width: 730px;
  display: flex;
  transition: all 0.5s ease-in-out;
  transform: translateX(${props => props.slideIndex * -365}px);
`;

const Slide = styled.div`
  width: 100%;
  height: 100%;
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: space-between; */
  margin: 0px 30px;
`;

const BtnWrapper = styled.div`
  width: 830px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 0;
  bottom: 0;
`;

// const Arrow = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: absolute;
//   top: 120px;
//   bottom: 0;
//   left: ${props => props.type === 'left' && '18rem'};
//   right: ${props => props.type === 'right' && '18rem'};
//   margin: auto;
//   width: 50px;
//   height: 50px;
//   border: 1px solid #929292;
//   border-radius: 50%;
//   cursor: pointer;
//   opacity: 0.5;
//   z-index: 10;
//   &:hover {
//     color: #ee2d7a;
//     border-color: #ee2d7a;
//   }
// `;

export default CarouselCard2;
