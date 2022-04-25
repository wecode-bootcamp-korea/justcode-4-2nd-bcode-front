import styled from 'styled-components';
import { RiArrowRightSLine } from 'react-icons/ri';
import Card from '../../components/Card/Card';
import { CarouselBtn } from '../../components/Carousel/CarouselBtn';

function TabCarousel() {
  return (
    <article>
      <ContentInner>
        <H3>영서's PICK,아뤼따움에서 가장 핫한 제품들</H3>
        <TabList>
          <TabBtn className="active">에슾으아</TabBtn>
          <TabBtn>매머드</TabBtn>
        </TabList>
        <TabContent>
          <ImgLink href="#">
            <ImgBox>
              <img
                src="https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt=""
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
          <CarouselWrap>
            <CarouselBtn type="left" />
            <CarouselList>
              <CarouselInner>
                <CarouselItem>
                  <Card />
                </CarouselItem>
                <CarouselItem>
                  <Card />
                </CarouselItem>
              </CarouselInner>
            </CarouselList>
            <CarouselBtn type="right" />
          </CarouselWrap>
        </TabContent>
      </ContentInner>
    </article>
  );
}

const ContentInner = styled.div`
  width: 1200px;
  max-width: 1200px;
  margin: 0 auto;
`;

const H3 = styled.h3`
  margin-bottom: 40px;
  font-size: ${props => props.theme.fontSize.h3};
  font-weight: 500;
`;

const TabList = styled.ul`
  margin-bottom: 40px;
  font-weight: 500;
  & li:first-child {
    margin-left: 0;
  }
`;

const TabBtn = styled.li.attrs(props => ({ className: props.className }))`
  display: inline-block;
  padding: 15px 20px;
  margin: 0 10px;
  font-size: ${props => props.theme.fontSize.h4};
  color: ${props => props.theme.defaultInput};
  border: 1px solid ${props => props.theme.lightGray};
  border-radius: 50px;
  cursor: pointer;
  &.active {
    color: ${props => props.theme.point};
    border: 1px solid ${props => props.theme.point};
  }
`;
const TabContent = styled.section`
  display: flex;
  justify-content: space-between;
`;
const ImgLink = styled.a`
  display: block;
  width: 346px;
  overflow: hidden;
  color: inherit;
  text-decoration: none;
`;
const ImgBox = styled.figure`
  width: 100%;
  background: #f4f4f4;
  & img {
    height: 255px;
  }
  & figcaption {
    padding: 20px 20px 35px 20px;
    background: #000;
  }
`;
const ImgCaption = styled.figcaption`
  color: ${props => props.theme.defaultInput};
  & strong {
    display: inline-block;
    margin-bottom: 20px;
    color: ${props => props.theme.white};
    font-size: ${props => props.theme.fontSize.h4};
  }
`;
const CarouselWrap = styled.div`
  display: flex;
  width: calc(100% - 371px);
  height: 323px;
`;
const CarouselList = styled.div`
  position: relative;
  width: 100%;

  background: red;
`;
const CarouselInner = styled.div`
  position: absolute;
  display: flex;
`;
const CarouselItem = styled.div`
  background: #fff;
`;
export default TabCarousel;
