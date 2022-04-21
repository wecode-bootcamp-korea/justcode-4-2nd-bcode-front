import styled from 'styled-components';
import { BsBagX } from 'react-icons/bs';

function LatelyModal(props) {
  return (
    <LatelySection>
      <div
        className={props.latelyClassName}
        onMouseOver={() => {
          props.setClassName('lateyModalChange');
        }}
        onMouseOut={() => {
          props.setClassName('lateyModal');
        }}
      >
        <LatelyHeader>
          <LatelyTitle>최근본상품</LatelyTitle>
          <span>전체삭제</span>
        </LatelyHeader>
        <LatelyMain></LatelyMain>
        <BsBagX className="icon" />
      </div>
    </LatelySection>
  );
}

const LatelySection = styled.section`
  .lateyModal {
    position: fixed;
    width: 525px;
    height: 100%;
    top: 160px;
    right: 0px;
    border: 1px solid #b4b4b4;
    box-shadow: 30px 30px 70px rgba(0, 0, 0, 0.2);
    transform: translateX(100%);
    transition: all 0.3s ease-in;
  }
  .lateyModalChange {
    position: fixed;
    width: 525px;
    height: 100%;
    top: 160px;
    right: 0px;
    border: 1px solid #b4b4b4;
    box-shadow: 30px 30px 70px rgba(0, 0, 0, 0.2);
    transform: translateX(0%);
    transition: all 0.3s ease-in;
  }
`;

const LatelyHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  margin: 30px;
  border-bottom: 3px solid black;
  span {
    color: #a6a6a6;
    font-size: 12px;
    cursor: pointer;
  }
`;
const LatelyTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const LatelyMain = styled.section``;

export default LatelyModal;
