import styled from 'styled-components';

const SortNav = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 50px 0;
  padding-bottom: 30px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
`;
const Total = styled.span``;
const SortListWrapper = styled.div``;
const SortList = styled.span`
  margin-left: 10px;
  color: #999;
  cursor: pointer;
  &:hover {
    color: #f0427d;
  }
  &::selection {
    color: #000;
  }
`;

const SortNavigation = () => {
  return (
    <SortNav>
      <Total>총 개</Total>
      <SortListWrapper>
        <SortList>평점순</SortList>
        <SortList>|</SortList>
        <SortList>낮은가격순</SortList>
        <SortList>|</SortList>
        <SortList>높은가격순</SortList>
      </SortListWrapper>
    </SortNav>
  );
};

export default SortNavigation;
