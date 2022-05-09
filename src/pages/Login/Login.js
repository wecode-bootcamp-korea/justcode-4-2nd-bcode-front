import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { useForm } from 'react-hook-form';
import ModalPopup from '../../components/Modal/ModalPopup';
import { setCookie } from '../../cookie';

function Login() {
  // const [token, setToken] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const togglePopup = () => {
    setShowPopup(false);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    // console.log(data);
    fetch(`http://localhost:8000/user/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
      .then(res => {
        const resJson = res.json();
        if (res.status !== 200) {
          setShowPopup(true);
        }
        return resJson;
      })
      .then(json => {
        //console.log(json);
        if (json.jwt) {
          const newToken = json.jwt;
          const userName = json.username;
          // console.log(json);
          // setCookie('user_id', newToken, {
          //   path: '/',
          //   secure: true,
          //   sameSite: 'none',
          // });
          localStorage.setItem('userId', newToken);
          alert(`${userName}님, 환영합니다!`);
          navigate('../');
        }
      });
  };

  const onError = errors => console.log(errors);
  return (
    <LoginWrap>
      {showPopup && <ModalPopup event={togglePopup} />}
      <LoginOutBox>
        <LoginInBox>
          <H2>로그인</H2>
          <LoginArea>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <InputLabel>
                <EmailInput
                  type="text"
                  placeholder="아이디 입력"
                  {...register('email', { required: true })}
                />
                {errors.email?.type === 'required' && (
                  <InputAlert>이메일을 입력해주세요.</InputAlert>
                )}
              </InputLabel>
              <InputLabel>
                <PwInput
                  placeholder="비밀번호 입력"
                  {...register('password', { required: true })}
                />
                {errors.password?.type === 'required' && (
                  <InputAlert>비밀번호를 입력해주세요.</InputAlert>
                )}
              </InputLabel>

              <InlineBox>
                <InlineLinkList>
                  <li>
                    <InlineLink href="#">아이디 찾기</InlineLink>
                  </li>
                  <li>
                    <InlineLink href="#"> 비밀번호 찾기</InlineLink>
                  </li>
                  <li>
                    <InlineLink href="/signup">회원가입</InlineLink>
                  </li>
                </InlineLinkList>
              </InlineBox>
              <LoginButton type="submit">로그인</LoginButton>
            </form>
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
  background: #eaeaea;
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
  font-weight: 400;
  text-align: center;
  color: ${props => props.theme.text};
`;
const InputLabel = styled.label`
  display: block;
  margin-bottom: 20px;
`;
const EmailInput = styled.input`
  display: block;
  width: 100%;
  height: 60px;
  padding: 0 15px;
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
const InputAlert = styled.span`
  display: inline-block;
  padding: 10px 0 0;
  font-size: 13px;
  color: ${props => props.theme.point};
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
  text-decoration: none;
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
  opacity: 0.5;
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
