import styled, { css } from 'styled-components';
import { useEffect, useState } from 'react';
import { BsBagX } from 'react-icons/bs';
import LatelyModalList from './LatelyModalList';
import { RiSplitCellsHorizontal } from 'react-icons/ri';

function LatelyModal(props) {
  const [localItem, setLocalItem] = useState(
    localStorage.getItem('itemsViewed') || ''
  );

  const [latelyItem, setLatelyItem] = useState([]);

  const deleteAll = () => {
    setLatelyItem([]);
    setLocalItem('');
    localStorage.setItem('itemsViewed', '');
  };

  const deletItem = id => {
    //fetch로 불러온 값 지우기
    //로컬스토리지에 저장된 값 지우기
    const latelyResult = localItem
      .split(',')
      .filter(local => parseInt(local) !== id)
      .join(',');
    setLocalItem(latelyResult);
    localStorage.setItem('itemsViewed', latelyResult);
    const localResult = latelyItem.filter(lately => lately.id !== id);
    setLatelyItem(localResult);
  };

  useEffect(() => {
    fetch(`http://localhost:8000/product/visited?product_id=${localItem}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setLatelyItem(data);
      });
  }, []);

  return (
    <LatelySection>
      <div
        className={props.latelymodalClassName}
        onMouseOver={() => {
          props.setLatelyClassName('latelyModalChange');
        }}
        onMouseOut={() => {
          props.setLatelyClassName('latelyModal');
        }}
      >
        <LatelyHeader>
          <LatelyTitle>최근본상품</LatelyTitle>
          <span onClick={deleteAll}>전체삭제</span>
        </LatelyHeader>
        {localItem === '' ? (
          <NoLatelyitem>
            <BsBagX className="icon" />
            <span>최근본상품이 없습니다.</span>
          </NoLatelyitem>
        ) : (
          <Wrap>
            <LatelyMain>
              {latelyItem.map((comment, index) => {
                return (
                  <LatelyModalList
                    key={index}
                    id={comment.id}
                    brandname={comment.brands.name}
                    name={comment.name}
                    image_url={comment.image_url}
                    price_after={comment.price_after}
                    price_before={comment.price_before}
                    deletItem={deletItem}
                  />
                );
              })}
            </LatelyMain>
          </Wrap>
        )}
      </div>
    </LatelySection>
  );
}

const latelyCss = css`
  position: absolute;
  width: 525px;
  height: 800px;
  top: 167px;
  right: 0px;
  border: 1px solid #b4b4b4;
  background-color: white;
  box-shadow: 30px 30px 70px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in;
  z-index: 200;
`;

const Wrap = styled.div`
  overflow: hidden;
  height: 600px;
`;

const LatelySection = styled.section`
  .latelyModal {
    ${latelyCss}
    transform: translateX(120%);
    @media (max-width: 530px) {
      display: none;
      width: 100%;
    }
  }
  .latelyModalChange {
    ${latelyCss}
    transform: translateX(0%);
    @media (max-width: 530px) {
      display: block;
      width: 100%;
    }
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

const NoLatelyitem = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .icon {
    font-size: 70px;
  }
  span {
    padding: 50px;
  }
`;

const LatelyTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const LatelyMain = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  padding-left: 20px;
  padding-top: 20px;
  overflow: scroll;
  @media (max-width: 375px) {
    grid-template-columns: 1fr;
  }
`;

export default LatelyModal;
