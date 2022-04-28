import styled from 'styled-components';
import SelectList from '../../List/components/OptionItem';
import CategoryList from '../../List/components/CategoryItem';
import Card from '../../../components/Card/Card';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchData = () => {
  const [searchData, setSearchData] = useState();
  const [active, setActive] = useState(types[0]);
  const navigate = useNavigate();

  let urlName = decodeURI(window.location.search);
  urlName = urlName.substr(1);
  // console.log(urlName);

  useEffect(() => {
    fetch(`http://localhost:8000/product/search?name=${urlName}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setSearchData(data);
      });
  }, []);

  const goToMain = () => {
    navigate('/');
  };

  const goToList = e => {
    navigate(`/list/${e.target.value}`);
  };

  const reviewTop = () => {
    const sortedReviews = [searchData.sort((a, b) => b.rating - a.rating)];
    setSearchData(sortedReviews);
  };

  const priceTop = () => {
    const sortedHighPrice = [
      ...searchData.sort((a, b) => b.price_before - a.price_before),
    ];
    setSearchData(sortedHighPrice);
  };

  const priceLow = () => {
    const sortedLowPrice = [
      ...searchData.sort((a, b) => a.price_after - b.price_after),
    ];
    setSearchData(sortedLowPrice);
  };

  const itemAmount = searchData.length;

  return (
    <Container>
      <SortNav>
        <Total>총 {}개</Total>
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
        {searchData.map(item => {
          return <Card key={item.id} id={item.id} item={item} />;
        })}
      </ProductList>
    </Container>
  );
};
const Container = styled.div`
  max-width: 1200px;
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

export default SearchData;
