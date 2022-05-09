import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CategoryItem = props => {
  const navigate = useNavigate();

  const showItems = () => {
    navigate(`/list/${props.index}`);
  };
  return (
    <Item
      value={props.index}
      active={props.active === true || props.index === Number(props.categoryId)}
      onClick={() => {
        showItems();
      }}
    >
      {props.item}
    </Item>
  );
};

const Item = styled.li`
  flex-shrink: 1;
  flex-grow: 1;
  width: 200px;
  padding: 15px 0px;
  border: 1px solid lightgray;
  text-align: center;
  list-style: none;
  &:hover {
    color: #f0427d;
    cursor: pointer;
  }
  ${({ active }) => active && `color: #f0427d; border-color:#f0427d;`}
`;

export default CategoryItem;
