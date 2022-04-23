import styled from 'styled-components';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import CarouselMainList from './CarouselMainList';
import { useEffect, useState } from 'react';

function CarouselMain() {
  const [carouselImg, setCarouselImg] = useState([]);

  useEffect(() => {
    fetch(`/data/MainCarousel.json`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setCarouselImg(data);
      });
  }, []);
  return (
    <CarouselSection>
      <LeftSection>
        <FiArrowLeft className="leftIcons" style={{ strokeWidth: '1' }} />
      </LeftSection>
      <CarouselImgSection>
        {carouselImg.map((comment, index) => {
          return (
            <CarouselMainList
              key={index}
              id={comment.id}
              img_url={comment.image_url}
            />
          );
        })}
      </CarouselImgSection>
      <RightSection>
        <FiArrowRight className="RightIcons" style={{ strokeWidth: '1' }} />
      </RightSection>
    </CarouselSection>
  );
}

const CarouselSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 480px;
  overflow: hidden;
`;

const LeftSection = styled.div`
  height: 100%;
  width: 20%;
  background-color: blue;
`;

const RightSection = styled.div`
  height: 100%;
  width: 20%;
`;

const CarouselImgSection = styled.ul`
  display: flex;
  position: relative;
  width: 80%;
  height: 100%;
  margin: auto;
  .leftIcons {
    position: absolute;
    top: 220px;
    left: -80px;
    font-size: 48px;
    color: #9e9d9d;
    background-color: white;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      color: #ee2d7a;
    }
  }
  .RightIcons {
    position: absolute;
    top: 220px;
    right: -80px;
    font-size: 48px;
    color: #9e9d9d;
    background-color: white;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      color: ee2d7a;
    }
  }
`;

export default CarouselMain;
