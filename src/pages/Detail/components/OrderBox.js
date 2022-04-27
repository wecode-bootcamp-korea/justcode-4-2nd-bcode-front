import React, { useState, useEffect, useContext } from 'react';
import styled, { css } from 'styled-components';
import {
  AiTwotoneStar,
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlinePaperClip,
  AiOutlineQuestionCircle,
} from 'react-icons/ai';
import BenefitModal from './Modals/BenefitModal';
import { DetailContext, ModalContext, UserContext } from '../Context';
import CartModal from './Modals/CartModal';
import SignInPlzModal from '../components/Modals/SignInPlzModal';
import { useParams } from 'react-router-dom';

const TitleText = css`
  font-weight: 700;
  font-size: 25px;
  margin-bottom: 15px;
`;

const HeightAndBoredr = i => css`
  display: flex;
  padding: ${i}px 0;
  border-bottom: 1px solid silver;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 568px;

  @media (max-width: 820px) {
    margin-right: 100px;
    margin-left: 0px;
  }
  @media (max-width: 375px) {
    width: 100%;
    margin-top: 100px;
  }
`;

const Brand = styled.span`
  display: flex;
  justify-content: space-between;
  opacity: 0.3;
  font-size: 20px;
  margin-bottom: 20px;
  .clip {
    border: none;
    background-color: inherit;
    font-size: 20px;
  }
`;

const Name = styled.span`
  ${TitleText}
`;

const Price = styled.span`
  ${TitleText}
  display: flex;
  .discount {
    color: #ee2c7a;
    margin-right: 10px;
  }
  .priceBefore {
    display: flex;
    color: silver;
    font-size: 17px;
    font-weight: 800;
    margin-left: 10px;
    align-items: flex-end;
  }
  @media (max-width: 820px) {
    font-size: 20px;
    margin-top: 20px;
  }
`;

const Rate = styled.div`
  ${HeightAndBoredr(25)};
`;

const MoveToReview = styled.a`
  color: #666666;
  margin-left: 10px;
  text-decoration: underline;
`;

const Description = styled.div`
  font-size: 13px;
  font-weight: 600;
  .dash {
    color: 'silver';
    opacity: 0.3;
    margin: 0 10px;
  }
  .beautyPoint {
    margin-right: 15px;
    @media (max-width: 820px) {
      margin-right: 0;
    }
  }
`;

const BuyBenefit = styled.div`
  ${HeightAndBoredr(25)};
  flex-direction: row;
  .title {
    width: 20%;
    @media (min-width: 376px) and (max-width: 820px) {
      width: 15%;
      margin-right: 5px;
    }
  }
`;

const PointBox = styled.div`
  position: relative;
  display: inline;
  opacity: 0.7;
  .question {
    font-size: 18px;
  }
`;

const PurchaseBenefit = styled.div`
  ${HeightAndBoredr(25)};
  .title {
    width: 20%;
  }
  li {
    @media (max-width: 820px) {
      margin-left: 15px;
    }
    list-style-type: circle;
    &:first-child {
      margin-bottom: 10px;
    }
  }
`;

const DeliveryPrice = styled.div`
  ${HeightAndBoredr(40)}
  .title {
    width: 20%;
  }
`;

const Calculator = styled.div`
  background-color: #f4f4f4;
  display: flex;
  flex-direction: row;
  position: relative;
  height: 80px;
`;

const ItemSummery = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-self: center;
  span {
    margin: 5px 0 5px 15px;
    &:nth-child(2) {
      font-weight: 700;
    }
  }
`;

const CountBtn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border: 1px solid silver;
  height: 30px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 80px;
  padding: 0 13px;
`;

const Amount = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 35px 0;
  span {
    font-weight: 700;
  }
  .totalPrice {
    color: #ee2c7a;

    font-size: 25px;
  }
`;

const ShopNowOrLater = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ShopNow = styled.button`
  background-color: white;
  color: #ee2c7a;
  border: 1px solid #ee2c7a;
  font-size: 20px;
  padding: 15px 60px;
  margin-right: 5px;
  width: 50%;
  @media (max-width: 820px) {
    width: 50%;
    padding: 0;
    font-size: 15px;
  }
`;

const ShopLater = styled.button`
  background-color: #ee2c7a;
  border: 1px solid #ee2c7a;
  color: white;
  font-size: 20px;
  padding: 15px 80px;
  width: 50%;
  @media (max-width: 820px) {
    width: 50%;
    padding: 0;
    font-size: 15px;
  }
