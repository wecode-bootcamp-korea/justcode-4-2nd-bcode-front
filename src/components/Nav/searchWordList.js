import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';

function SearchWordList(props) {
  const navigate = useNavigate();

  const goToSearchPage = item => {
    navigate(`/search?${item}`);
    window.location.reload();
  };

  return (
    <SearchWord onClick={goToSearchPage(props.name)}>{props.name}</SearchWord>
  );
}

const SearchWord = styled.li`
  padding: 10px;
  color: #707070;
  font-size: 14px;
`;
export default SearchWordList;
