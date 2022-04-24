import styled from 'styled-components';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import CarouselMainList from './CarouselMainList';
import { useEffect, useState, useRef } from 'react';

function CarouselMain() {
  const [carouselImg, setCarouselImg] = useState([]);
  const [widthValue, setWidthValue] = useState(0);

  const moveToLeft = () => {
    widthValue === 0 ? setWidthValue(0) : setWidthValue(widthValue + 1200);
  };

  const moveToRight = () => {
    const x = widthValue - 1200;
    console.log(widthValue);
    widthValue === -6000 ? setWidthValue(0) : setWidthValue(x);
  };

  useInterval(moveToRight, 3000);

  //react 에서 setInterval 대신 useInterval 을 만들어서 사용해줌
  function useInterval(callback, delay) {
    const savedCallback = useRef(); // 최근에 들어온 callback을 저장할 ref를 하나 만든다.

    useEffect(() => {
      savedCallback.current = callback; // callback이 바뀔 때마다 ref를 업데이트 해준다.
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current(); // tick이 실행되면 callback 함수를 실행시킨다.
      }
      if (delay !== null) {
        // 만약 delay가 null이 아니라면
        let id = setInterval(tick, delay); // delay에 맞추어 interval을 새로 실행시킨다.
        return () => clearInterval(id); // unmount될 때 clearInterval을 해준다.
      }
    }, [delay]); // delay가 바뀔 때마다 새로 실행된다.
  }

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
        <FiArrowLeft
          className="leftIcons"
          style={{ strokeWidth: '1' }}
          onClick={moveToLeft}
        />
      </LeftSection>
      <CarouselImgSection style={{ transform: `translateX(${widthValue}px)` }}>
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
        <FiArrowRight
          className="RightIcons"
          style={{ strokeWidth: '1' }}
          onClick={moveToRight}
        />
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
  z-index: 1;
`;

const LeftSection = styled.div`
  position: relative;
  height: 100%;
  background-color: black;
  opacity: 0.5;
  z-index: 2;
  .leftIcons {
    position: absolute;
    top: 50%;
    left: -80px;
    font-size: 48px;
    color: #9e9d9d;
    background-color: white;
    border-radius: 50%;
    cursor: pointer;
    z-index: 3;
    &:hover {
      color: #ee2d7a;
    }
  }
`;

const RightSection = styled.div`
  position: relative;
  height: 100%;
  .RightIcons {
    position: absolute;
    top: 50%;
    right: -80px;
    font-size: 48px;
    color: #9e9d9d;
    background-color: white;
    border-radius: 50%;
    cursor: pointer;
    z-index: 3;
    &:hover {
      color: ee2d7a;
    }
  }
`;

const CarouselImgSection = styled.ul`
  display: flex;
  width: 1200px;
  height: 100%;
  transition: all 0.3s ease-in;
  z-index: 1;
`;

export default CarouselMain;
