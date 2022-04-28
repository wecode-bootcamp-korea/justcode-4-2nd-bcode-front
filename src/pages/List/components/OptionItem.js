import styled from 'styled-components';

const OptionItem = props => {
  const link = `list/${props.index}`;

  return <Option value={props.index}>{props.item}</Option>;
};

const Option = styled.option`
  font-size: 13px;
`;

export default OptionItem;
