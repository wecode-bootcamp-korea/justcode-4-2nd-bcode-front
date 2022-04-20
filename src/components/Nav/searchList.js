import styled, { css } from 'styled-components';
import { FiX } from 'react-icons/fi';
const now = new Date();
const todayMonth = now.getMonth() + 1;
const todayDate = now.getDate();

function SearchList(props) {
  return (
    <>
      <SearchitemList>
        <div className="searchitemday">
          {todayMonth}.{todayDate}
        </div>
        <div className="searchitemdata">{props.item}</div>
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
  }
  .fixIcon {
    padding: 5px;
    cursor: pointer;
  }
`;
export default SearchList;
