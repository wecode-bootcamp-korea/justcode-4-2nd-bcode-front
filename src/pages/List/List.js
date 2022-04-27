import styled from 'styled-components';
import SelectList from './components/SelectList';
import CategoryList from './components/CategoryList';
import Card from '../../components/Card/Card';
import { BiChevronRight } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const List = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [active, setActive] = useState(types[0]);
  // const [active1, setActive1] = useState(categoryTypes[0]);

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
      });
    console.log(categoryData);
    fetch('http://localhost:8000/category', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        setCategoryList(data);
      });
  }, [categoryId]);

  const reviewTop = () => {
    const sortedReviews = [categoryData.sort((a, b) => b.rating - a.rating)];
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
  // const link = `list/${categoryId}`;

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
          {categoryList.map(item => {
            return (
              <SelectList key={item.id} index={item.id} item={item.name} />
            );
          })}
        </Select>
      </Location>
      <CategoryNav>
        <Title>카테고리</Title>
        <CategoryListWrapper>
          {categoryList.map((item, index) => {
            return (
              <CategoryList key={item.id} index={item.id} item={item.name} />
            );
          })}
        </CategoryListWrapper>
      </CategoryNav>
      <SortNav>
        <Total>총 {itemAmount}개</Total>
        <SortListWrapper>
          <SortList
            active={active === types[0]}
            onClick={() => {
              setActive(types[0]);
              reviewTop();
            }}
          >
            평점순
          </SortList>
          <span>|</span>
          <SortList
            active={active === types[1]}
            onClick={() => {
              setActive(types[1]);
              priceLow();
            }}
          >
            낮은가격순
          </SortList>
          <span>|</span>
          <SortList
            active={active === types[2]}
            onClick={() => {
              setActive(types[2]);
              priceTop();
            }}
          >
            높은가격순
          </SortList>
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
  @media only screen and (min-width: 820px) and (max-width: 1400px) {
    padding: 30px;
  }
  @media only screen and (max-width: 820px) {
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

// const CategoryLink = styled(Link)`
//   width: 200px
//   text-decoration: none;
//   color: inherit;
// `;

// const CaList = styled.li`
//   list-style: none;
//   padding: 15px;
//   border: 1px solid lightgray;

//   &:hover {
//     color: #f0427d;
//     cursor: pointer;
//   }
//   ${({ active1 }) => active1 && `border-color: #f0427d; color: #f0427d;`}
// `;

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
// 수정 필요
const SortList = styled.span`
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
