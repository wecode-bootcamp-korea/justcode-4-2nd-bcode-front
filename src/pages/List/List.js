import styled from 'styled-components';
import LocationListOption from './components/LocationListOption';
import CategoryNavList from './components/CategoryNavList';
import Card from '../../components/Card/Card';
import { BiChevronRight } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 30px;
`;
const LocationList = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;
const LocationTitle = styled.h1`
  margin-right: 10px;
  font-size: 13px;
`;
const Select = styled.select`
  margin-left: 10px;
  border: none;
`;

const CategoryNav = styled.div``;
const CategoryNavTable = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  @media only screen and (max-width: 375px) {
    display: flex;
    justify-content: center;
  }
`;

const Title = styled.h1`
  margin-bottom: 50px;
  font-size: 24px;
  font-weight: bold;
`;

const SortNav = styled.div`
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  margin: 50px 0;
  padding-bottom: 30px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  @media only screen and (max-width: 1250px) {
    max-width: 1000px;
  }
  @media only screen and (max-width: 820px) {
    max-width: 520px;
  }
`;
const Total = styled.span``;
const SortListWrapper = styled.div``;

const SortList = styled.span`
  margin-left: 10px;
  color: #999;
  cursor: pointer;
  &:hover {
    color: #ee2d7a;
  }
  ${({ active }) => active && `color: black;`}
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 100px;
  @media only screen and (max-width: 820px) {
    margin-left: 20px;
  }
  @media only screen and (max-width: 375px) {
    row-gap: 50px;
    flex-wrap: nowrap;
    flex-direction: column;
  }
`;
const types = ['평점순', '낮은가격순', '높은가격순'];

const List = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [active, setActive] = useState(types[0]);
  // const { id } = useParams();

  // 카테고리 별 상품 받아오기

  // useEffect(() => {
  //   fetch(`http://localhost:8000/category?id=${id}`, { method: 'GET' })
  //     .then(res => res.json())
  //     .then(data => {
  //       setCategoryData(data);
  //     });
  // }, []);

  // 카테고리 리스트 받아오기

  // useEffect(() => {
  //   fetch(`http://localhost:8000/category`, { method: 'GET' })
  //     .then(res => res.json())
  //     .then(data => {
  //       setCategoryList(data);
  //     });
  // }, []);

  // const sortedReviews = [...categoryData.sort((a, b) => b.rating - a.rating)];
  // const sortedLowPrice = [
  //   ...categoryData.sort((a, b) => a.price_after - b.price_after),
  // ];
  // const sortedHighPrice = [
  //   ...categoryData.sort((a, b) => b.price_before - a.price_before),
  // ];

  // Mock Data fetch (104 ~ 126)  추후 삭제
  useEffect(() => {
    fetch('data/sample2.json', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        setData(data);
        setFilterData(data);
      });
  }, []);

  useEffect(() => {
    fetch('data/category.json', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        setCategoryData(data);
      });
  }, []);
  console.log(categoryData);
  const filterProduct = cat => {
    const result = filterData.filter(props => {
      return props.category === cat;
    });
    setData(result);
  };

  const itemAmount = categoryData.length;

  return (
    <Container>
      <LocationList>
        <LocationTitle>홈</LocationTitle>
        <BiChevronRight style={{ color: 'gray' }} />
        <Select>
          {categoryData.map(item => {
            return (
              <LocationListOption
                key={item.id}
                item={item.name}
                filterProduct={filterProduct}
              />
            );
          })}
        </Select>
      </LocationList>
      <CategoryNav>
        <Title>카테고리</Title>
        <CategoryNavTable>
          {categoryData.map(item => {
            return (
              <CategoryNavList
                key={item.id}
                item={item.name}
                filterProduct={filterProduct}
                active={active === item.name}
                onClick={() => setActive(item.name)}
              />
            );
          })}
        </CategoryNavTable>
      </CategoryNav>
      <SortNav>
        <Total>총 ({itemAmount})개</Total>
        <SortListWrapper>
          <SortList
            className="review"
            active={active === types[0]}
            onClick={() => setActive(types[0])}
          >
            평점순
          </SortList>
          <SortList>|</SortList>
          <SortList
            className="low"
            active={active === types[1]}
            onClick={() => setActive(types[1])}
          >
            낮은가격순
          </SortList>
          <SortList>|</SortList>
          <SortList
            className="high"
            active={active === types[2]}
            onClick={() => setActive(types[2])}
          >
            높은가격순
          </SortList>
        </SortListWrapper>
      </SortNav>
      <ProductList>
        {data.map(item => {
          return <Card key={item.id} item={item} />;
        })}
      </ProductList>
    </Container>
  );
};

export default List;
