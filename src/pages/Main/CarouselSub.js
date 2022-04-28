import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../../components/Card/Card';
import { CarouselBtn } from '../../components/Carousel/CarouselBtn';

function CarouselSub() {
  const [data, setData] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  // const navigate = useNavigate();
  // const params = useParams();
  // console.log(params);

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

  const goToDetail = () => {
    // navigate(`/detail/${id}`);
  };
  // const link = `/detail/${id}`;

  return (
    <Container>
      <Header>
        <Title>모두가 주목하는 베스트 제품</Title>
        <Update>업데이트 일시: 4월 27일 8:53</Update>
      </Header>
      <CarouselWrapper>
        <SlideWrapper slideIndex={slideIndex}>
          {data.map(item => {
            return (
              <Slide key={item.id} onClick={goToDetail}>
                {/* <Link to={link}> */}
                <Card item={item} index={item.id} />
                {/* </Link> */}
              </Slide>
            );
          })}
        </SlideWrapper>
      </CarouselWrapper>
      <BtnWrapper>
        <CarouselBtn type="left" event={handleLeftClick} />
        <CarouselBtn type="right" event={handleRightClick} />
      </BtnWrapper>
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

// const a = styled(Link)``;

const BtnWrapper = styled.div`
  width: 1325px;
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

export default CarouselSub;
