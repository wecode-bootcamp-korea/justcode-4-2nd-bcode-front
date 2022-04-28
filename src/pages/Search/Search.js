import styled from 'styled-components';
import SearchData from './components/SearchData';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Search = () => {
  const [searchData, setSearchData] = useState([]);
  let urlName = decodeURI(window.location.search);
  urlName = urlName.substr(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/product/search?name=${urlName}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setSearchData(data);
      });
  }, []);

  const itemAmount = searchData.length;
  return (
    <Container>
      <Header>
        <span className="search">'{urlName}'</span>
        {itemAmount === 0 ? (
          <span>에 대한 검색 결과가 없습니다..</span>
        ) : (
          <span>에 대한 검색 결과입니다.</span>
        )}
      </Header>
      <SearchData data={searchData} />
      {itemAmount === 0 ? (
        <ImgContainer>
          <Img src="/image/logo.svg" />
        </ImgContainer>
      ) : (
        ''
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 30px 0;
`;
const Header = styled.div`
  text-align: center;
  padding: 40px 0;
  background-color: #eee;
  font-size: 30px;
  & .search {
    color: #ee2d7a;
  }
`;
const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 500px;
  height: 700px;
  margin: auto;
  opacity: 0.16;
`;
const Img = styled.img`
  width: 100%;
`;

export default Search;
