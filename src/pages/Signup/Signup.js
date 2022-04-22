import styled from 'styled-components';
import { useReducer, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import InputChkBox from './InputChkBox';
import { BiChevronUp, BiChevronDown, BiChevronRight } from 'react-icons/bi';

function Signup() {
  //토글 바 함수
  const [display, toggleDisplay] = useReducer(
    val => (val === 'block' ? 'none' : 'block'),
    'block'
  );
  //useRef
  const inputRef = useRef(null);
  //navigate
  const navigate = useNavigate();
  //validation
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({ mode: 'onChange' });
  //post
  const onSubmit = data => {
    console.log(data);
    fetch(`http://localhost:8000/user/signup`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
    })
      .then(res => res.json())
      .then(() => {
        alert(`회원가입 완료! 로그인 후 이용해주세요.`);
        navigate('../login');
      });
  };

  const onError = errors => console.log(errors);

  //체크박스 관련 함수
  const [totalCheck, setTotalCheck] = useState(false);
  const [checkList, setCheckList] = useState(Array(3).fill(false));

  //전체 체크 클릭 시 발생
  const allCheck = () => {
    // console.log(`checkList : ${checkList}`);
    setCheckList(Array(checkList.length).fill(!totalCheck));
    setTotalCheck(!totalCheck);
    // console.log(`totalCheck : ${totalCheck}`);
  };
  //개별 체크 클릭 시 발생함수
  const singleCheck = index => {
    setCheckList(prev => {
      // console.log(`prev:${prev}`);
      const array = [...prev];

      // console.log(array[index], !array[index]);
      array[index] = !array[index];

      return array;
    });
  };
  useEffect(() => {
    if (checkList.includes(false)) {
      setTotalCheck(false);
    } else {
      setTotalCheck(true);
    }
  }, [checkList]);
  return (
    <WrapSignUp>
      <SignUpHead>
        <H2>
          <strong className="title">
            뷰티풀코드 통합멤버십
            <br /> 회원가입을 환영합니다!
          </strong>
        </H2>
      </SignUpHead>

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        {errors.username && errors.username?.type === 'required' && (
          <AlertMessage>이름을 입력하세요.</AlertMessage>
        )}
        {errors.username && errors.username?.type === 'minLength' && (
          <AlertMessage>{errors.username.message}</AlertMessage>
        )}

        <Input
          type="text"
          placeholder="이름(실명을 입력해주세요.)"
          aria-invalid={errors.username ? '#ff0000' : '#dadada'}
          {...register('username', {
            required: true,
            minLength: { value: 2, message: '이름은 2자 이상이어야 합니다.' },
          })}
        />
        {errors.email && errors.email?.type === 'required' && (
          <AlertMessage>이메일을 입력하세요.</AlertMessage>
        )}
        {errors.email && errors.email?.type === 'pattern' && (
          <AlertMessage>@를 포함한 주소를 적어주세요.</AlertMessage>
        )}
        <Input
          type="text"
          placeholder="이메일을 입력해주세요."
          aria-invalid={errors.email ? '#ff0000' : '#dadada'}
          {...register('email', {
            required: true,
            pattern: /@/,
          })}
        />
        <PwSelectBox>
          <InputChkBox
            type="radio"
            id="pwCustom"
            isCheck="true"
            message="비밀번호 직접입력"
            name="pwRadio"
          />

          <InputChkBox
            fowardRef={inputRef}
            id="pwAuto"
            type="radio"
            isCheck=""
            message="비밀번호 자동발급"
            name="pwRadio"
          />
        </PwSelectBox>
        <PwSelectCnt>
          {errors.password && errors.password?.type === 'required' && (
            <AlertMessage>패스워드를 입력하세요.</AlertMessage>
          )}
          {errors.password && errors.password?.type === 'pattern' && (
            <AlertMessage>
              비밀번호는 8자 이상으로 숫자와 문자를 최소 1자씩 포함해주세요.
            </AlertMessage>
          )}
          <Input
            type="password"
            placeholder="비밀번호는 8자 이상으로 숫자와 문자를 최소 1자씩 포함해주세요."
            aria-invalid={errors.password ? '#ff0000' : '#dadada'}
            disable="false"
            {...register('password', {
              required: true,
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            })}
          />
          {errors.passwordCheck &&
            errors.passwordCheck?.type === 'required' && (
              <AlertMessage>패스워드를 재입력하세요.</AlertMessage>
            )}
          {errors.passwordCheck &&
            errors.passwordCheck?.type === 'validate' && (
              <AlertMessage>입력한 패스워드와 다릅니다.</AlertMessage>
            )}
          <Input
            type="password"
            placeholder="비밀번호 확인"
            aria-invalid={errors.passwordCheck ? '#ff0000' : '#dadada'}
            {...register('passwordCheck', {
              required: true,
              validate: value => value === watch('password'),
            })}
          />
        </PwSelectCnt>
        <AllAgreeBox>
          <AllAgree>
            <InputChkBox
              id="allAgree"
              type="checkbox"
              isCheck={totalCheck}
              message="모든 약관 동의"
              event={() => {
                allCheck();
              }}
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
                isCheck={checkList[0]}
                message="[필수] 뷰티포인트 서비스 이용약관"
                event={() => {
                  singleCheck(0);
                }}
              />
              <b>
                <BiChevronRight size={25} />
              </b>
            </InputBoxWrap>
            <InputBoxWrap>
              <InputChkBox
                id="agree2"
                type="checkbox"
                isCheck={checkList[1]}
                message="[선택] 개인정보 제3자 제공 동의"
                event={() => {
                  singleCheck(1);
                }}
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
                isCheck={checkList[2]}
                message="[선택] 뷰티포인트 문자 수신 동의"
                event={() => {
                  singleCheck(2);
                }}
              />
              <b>
                <BiChevronRight size={25} />
              </b>
            </InputBoxWrap>
          </AllAgreeCnt>
        </AllAgreeBox>
        <Button type="submit" disabled={!isDirty || !isValid}>
          회원가입
        </Button>
      </form>
    </WrapSignUp>
  );
}

