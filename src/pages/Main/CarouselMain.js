import styled from 'styled-components';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import CarouselMainList from './CarouselMainList';
import { useEffect, useState, useRef } from 'react';

function CarouselMain() {
  const [carouselImg, setCarouselImg] = useState([]);
  const [widthValue, setWidthValue] = useState(-1200);
  const [widthSpeed, setWidthSpeed] = useState(0.3);
  const [delay, setDelay] = useState(3000);

  const moveToLeft = () => {
    //버튼 클릭시 delay 멈춤
    setDelay(null);
    setWidthSpeed(0.3);
    widthValue === 0 ? setWidthValue(0) : setWidthValue(widthValue + 1200);
    if (widthValue === -1200) {
      setTimeout(() => {
        setWidthSpeed(0);
        setWidthValue(-3600);
      }, 300);
    }
    //버튼클릭시 delay를 멈추고 3초뒤 다시 실행
    setTimeout(() => {
      setDelay(3000);
    }, 300);
  };

  const moveToRight = () => {
    //버튼 클릭시 delay 멈춤
    setDelay(null);
    setWidthSpeed(0.3);
    widthValue === -6000 ? setWidthValue(0) : setWidthValue(widthValue - 1200);
    if (widthValue === -3600) {
      setTimeout(() => {
        setWidthSpeed(0);
        setWidthValue(-1200);
      }, 300);
    }
    //버튼클릭시 delay를 멈추고 3초뒤 다시 실행
    setTimeout(() => {
      setDelay(3000);
    }, 300);
  };

  useInterval(moveToRight, delay);

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
      <FiChevronLeft
        className="leftIcons"
        style={{ strokeWidth: '1' }}
        onClick={moveToLeft}
      />
      <CarouselImgSection
        style={{
          transform: `translate3d(${widthValue}px,0,0)`,
          transition: `${widthSpeed}s`,
        }}
      >
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
      <FiChevronRight
        className="RightIcons"
        style={{ strokeWidth: '1' }}
        onClick={moveToRight}
      />
    </CarouselSection>
  );
}

const CarouselSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .leftIcons {
    position: absolute;
    left: 4%;
    font-size: 38px;
    color: #9e9d9d;
    background-color: white;
    border: 1px solid #9e9d9d;
    border-radius: 50%;
    cursor: pointer;
    z-index: 3;
    &:hover {
      color: white;
      background-color: #9e9d9d;
    }
  }
  .RightIcons {
    position: absolute;
    right: 4%;
    font-size: 38px;
    color: #9e9d9d;
    background-color: white;
    border: 1px solid #9e9d9d;
    border-radius: 50%;
    cursor: pointer;
    z-index: 3;
    &:hover {
      color: white;
      background-color: #9e9d9d;
    }
  }
`;

const CarouselImgSection = styled.ul`
  display: flex;
  width: 1200px;
  transition: all 0.3s ease-in;
  z-index: 1;
  @media (max-width: 1430px) {
    width: 100%;
  }
`;

export default CarouselMain;
