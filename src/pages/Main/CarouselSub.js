import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

function CarouselSub() {
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
        <Title>모두가 주목하는 베스트 제품</Title>
      </Header>
      <FiChevronLeft
        onClick={handleLeftClick}
        className="leftIcons"
        style={{ strokeWidth: '1' }}
      />
      <CarouselWrapper>
        <SlideWrapper slideIndex={slideIndex}>
          {data.map(item => {
            return (
              <Slide key={item.id}>
                <Card key={item.id} item={item} />
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
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  max-width: 1325px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin: 100px auto;
  .leftIcons {
    position: absolute;
    top: 50%;
    left: 10px;
    border: 1px solid #9e9d9d;
    border-radius: 50%;
    font-size: 38px;
    cursor: pointer;
    color: #9e9d9d;
    transition: all 0.3s;
    &:hover {
      background: ${props => props.theme.white};
      color: ${props => props.theme.point};
      border: 1px solid ${props => props.theme.point};
    }
  }
  .rightIcons {
    position: absolute;
    top: 50%;
    right: 0px;
    border: 1px solid #9e9d9d;
    border-radius: 50%;
    font-size: 38px;
    cursor: pointer;
    color: #9e9d9d;
    transition: all 0.3s;
    &:hover {
      background: ${props => props.theme.white};
      color: ${props => props.theme.point};
      border: 1px solid ${props => props.theme.point};
    }
  }
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
const Update = styled.span`
  font-size: 16px;
  color: #999999;
`;

const CarouselWrapper = styled.div`
  max-width: 3600px;
  overflow: hidden;
  margin: auto;
`;

const SlideWrapper = styled.div`
  width: 1200px;
  display: flex;
  transition: all 0.5s ease-in-out;
  transform: translateX(${props => props.slideIndex * -600}px);
`;

const Slide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  margin: 0px 30px;
`;

export default CarouselSub;
