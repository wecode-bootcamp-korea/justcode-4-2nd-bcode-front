import styled from 'styled-components';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

function CarouselBtn(props) {
  return (
    <BtnWrap>
      <Btn>
        {props.type === 'left' ? (
          <FiChevronLeft
            style={{ strokeWidth: '1', marginLeft: '-3px', fontSize: '2rem' }}
          />
        ) : (
          <FiChevronRight
            style={{ strokeWidth: '1', marginLeft: '3px', fontSize: '2rem' }}
          />
        )}
      </Btn>
    </BtnWrap>
  );
}

const BtnWrap = styled.span`
  display: flex;
  align-items: center;
  width: 45px;
`;

const Btn = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid ${props => props.theme.defaultInput};
  border-radius: 50px;
  color: ${props => props.theme.defaultInput};
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background: rgba(255, 255, 255, 1);
    border-color: ${props => props.theme.point};
    color: ${props => props.theme.point};
  }
`;
export { CarouselBtn };
