import styled from 'styled-components';
import { VscCheck } from 'react-icons/vsc';

function InputChkBox(props) {
  return (
    <InputBox>
      <input
        id={props.id}
        type={props.type}
        defaultChecked={props.isCheck}
        name={props.name}
        disable={props.disable}
        onChange={props.event}
      />
      <p className="chk-box">
        <VscCheck />
      </p>
      <label htmlFor={props.id}>{props.message}</label>
    </InputBox>
  );
}

const InputBox = styled.label`
  display: flex;
  position: relative;

  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  & input {
    position: absolute;
    height: 0;
    width: 0;
    opacity: 0;
    cursor: pointer;
    &:checked + .chk-box {
      background: ${props => props.theme.white};
      color: ${props => props.theme.point};
      border: 1px solid ${props => props.theme.point};
    }
    &:checked ~ label {
      color: ${props => props.theme.point};
    }
  }
  & .chk-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 25px;
    height: 25px;
    background: ${props => props.theme.white};
    color: ${props => props.theme.white};
    border: 1px solid ${props => props.theme.defaultInput};
    border-radius: 50%;
    text-align: center;
    font-size: ${props => props.theme.fontSize.h5};
    line-height: 1.5;
  }
  & label {
    margin-left: 35px;
    color: ${props => props.theme.text};
    line-height: 1.4;
    cursor: pointer;
  }
`;
export default InputChkBox;
