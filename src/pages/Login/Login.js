import styled from 'styled-components';

import { RiKakaoTalkFill } from 'react-icons/ri';

function Login() {
  return (
    <LoginWrap>
      <LoginOutBox>
        <LoginInBox>
          <H2>로그인</H2>
          <LoginArea>
            <form>
              <EmailInput placeholder="아이디 입력" />
              <PwInput placeholder="비밀번호 입력" />
            </form>
            <InlineBox>
              <InlineLinkList>
                <li>
                  <InlineLink to="#">아이디 찾기</InlineLink>
                </li>
                <li>
                  <InlineLink to="#"> 비밀번호 찾기</InlineLink>
                </li>
                <li>
                  <InlineLink to="">회원가입</InlineLink>
                </li>
              </InlineLinkList>
            </InlineBox>
            <LoginButton>로그인</LoginButton>
            <KaKaoLogin>
              <span>
                <RiKakaoTalkFill size="2.1rem " />
              </span>
              <span>카카오계정으로 로그인</span>
            </KaKaoLogin>
          </LoginArea>
        </LoginInBox>
      </LoginOutBox>
    </LoginWrap>
  );
}
const LoginWrap = styled.div`
  padding: 150px 0;
  & ::selection {
    background-color: #222;
    color: ${props => props.theme.point};
  }
  & ::-webkit-selection {
    background-color: #222;
    color: ${props => props.theme.point};
  }
  & ::-moz-selection {
    background-color: #222;
    color: ${props => props.theme.point};
  }
  @media only screen and (max-width: 414px) {
    padding: 60px 0;
  } ;
`;
const LoginOutBox = styled.div`
  max-width: 1200px;
  width: 60%;
  margin: 0 auto;
  background: #f4f4f4;
  border: 1px solid #eee;
  @media only screen and (max-width: 1024px) {
    width: 80%;
  } ;
`;
const LoginInBox = styled.div`
  padding: 5rem;
  @media only screen and (max-width: 414px) {
    padding: 2rem;
  } ;
`;

const LoginArea = styled.div`
  width: 60%;
  margin: 0 auto;
  @media only screen and (max-width: 1024px) {
    width: 100%;
  } ;
`;
const H2 = styled.h2`
  margin-bottom: 40px;
  font-size: ${props => props.theme.fontSize.h2};
  font-weight: 200;
  text-align: center;
  color: ${props => props.theme.text};
`;

const EmailInput = styled.input`
  display: block;
  width: 100%;
  height: 60px;
  padding: 0 15px;
  margin-bottom: 20px;
  border: none;
  border-radius: 0;
  outline: none;
  color: ${props => props.theme.defaultInput};
  &::placeholder {
    color: #ccc;
  }
  &:focus {
    color: ${props => props.theme.text};
  }
`;

const PwInput = styled(EmailInput).attrs({ type: 'password' })`
  &::placeholder {
    letter-spacing: 0px;
  }
  letter-spacing: 5px;
`;

const InlineBox = styled.div`
  display: flex;
  justify-content: end;
  @media only screen and (max-width: 414px) {
    justify-content: center;
  } ;
`;

const InlineLinkList = styled.ul`
  & li {
    display: inline-block;
  }
  & li:first-child {
    & a {
      &:before {
        display: none;
      }
    }
  }
`;
const InlineLink = styled.a`
  display: block;
  font-size: ${props => props.theme.fontSize.small};
  color: ${props => props.theme.defaultInput};
  cursor: pointer;
  transition: all 0.3s;
  &:before {
    content: '';
    display: inline-block;
    width: 1px;
    height: 12px;
    margin: 0 10px;
    background-color: #ddd;
    vertical-align: bottom;
  }
  &:hover {
    color: ${props => props.theme.point};
  }
`;
const LoginButton = styled.button`
  display: block;
  width: 100%;
  height: 60px;
  margin-top: 20px;
  background: ${props => props.theme.point};
  color: ${props => props.theme.white};
  font-size: ${props => props.theme.fontSize.h5};
  text-align: center;
  border: none;
  outline: none;
  cursor: pointer;
`;

const KaKaoLogin = styled(LoginButton)`
  display: flex;
  align-items: center;
  background: #ffe32c;
  color: #3c1e1e;

  & span:first-child {
    flex-shrink: 0;
    width: 100px;
    @media only screen and (max-width: 414px) {
      display: none;
    }
  }
  & span:last-child {
    margin-left: 50px;
    @media only screen and (max-width: 1024px) {
      flex-grow: 1;
      margin-left: -80px;
    }
    @media only screen and (max-width: 414px) {
      flex-grow: 1;
      margin: 0;
    }
  }
`;
export default Login;
