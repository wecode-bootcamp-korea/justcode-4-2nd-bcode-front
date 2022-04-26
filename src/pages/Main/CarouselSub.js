import styled from 'styled-components';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';

const Container = styled.div`
  max-width: 1920px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const Header = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
  margin: 100px;
  @media only screen and (max-width: 1900px) {
    width: 900px;
  }
  @media only screen and (max-width: 1700px) {
    width: 800px;
  }
  @media only screen and (max-width: 1350px) {
    width: 65 0px;
  }
  @media only screen and (max-width: 820px) {
    width: 600px;
  }
  @media only screen and (max-width: 375px) {
    flex-direction: column;
    align-items: center;
    margin: 30px;
  }
`;
const Title = styled.h1`
  font-size: 24px;
  @media only screen and (max-width: 375px) {
    font-size: 16px;
  }
`;
const UpdateDate = styled.span`
  font-size: 16px;
  color: #999999;
  @media only screen and (max-width: 375px) {
    font-size: 10px;
  }
`;

const Arrow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 120px;
  bottom: 0;
  left: ${props => props.type === 'left' && '18rem'};
  right: ${props => props.type === 'right' && '18rem'};
  margin: auto;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: lightgray;
  cursor: pointer;
  opacity: 0.5;
  z-index: 10;
  @media only screen and (max-width: 820px) {
    left: ${props => props.type === 'left' && '2rem'};
    right: ${props => props.type === 'right' && '2rem'};
  }
  @media only screen and (max-width: 375px) {
    top: 300px;
    left: ${props => props.type === 'left' && '5rem'};
    right: ${props => props.type === 'right' && '6rem'};
  }
`;

const CarouselWrapper = styled.div`
  max-width: 1200px;
  overflow: hidden;
  margin: auto;
  @media only screen and (max-width: 1900px) {
    max-width: 1000px;
  }
  @media only screen and (max-width: 1700px) {
    max-width: 800px;
  }
  @media only screen and (max-width: 1550px) {
    max-width: 600px;
  }
  @media only screen and (max-width: 820px) {
    max-width: 550px;
  }
  @media only screen and (max-width: 375px) {
    max-width: 330px;
  }
`;

const SlideWrapper = styled.div`
  width: 160vw;
  display: flex;
  transition: all 0.5s ease-in-out;
  transform: translateX(${props => props.slideIndex * -32}vw);
  @media only screen and (max-width: 820px) {
    transform: translateX(${props => props.slideIndex * -66}vw);
  }
  @media only screen and (max-width: 375px) {
    transform: translateX(${props => props.slideIndex * -82}vw);
  }
`;

const Slide = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
`;

function Login() {
  const [data, setData] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [timer, setTimer] = useState('00:00:00');

  useEffect(() => {
    fetch('data/sample2.json', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        setData(data);
      });
  }, []);

  const handleClick = type => {
    if (type === 'left') {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : null);
      console.log(slideIndex);
    } else {
      setSlideIndex(slideIndex < 3 ? slideIndex + 1 : 3);
    }
  };

  const getTime = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    setTimer(`${hours}시 ${minutes}분 ${seconds}초`);
  };

  const startTime = () => {
    setInterval(getTime, 1000);
  };

  startTime();

  return (
    <Container>
      <Header>
        <Title>모두가 주목하는 베스트 제품</Title>
        <UpdateDate>업데이트 일시: {timer}</UpdateDate>
      </Header>
      <CarouselWrapper>
        <SlideWrapper slideIndex={slideIndex}>
          {data.map(item => {
            return (
              <Slide key={item.id}>
                <Card item={item} />
              </Slide>
            );
          })}
        </SlideWrapper>
      </CarouselWrapper>
      <Arrow type="right" onClick={() => handleClick('right')}>
        <AiOutlineRight />
      </Arrow>
      <Arrow type="left" onClick={() => handleClick('left')}>
        <AiOutlineLeft />
      </Arrow>
    </Container>
  );
}

export default Login;
