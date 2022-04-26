import styled from 'styled-components';
import { FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function LatelyModalList(props) {
  const priceBefore = props.price_before + '원';
  const priceAfter = props.price_after + '원';
  const discount =
    Math.round((1 - props.price_after / props.price_before) * 100, -1) + '%';

  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/detail/${props.id}`);
    window.location.reload();
  };
  return (
    <LatelyItems>
      <FiX
        className="icon"
        style={{ stroke: 'black', strokeWidth: '1' }}
        onClick={() => props.deletItem(props.id)}
      />
      <WrapList onClick={goToDetail}>
        <img src={props.image_url} className="latelyImage" />
        <div className="latelyTitle">
          <BrandName>{props.brandname}</BrandName>
          <ItemName>{props.name}</ItemName>
          <PriceInfo>
            <span className="discount">{discount}</span>
            <span className="priceAfter">{priceAfter}</span>
            <span className="beforePrice">{priceBefore}</span>
          </PriceInfo>
        </div>
      </WrapList>
    </LatelyItems>
  );
}

const LatelyItems = styled.li`
  width: 250px;
  height: 350px;
  position: relative;
  margin-bottom: 20px;
  .latelyImage {
    width: 200px;
    padding: 10px;
    border-radius: 16px;
  }
  .latelyTitle {
    padding-left: 10px;
  }
  .icon {
    position: absolute;
    font-size: 24px;
    color: #929292;
    right: 60px;
    top: -20px;
    cursor: pointer;
  }
`;

const WrapList = styled.div`
  cursor: pointer;
`;

const BrandName = styled.div`
  padding-bottom: 10px;
  font-size: 14px;
  color: #b8b8b8;
`;
const ItemName = styled.div`
  font-size: 16px;
  padding-bottom: 30px;
`;
const PriceInfo = styled.div`
  display: flex;
  align-items: center;
  .discount {
    color: #f7a1c2;
    font-size: 14px;
    padding-right: 5px;
  }
  .beforePrice {
    padding-left: 5px;
    font-size: 12px;
    text-decoration: line-through;
  }
`;

export default LatelyModalList;