`;

function OrderBox() {
  const { item, itemRate, reivewObj } = useContext(DetailContext);
  const { user_id } = useContext(UserContext);
  const [totalCount, setTotalCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(item.price_after);
  const [benefitModalOpen, setBenefitModalOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [signInPlzModalOpen, setSignInPlzModalOpen] = useState(false);
  const { product_id } = useParams();

  const slicePrice = price => {
    return String(price).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  };

  useEffect(() => {
    setTotalPrice(totalCount * item.price_after);
  }, [totalCount, totalPrice]);

  const doCopy = text => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('제품 링크가 복사되었습니다.');
  };

  const moveToReview = () => {
    let location = document.querySelector('.reviews').offsetTop;
    window.scrollTo({ top: location, behavior: 'smooth' });
  };

  const postIfLoggedIn = () => {
    if (user_id) {
      setCartModalOpen(true);
      fetch(`http://localhost:8000/cart/${product_id}?quantity=${totalCount}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          userId: user_id,
        }),
      });
    } else {
      setSignInPlzModalOpen(true);
    }
  };

  const priceGap = item.price_before - item.price_after;

  return (
    <Wrapper>
      <Brand>
        {item.brands.name} &gt;
        <button className="clip" onClick={() => doCopy(window.location.href)}>
          <AiOutlinePaperClip />
        </button>
      </Brand>
      <Name>{item.name}</Name>
      <Price>
        {priceGap !== 0 && (
          <span className="discount">
            {Math.floor((priceGap / item.price_before) * 100)}%
          </span>
        )}
        <span className="priceAfter">{slicePrice(item.price_after)}원</span>
        {priceGap !== 0 && (
          <del className="priceBefore">{slicePrice(item.price_before)}원</del>
        )}
      </Price>
      <Rate>
        {itemRate(Math.round(item.rate)).map(i =>
          i !== 0 ? (
            <AiTwotoneStar style={{ color: '#ffb23a' }} />
          ) : (
            <AiTwotoneStar style={{ color: 'silver' }} />
          )
        )}
        {item.rate.toFixed(1)}
        <MoveToReview onClick={() => moveToReview()}>
          {reivewObj._count.content}건 리뷰
        </MoveToReview>
      </Rate>
      <BuyBenefit>
        <span className="title">구매 혜택</span>
        <Description>
          <span className="beautyPoint">뷰티 포인트</span>
          <span className="dash">|</span>
          <PointBox>
            <span>
              최대
              <span style={{ color: '#5F9DE4' }}>
                {item.price_after / 100}p
              </span>
              적립
            </span>
            <ModalContext.Provider
              value={{ benefitModalOpen, setBenefitModalOpen, item }}
            >
              <AiOutlineQuestionCircle
                className="question"
                onClick={() => setBenefitModalOpen(true)}
              />
              <BenefitModal />
            </ModalContext.Provider>
          </PointBox>
        </Description>
      </BuyBenefit>
      <PurchaseBenefit>
        <span className="title">결제 혜택</span>
        <Description>
          <li>하나카드 5만원 결제 시 최대 8개월 무이자 할부</li>
          <li>PAYCO 생애 첫 결제 또는 90일 휴면회원 2,000원 즉시 할인</li>
        </Description>
      </PurchaseBenefit>
      <DeliveryPrice>
        <span className="title">배송비</span>
        <Description>
          <div style={{ marginBottom: 10 }}>
            일반배송
            <span className="dash">|</span>
            <span style={{ opacity: 0.4 }}>2,500원 (2만원 이상무료배송)</span>
          </div>
          <div>
            오늘도착
            <span className="dash">|</span>
            <span style={{ opacity: 0.4 }}>2,500원 (3만원 이상무료배송)</span>
          </div>
        </Description>
      </DeliveryPrice>
      <Calculator>
        <ItemSummery>
          <span style={{ opacity: 0.7, marginBottom: 7 }}>{item.name}</span>
          <span>{slicePrice(totalPrice)}원</span>
        </ItemSummery>
        <CountBtn>
          <AiOutlineMinus
            onClick={() => setTotalCount(prev => (prev === 1 ? 1 : prev - 1))}
          />
          <span>{totalCount}</span>
          <AiOutlinePlus onClick={() => setTotalCount(prev => prev + 1)} />
        </CountBtn>
      </Calculator>
      <Amount>
        <span>결제 예상 금액</span>
        <span className="totalPrice">{slicePrice(totalPrice)}원</span>
      </Amount>
      <ModalContext.Provider value={{ cartModalOpen, setCartModalOpen, item }}>
        <CartModal />
        <ShopNowOrLater>
          <ShopNow onClick={() => postIfLoggedIn()}>장바구니 담기</ShopNow>
          <ShopLater>바로구매</ShopLater>
        </ShopNowOrLater>
      </ModalContext.Provider>
      <SignInPlzModal
        signInPlzModalOpen={signInPlzModalOpen}
        setSignInPlzModalOpen={setSignInPlzModalOpen}
      />
    </Wrapper>
  );
}
export default OrderBox;
