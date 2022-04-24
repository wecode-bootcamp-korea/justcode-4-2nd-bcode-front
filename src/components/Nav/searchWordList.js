import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function SearchWordList(props) {
  const navigate = useNavigate();

  const goToSearchPage = () => {
    props.searchValue(props.name);
    // navigate(`/search?${props.name}`);
    //  window.location.reload();
  };

  return <SearchWord onClick={goToSearchPage}>{props.name}</SearchWord>;
}

const SearchWord = styled.li`
  padding: 10px;
  color: #707070;
  font-size: 14px;
  cursor: pointer;
`;
export default SearchWordList;
