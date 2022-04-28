import styled from 'styled-components';
import OptionItem from './components/OptionItem';
import Card from '../../components/Card/Card';
import { BiChevronRight } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const List = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [categoryItem, setCategoryItem] = useState([]);
  const [active, setActive] = useState(types[0]);
  const [isSelected, setIsSelected] = useState(0);

  const params = useParams();
  const categoryId = params.list_id;

  const navigate = useNavigate();

  const goToMain = () => {
    navigate('/');
  };

  const goToList = e => {
    navigate(`/list/${e.target.value}`);
    setIsSelected(e.target.value);
    setActive(false);
  };

  useEffect(() => {
    fetch(`http://localhost:8000/category/${categoryId}`, { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        setCategoryData(data);
      });
    fetch('http://localhost:8000/category', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        setCategoryItem(data);
      });
  }, [categoryId]);

  const reviewTop = () => {
    const sortedReviews = [...categoryData.sort((a, b) => b.rating - a.rating)];
    setCategoryData(sortedReviews);
  };

  const priceTop = () => {
    const sortedHighPrice = [
      ...categoryData.sort((a, b) => b.price_before - a.price_before),
    ];
    setCategoryData(sortedHighPrice);
  };

  const priceLow = () => {
    const sortedLowPrice = [
      ...categoryData.sort((a, b) => a.price_after - b.price_after),
    ];
    setCategoryData(sortedLowPrice);
  };

  const itemAmount = categoryData.length;

  return (
    <Container>
      <Location>
        <span className="home" onClick={goToMain}>
          홈
        </span>
        <span>
          <BiChevronRight style={{ color: 'gray' }} />
        </span>
        <Select onChange={goToList}>
          {categoryItem.map(item => {
            return (
              <OptionItem key={item.id} index={item.id} item={item.name} />
            );
          })}
        </Select>
      </Location>
      <CategoryNav>
        <Title>카테고리</Title>
        <CategoryListWrapper>
          <CategoryLink to="/list/1">
            <Item
              active={
                active === categoryTypes[0] ||
                isSelected === '1' ||
                categoryId === '1'
              }
              onClick={() => {
                setActive(categoryTypes[0]);
                setIsSelected(false);
              }}
            >
              기초
            </Item>
          </CategoryLink>
          <CategoryLink to="/list/2">
            <Item
              active={
                active === categoryTypes[1] ||
                isSelected === '2' ||
                categoryId === '2'
              }
              onClick={() => {
                setActive(categoryTypes[1]);
                setIsSelected(false);
              }}
            >
              메이크업
            </Item>
          </CategoryLink>
          <CategoryLink to="/list/3">
            <Item
              active={
                active === categoryTypes[2] ||
                isSelected === '3' ||
                categoryId === '3'
              }
              onClick={() => {
                setActive(categoryTypes[2]);
                setIsSelected(false);
              }}
            >
              바디케어
            </Item>
          </CategoryLink>
          <CategoryLink to="/list/4">
            <Item
              active={
                active === categoryTypes[3] ||
                isSelected === '4' ||
                categoryId === '4'
              }
              onClick={() => {
                setActive(categoryTypes[3]);
                setIsSelected(false);
              }}
            >
              미용소품
            </Item>
          </CategoryLink>
          <CategoryLink to="/list/5">
            <Item
              active={
                active === categoryTypes[4] ||
                isSelected === '5' ||
                categoryId === '5'
              }
              onClick={() => {
                setActive(categoryTypes[4]);
                setIsSelected(false);
              }}
            >
              건강식품
            </Item>
          </CategoryLink>
          <CategoryLink to="/list/6">
            <Item
              id="6"
              active={
                active === categoryTypes[5] ||
                isSelected === '6' ||
                categoryId === '6'
              }
              onClick={() => {
                setActive(categoryTypes[5]);
                setIsSelected(false);
              }}
            >
              클렌징
            </Item>
          </CategoryLink>
        </CategoryListWrapper>
      </CategoryNav>
      <SortNav>
        <Total>총 {itemAmount}개</Total>
        <SortListWrapper>
          <SortItem
            active={active === types[0]}
            onClick={() => {
              setActive(types[0]);
              reviewTop();
            }}
          >
            평점순
          </SortItem>
          <span>|</span>
          <SortItem
            active={active === types[1]}
            onClick={() => {
              setActive(types[1]);
              priceLow();
            }}
          >
            낮은가격순
          </SortItem>
          <span>|</span>
          <SortItem
            active={active === types[2]}
            onClick={() => {
              setActive(types[2]);
              priceTop();
            }}
          >
            높은가격순
          </SortItem>
        </SortListWrapper>
      </SortNav>
      <ProductList>
        {categoryData.map(item => {
          return <Card key={item.id} id={item.id} item={item} />;
        })}
      </ProductList>
    </Container>
  );
};

export default List;

const Container = styled.div`
  max-width: 1200px;
  padding: 50px 0px;
  margin: auto;
  flex-grow: 1;
  @media only screen and (max-width: 1400px) {
    max-width: 1000px;
    padding: 30px;
  }
  @media only screen and (max-width: 940px) {
    max-width: 650px;
    padding: 30px;
  }
  @media only screen and (max-width: 620px) {
    max-width: 450px;
    padding: 60px;
  }
`;
const Location = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  & .home {
    margin-right: 10px;
    font-size: ${props => props.theme.fontSize.small};
    cursor: pointer;
  }
`;
const Select = styled.select`
  margin-left: 10px;
  border: none;
  cursor: pointer;
`;

const CategoryNav = styled.div`
  width: 100%;
`;

const Title = styled.h1`
  margin-bottom: 50px;
  font-size: ${props => props.theme.fontSize.h3};
  font-weight: bold;
`;

const CategoryListWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const CategoryLink = styled(Link)`
  flex-grow: 1;
  width: 200px;
  text-decoration: none;
  color: inherit;
`;

const Item = styled.li`
  list-style: none;
  padding: 15px;
  border: 1px solid lightgray;
  text-align: center;

  &:hover {
    color: #f0427d;
    cursor: pointer;
  }
  ${({ active }) => active && `border-color: #f0427d; color: #f0427d;`}
`;

const SortNav = styled.div`
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 50px 0;
  padding-bottom: 30px;
  border-bottom: 1px solid ${props => props.theme.lightGray};
  font-size: ${props => props.theme.fontSize.small};
`;

const Total = styled.span`
  flex-shrink: 1;
  flex-grow: 1;
`;
const SortListWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-shrink: 1;
  flex-grow: 1;
  & span {
    margin: 0px 5px;
  }
`;

const SortItem = styled.span`
  color: #999999;
  cursor: pointer;
  &:hover {
    color: #ee2d7a;
  }
  ${({ active }) => active && `color: black;`}
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5em;
  flex-grow: 1;
  flex-shrink: 1;
`;
const types = ['평점순', '낮은가격순', '높은가격순'];
const categoryTypes = [
  '기초',
  '메이크업',
  '바디케어',
  '미용소품',
  '건강식품',
  '클렌징',
];
