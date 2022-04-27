import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CategoryList = props => {
  const [active, setActive] = useState('');
  const navigate = useNavigate();

  const showItems = () => {
    navigate(`/list/${props.index}`);
  };
  return (
    <List
      value={props.index}
      active={active === props.item}
      onClick={() => {
        setActive(props.item);
        showItems();
      }}
    >
      {props.item}
    </List>
  );
};

const List = styled.li`
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
  ${({ active }) => active && `color: blue; border-color:blue;`}
`;

export default CategoryList;
