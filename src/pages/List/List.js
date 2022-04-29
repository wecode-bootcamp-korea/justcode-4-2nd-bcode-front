import styled from 'styled-components';
import OptionItem from './components/OptionItem';
import CategoryItem from './components/CategoryItem';
import Card from '../../components/Card/Card';
import { BiChevronRight } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';

const List = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [categoryItem, setCategoryItem] = useState([]);
  const [active, setActive] = useState(types[0]);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const categoryId = params.list_id;

  const navigate = useNavigate();

  const goToMain = () => {
    navigate('/');
  };

  const goToList = e => {
    navigate(`/list/${e.target.value}`);
  };

  useEffect(() => {
    fetch(`http://localhost:8000/category/${categoryId}`, { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        setCategoryData(data);
        setLoading(false);
      });
    fetch('http://localhost:8000/category', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        setCategoryItem(data);
        setLoading(false);
      });
  }, [categoryId]);

  const itemAmount = categoryData.length;

  const reviewTop = () => {
    const sortedReviews = [
      ...categoryData.sort((a, b) => b.ratingAvg - a.ratingAvg),
    ];
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
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
            <CategoryListWrapper onClick={goToList}>
              {categoryItem.map(item => {
                return (
                  <CategoryItem
                    key={item.id}
                    index={item.id}
                    item={item.name}
                    active={active === item.id}
                    categoryId={categoryId}
                  />
                );
              })}
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
      )}
    </>
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
