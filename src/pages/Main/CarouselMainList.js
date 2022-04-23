import styled from 'styled-components';

function CarouselMainList(props) {
  return (
    <CarouselImgList>
      <img src={props.img_url} />
    </CarouselImgList>
  );
}

const CarouselImgList = styled.li``;

export default CarouselMainList;
