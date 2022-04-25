import styled from 'styled-components';

const Option = styled.option`
  font-size: 13px;
`;

const LocationListOption = props => {
  return (
    <Option onClick={() => props.filterProduct(props.category)}>
      {props.item}
    </Option>
  );
};

export default LocationListOption;
