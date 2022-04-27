import styled from 'styled-components';

const SelectList = props => {
  const link = `list/${props.index}`;

  return <Option value={props.index}>{props.item}</Option>;
};

const Option = styled.option`
  font-size: 13px;
`;

export default SelectList;