const WrapSignUp = styled.div`
  max-width:30%;
  min-width: 375px;
  margin: 0 auto 50px;
  @media only screen and (max-width: 375px) {
    padding:0 20px;
`;
const SignUpHead = styled.div`
  padding: 50px 0 30px;
`;
const H2 = styled.h2`
  font-size: ${props => props.theme.fontSize.h2};
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
const PwSelectCnt = styled.div`
  display: block;
`;
const InputBoxWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
  & b {
    color: ${props => props.theme.lightGray};
    cursor: pointer;
  }
`;
const Input = styled.input`
  width: 100%;
  margin: 10px 0;
  padding: 15px;
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props['aria-invalid']};
  border-radius: 0;

  font-size: 1rem;
  outline: none;
  transition: all 0.3s;
  :: placeholder {
    color: ${props => props.theme.defaultInput};
  }
  &: focus {
    box-shadow: 0 0 10px rgb(0, 0, 0, 0.14);
  }
`;
const AlertMessage = styled.span`
  margin-bottom: 5px;
  color: ${props => props.theme.alert};
  font-size: ${props => props.theme.fontSize.small};
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
    color: ${props => props.theme.point};
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

    color: ${props => props.theme.defaultInput};
    font-size: ${props => props.theme.fontSize.small};
    letter-spacing: 1px;
    line-height: 1.2;
  }
  & p {
    margin-bottom: 10px;
    color: ${props => props.theme.text};
    font-size: ${props => props.theme.fontSize.h6};
    font-weight: 600;
  }
  & span {
    margin-left: 10px;
    font-size: ${props => props.theme.fontSize.small};
    color: ${props => props.theme.defaultInput};
  }
`;
const Button = styled.button`
  width: 100%;
  padding: 20px;
  background: ${props => props.theme.btnDefault};
  font-size: ${props => props.theme.fontSize.h4};
  border: none;
  outline: none;
  text-align: center;
  color: ${props => props.theme.white};
  cursor: pointer;
  transition: all 0.3s;
  :disabled {
    opacity: 0.2;
  }
`;

export default Signup;
