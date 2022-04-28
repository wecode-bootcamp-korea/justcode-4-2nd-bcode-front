import CarouselMain from './CarouselMain';
import ButtonCarousel from './ButtonCarousel';
import CarouselSub from './CarouselSub';
import CarouselSub2 from './CarouselSub2';
import Loading from '../../components/Loading';
import { useState } from 'react';

function Main() {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 200);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <CarouselMain />
          <ButtonCarousel />
          <CarouselSub />
          <CarouselSub2 />
        </>
      )}
    </>
  );
}

export default Main;
