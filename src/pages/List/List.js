import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';
import styled from 'styled-components';
import { BiChevronRight } from 'react-icons/bi';

const BigContainer = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
`;

const Container = styled.div`
  max-width: 1200px;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 13px;
  color: #999999;
  & span {
    display: flex;
    align-items: center;
    margin-right: 5px;
  }
  & span:first-child:hover {
    cursor: pointer;
  }
  & select {
    border: none;
    color: #999999;
    padding-right: 10px;
  }
`;

const Cateogory = styled.h1`
  margin-top: 50px;
  font-size: 24px;
  font-weight: bold;
  text-align: left;
`;

const Table = styled.ul`
  margin-top: 40px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  & li {
    width: 19.8%;
    padding: 15px 0;
    border: 1px solid #999999;
    border-collapse: collapse;
  }
  :hover {
    color: #ee2d7a;
    border-color: #ee2d7a;
  }
  & a {
    margin-left: 10px;
    text-decoration: none;
    color: inherit;
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 300px 300px 300px;
  row-gap: 60px;
  width: 100%;
  margin-top: 100px;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  border-bottom: 1px solid #eee;
  padding-bottom: 30px;
  font-size: 14px;
  color: #000;
  & ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  & li {
    margin: 0 10px;
    color: #999;
  }
`;

function Main() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);

  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch('data/sample2.json');
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
      }
      return () => {
        componentMounted = false;
      };
    };
    getProducts();
  }, []);

  const filterProduct = cat => {
    const updatedList = data.filter(item => item.brands.name === cat);
    setFilter(updatedList);
  };

  const Loading = () => {
    return <>Loading...</>;
  };
  const navigate = useNavigate();
  const goToMain = () => {
    navigate('/detail');
  };

  const discount = Math.round((1 - data.price_after / data.price_before) * 100);
  const dataAmount = data.length;
  return (
    <div>
      <BigContainer>
        <Location>
          <span onClick={goToMain}>홈</span>
          <span>
            <BiChevronRight />
          </span>
          <select>
            <option>마스크</option>
            <option>선크림</option>
            <option>미스트</option>
            <option>선크림</option>
            <option>미스트</option>
            <option>선크림</option>
            <option>미스트</option>
          </select>
        </Location>

        <Container>
          <Cateogory>카테고리</Cateogory>
          <Table>
            <li>
              <Link onClick={() => filterProduct('아이소페')} to="#">
                아이소페
              </Link>
            </li>
            <li>
              <Link onClick={() => filterProduct('한슐')} to="#">
                한슐
              </Link>
            </li>
            <li>
              <Link onClick={() => filterProduct('스데티')} to="#">
                스데티
              </Link>
            </li>
            <li>
              <Link onClick={() => filterProduct('마몰드')} to="#">
                마몰드
              </Link>
            </li>
            <li>
              <Link onClick={() => filterProduct('헤루')} to="#">
                헤루
              </Link>
            </li>
            <li>
              <Link onClick={() => filterProduct('니네즈')} to="#">
                니네즈
              </Link>
            </li>
            <li>
              <Link onClick={() => filterProduct('카이스')} to="#">
                카이스
              </Link>
            </li>
            <li>
              <Link onClick={() => filterProduct('데이프')} to="#">
                데이프
              </Link>
            </li>
            <li>
              <Link onClick={() => filterProduct('려스')} to="#">
                려스
              </Link>
            </li>
            <li>
              <Link onClick={() => filterProduct('려스')} to="#">
                려스
              </Link>
            </li>
          </Table>
        </Container>
        <NavBar>
          <span>총 {dataAmount}개</span>
          <ul>
            <li>평점순</li>|<li>낮은가격순</li>|<li>높은가격순</li>
          </ul>
        </NavBar>
        <Wrapper>
          {filter.map(product => (
            <Card
              key={product.id}
              brand={product.brands.name}
              name={product.name}
              price_before={product.price_before}
              price_after={product.price_after}
              rate={product.rate}
              image_url={product.image_url}
              discount={discount}
            />
          ))}
        </Wrapper>
        <div>{loading ? <Loading /> : null}</div>
      </BigContainer>
    </div>
  );
}

export default Main;
