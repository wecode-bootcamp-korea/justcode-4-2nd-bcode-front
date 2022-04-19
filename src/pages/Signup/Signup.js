import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div>
      <WrapSignUp>
        <H2>
          <strong>뷰티풀퍼시픽 통합 멤버십 회원이 되어보세요!</strong>
        </H2>
        <p>
          통합멤버십(뷰티포인트)에 가입하시면 아침부터 밤까지 코드만 짤 수
          있습니다.
        </p>
        <form>
          <Input type="text" placeholder="이름(실명을 입력해주세요.)" />

          <Input type="email" placeholder="이메일(user@example.com)" />
          <input type="radio" />
          <input type="radio" />
          <Input
            type="password"
            placeholder="비밀번호는 8자 이상으로 영문과 숫자, 특수문자를 최소 1자씩 포함해주세요."
          />
          <Input type="password" placeholder="비밀번호 확인" />
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
  h6: '15px',
  h5: '18px',
  h4: '20px',

  h2: '30px',
};
const WrapSignUp = styled.div`
  max-width: 500px;
  min-width: 375px;
  margin: 0 auto;
`;
const H2 = styled.h2`
  font-size: ${fontSize.h2};
`;
const Input = styled.input`
  font-size: 1rem;
  padding: 10px 15px;
  border: 1px solid ${theme.defaultInput};
  border-radius: 0;
  color: ${theme.defaultInput};
  outline: none;
`;

const Button = styled.button`
  padding: 20px;
  background: ${theme.btnDefault};
  font-size: ${fontSize.h4};
  border: none;
  outline: none;
  text-align: center;
  color: ${theme.white};
`;
export default Signup;
