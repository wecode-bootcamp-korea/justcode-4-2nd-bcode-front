import styled from 'styled-components';

const Container = styled.div``;
const SearchHeader = styled.div`
  padding: 30px 0;
`;

const SearchResult = () => {
  return (
    <Container>
      <SearchHeader>'마스크'에 대한 검색 결과입니다.</SearchHeader>
    </Container>
  );
};

export default SearchResult;
