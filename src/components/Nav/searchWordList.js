import styled, { css } from 'styled-components';

function SearchWordList(props) {
  return <SearchWord>{props.name}</SearchWord>;
}

const SearchWord = styled.li`
  padding: 10px;
  color: #707070;
  font-size: 14px;
`;
export default SearchWordList;
