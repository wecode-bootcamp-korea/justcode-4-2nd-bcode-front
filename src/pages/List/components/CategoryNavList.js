import styled from 'styled-components';
import { useEffect, useState } from 'react';

const CategoryNavList = props => {
  const [isClicked, setIsClicked] = useState(false);

  const List = styled.li`
    list-style: none;
    width: 16%;
    padding: 15px;
    border: 1px solid ${isClicked};
    @media only screen and (max-width: 820px) {
      width: 12.3%;
    }
    @media only screen and (max-width: 375px) {
      width: 25%;
      text-align: center;
      padding: 15px 35px;
    }

    &:hover {
      color: #f0427d;
      cursor: pointer;
    }
  `;

  const getClick = () => {
    setIsClicked(!isClicked);
  };

  return <List onClick={getClick}>{props.item}</List>;
};

export default CategoryNavList;
