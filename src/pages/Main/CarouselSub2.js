import styled from 'styled-components';
import { RiArrowRightSLine } from 'react-icons/ri';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CarouselCard from '../../components/Card/CarouselCard';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

function CarouselCard2() {
  const [data, setData] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/category/3', { method: 'GET' })
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

  const goToDetail = id => {
    navigate(`/detail/${id}`);
    console.log(1);
  };

  return (
    <Container>
      <Header>
        <Title>영서's PICK,아뤼따움에서 가장 핫한 제품들</Title>
        <UpdateDate />
      </Header>
      <Section>
        <ImgLink href="/list/1">
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
          <FiChevronLeft
            onClick={handleLeftClick}
            className="leftIcons"
            style={{ strokeWidth: '1' }}
          />
          <CarouselWrapper>
            <SlideWrapper slideIndex={slideIndex}>
              {data.map(item => {
                return (
                  <Slide>
                    <CarouselCard
                      key={item.id}
                      item={item}
                      onClick={() => goToDetail(item.id)}
                    />
                  </Slide>
                );
              })}
            </SlideWrapper>
          </CarouselWrapper>
          <FiChevronRight
            onClick={handleRightClick}
            className="rightIcons"
            style={{ strokeWidth: '1' }}
          />
        </CarouselContainer>
      </Section>
    </Container>
  );
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
  @media (max-width: 1200px) {
    flex-direction: column;
    width: 100%;
  }
`;

const ImgLink = styled.a`
  display: block;
  width: 300px;
  overflow: hidden;
  color: inherit;
  text-decoration: none;
  @media (max-width: 1200px) {
    margin-left: 420px;
  }
  @media (max-width: 1000px) {
    margin-left: 320px;
  }
  @media (max-width: 800px) {
    margin-left: 220px;
  }
  @media (max-width: 600px) {
    margin-left: 150px;
  }
  @media (max-width: 500px) {
    margin-left: 100px;
  }
  @media (max-width: 410px) {
    margin-left: 60px;
  }
`;

const ImgBox = styled.figure`
  width: 100%;
  background: #f4f4f4;
  & img {
    height: 255px;
    transform: translate(-10%, 0);
  }
  & figcaption {
    padding: 20px 20px 35px 20px;
    background: #000;
  }
`;
const ImgCaption = styled.figcaption`
  color: ${props => props.theme.defaultInput};
  padding-left: 0px;
  & strong {
    display: inline-block;
    margin-bottom: 20px;
    color: ${props => props.theme.white};
    font-size: ${props => props.theme.fontSize.h4};
  }
`;
const CarouselContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  .leftIcons {
    position: absolute;
    border: 1px solid #9e9d9d;
    border-radius: 50%;
    top: 25%;
    left: -50px;
    font-size: 28px;
    color: #9e9d9d;
    cursor: pointer;
    transition: all 0.3s;
    @media (max-width: 1200px) {
      top: 35%;
      left: 100px;
    }
    @media (max-width: 470px) {
      top: 35%;
      left: 80px;
    }
    @media (max-width: 400px) {
      top: 35%;
      left: 50px;
    }
    &:hover {
      background: ${props => props.theme.white};
      color: ${props => props.theme.point};
      border: 1px solid ${props => props.theme.point};
    }
  }
  .rightIcons {
    position: absolute;
    top: 25%;
    right: -50px;
    border: 1px solid #9e9d9d;
    border-radius: 50%;
    font-size: 28px;
    color: #9e9d9d;
    cursor: pointer;
    transition: all 0.3s;
    @media (max-width: 1200px) {
      top: 35%;
      right: 100px;
    }
    @media (max-width: 470px) {
      top: 35%;
      right: 80px;
    }
    @media (max-width: 400px) {
      top: 35%;
      right: 50px;
    }
    &:hover {
      background: ${props => props.theme.white};
      color: ${props => props.theme.point};
      border: 1px solid ${props => props.theme.point};
    }
  }
  @media (max-width: 1200px) {
    margin-top: 70px;
  }
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
  @media (max-width: 980px) {
    width: 500px;
  }
  @media (max-width: 700px) {
    width: 250px;
  }
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

export default CarouselCard2;
