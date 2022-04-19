import styled from 'styled-components';
import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { VscCheck } from 'react-icons/vsc';
import { BiChevronUp, BiChevronDown, BiChevronRight } from 'react-icons/bi';

function InputChkBox(props) {
  return (
    <InputBox>
      <input id={props.id} type={props.type} defaultChecked={props.isCheck} />
      <p className="chk-box">
        <VscCheck />
      </p>
      <label htmlFor={props.id}>{props.message}</label>
    </InputBox>
  );
}

function Signup() {
  const [display, toggleDisplay] = useReducer(
    val => (val === 'block' ? 'none' : 'block'),
    'block'
  );

  return (
    <div>
      <WrapSignUp>
        <SignUpHead>
          <H2>
            <strong className="title">
              뷰티풀코드 통합멤버십
              <br /> 회원가입을 환영합니다!
            </strong>
          </H2>
        </SignUpHead>

        <form>
          <Input type="text" placeholder="이름(실명을 입력해주세요.)" />
          <Input type="email" placeholder="이메일을 입력해주세요." />
          <PwSelectBox>
            <InputChkBox
              type="radio"
              id="pwCustom"
              isCheck="checked"
              message="비밀번호 직접입력"
            />

            <InputChkBox
              id="pwAuto"
              type="radio"
              isCheck=""
              message="비밀번호 자동발급"
            />
          </PwSelectBox>

          <Input
            type="password"
            placeholder="비밀번호는 8자 이상으로 영문과 숫자, 특수문자를 최소 1자씩 포함해주세요."
          />
          <Input type="password" placeholder="비밀번호 확인" />
          <AllAgreeBox>
            <AllAgree>
              <InputChkBox
                id="allAgree"
                type="checkbox"
                isCheck=""
                message="모든 약관 동의"
              />
              <b onClick={toggleDisplay}>
                {display === 'block' ? (
                  <BiChevronDown size={25} />
                ) : (
                  <BiChevronUp size={25} />
                )}
              </b>
            </AllAgree>
            <AllAgreeCnt style={{ display }}>
              <small>
                아래 모든 약관 (필수/선택 포함) 및 광고성 정보수신 동의 내용을
                확인하고 전체 동의합니다. ※ 선택 항목에 대한 동의를 거부하더라도
                회원가입에 영향을 미치지 않습니다.
              </small>
              <p>뷰티풀코드 통합 멤버십 뷰티포인트 회원약관</p>
              <InputBoxWrap>
                <InputChkBox
                  id="agree1"
                  type="checkbox"
                  isCheck=""
                  message="[필수] 뷰티포인트 서비스 이용약관"
                />
                <b>
                  <BiChevronRight size={25} />
                </b>
              </InputBoxWrap>
              <InputBoxWrap>
                <InputChkBox
                  id="agree2"
                  type="checkbox"
                  isCheck=""
                  message="[선택] 개인정보 제3자 제공 동의"
                />
                <b>
                  <BiChevronRight size={25} />
                </b>
              </InputBoxWrap>
              <p>
                광고성 정보 수신 동의
                <span>쇼핑 혜택, 이벤트 소식을 받아보세요</span>
              </p>

              <InputBoxWrap>
                <InputChkBox
                  id="agree3"
                  type="checkbox"
                  isCheck=""
                  message="[선택] 뷰티포인트 문자 수신 동의"
                />
                <b>
                  <BiChevronRight size={25} />
                </b>
              </InputBoxWrap>
            </AllAgreeCnt>
          </AllAgreeBox>
          <Button>회원가입</Button>
        </form>
      </WrapSignUp>
    </div>
  );
}
const theme = {
  text: '#333',
  point: '#f0427d',
  white: '#fff',
  defaultInput: '#929292',
  alert: '#ff0000',
  btnDefault: '#555',
};

const fontSize = {
  default: '16px',
  small: '14px',
  h6: '15px',
  h5: '18px',
  h4: '20px',
  h2: '30px',
};
const WrapSignUp = styled.div`
  max-width: 480px;
  min-width: 375px;
  margin: 0 auto 50px;
`;
const SignUpHead = styled.div`
  padding: 50px 0 30px;
`;
const H2 = styled.h2`
  font-size: ${fontSize.h2};
  line-height: 1.5;
  .title {
    font-weight: bold;
  }
`;
const PwSelectBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0 10px;
`;
const InputBoxWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
  & b {
    color: #dadada;
    cursor: pointer;
  }
`;
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
      background: ${theme.white};
      color: ${theme.point};
      border: 1px solid ${theme.point};
    }
    &:checked ~ label {
      color: ${theme.point};
    }
  }
  & .chk-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 25px;
    height: 25px;
    background: ${theme.white};
    color: ${theme.white};
    border: 1px solid ${theme.defaultInput};
    border-radius: 50%;
    text-align: center;
    font-size: ${fontSize.h5};
    line-height: 1.5;
  }
  & label {
    margin-left: 35px;
    color: ${theme.text};
    line-height: 1.4;
    cursor: pointer;
  }
`;
const Input = styled.input`
  width: 100%;
  margin: 10px 0;
  padding: 15px;
  border: 1px solid #dadada;
  border-radius: 0;

  font-size: 1rem;
  outline: none;
  transition: all 0.3s;
  :: placeholder {
    color: ${theme.defaultInput};
  }
  &: focus {
    box-shadow: 0 0 10px rgb(0, 0, 0, 0.14);
  }
`;
const AllAgreeBox = styled.div`
  margin: 30px 0;
`;
const AllAgree = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border: 1px solid #dadada;
  & label,
  p,
  b {
    color: ${theme.point};
    cursor: pointer;
  }

  & p {
    width: 10%;
    text-align: right;
  }
`;
const AllAgreeCnt = styled.div`
  & small {
    display: inline-block;
    margin: 10px 10px 30px;

    color: ${theme.defaultInput};
    font-size: ${fontSize.small};
    letter-spacing: 1px;
    line-height: 1.2;
  }
  & p {
    margin-bottom: 10px;
    color: ${theme.text};
    font-size: ${fontSize.h6};
    font-weight: 600;
  }
  & span {
    margin-left: 10px;
    font-size: ${fontSize.small};
    color: ${theme.defaultInput};
  }
`;
const Button = styled.button`
  width: 100%;
  padding: 20px;
  background: ${theme.btnDefault};
  font-size: ${fontSize.h4};
  border: none;
  outline: none;
  text-align: center;
  color: ${theme.white};
  cursor: pointer;
`;

export { InputChkBox };
export default Signup;
