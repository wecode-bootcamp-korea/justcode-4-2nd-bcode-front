import styled from 'styled-components';
import { FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function SearchList(props) {
  const navigate = useNavigate();

  const goToSearchPage = () => {
    navigate(`/search?${props.item}`);
    window.location.reload();
  };

  return (
    <>
      <SearchitemList>
        <div className="searchitemday">{props.date}</div>
        <div className="searchitemdata" onClick={goToSearchPage}>
          {props.item}
        </div>
        <FiX
          className="fixIcon"
          onMouseDown={() => props.deletedata(props.id)}
        />
      </SearchitemList>
    </>
  );
}

const SearchitemList = styled.li`
  display: flex;
  align-items: center;
  padding-left: 20px;
  color: #b4b4b4;
  font-size: 14px;
  .searchitemday {
    padding: 10px;
  }
  .searchitemdata {
    padding: 5px;
    color: #747474;
    cursor: pointer;
  }
  .fixIcon {
    padding: 5px;
    font-size: 24px;
    cursor: pointer;
  }
`;
export default SearchList;
