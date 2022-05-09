import styled from 'styled-components';

function CarouselMainList(props) {
  return (
    <CarouselImgList>
      <img src={props.img_url} />
    </CarouselImgList>
  );
}

const CarouselImgList = styled.li`
  z-index: 1;
  img {
    width: 1200px;
    @media (max-width: 820px) {
      width: 820px;
    }
    @media (max-width: 375px) {
      width: 375px;
    }
  }
`;

export default CarouselMainList;
