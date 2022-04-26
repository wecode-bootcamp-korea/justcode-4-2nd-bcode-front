import styled from 'styled-components';
import {
  FiFacebook,
  FiInstagram,
  FiYoutube,
  FiTwitter,
  FiArrowUp,
} from 'react-icons/fi';

function Footer() {
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <FooterSection>
      <FooterInner>
        <div>
          <FooterTitle>(주)아뤼따움</FooterTitle>
          <FooterMainInfo>
            <div>
              (주)아뤼따움 대표이사 : 저스트코드 | 사업자 등록번호 :
              123-45-56789
            </div>
            <div>주소 : 서울특별시 용산구 한강대로 1004 (한강로 7가) </div>
            <div>전자메일주소 : support@aruitaum.com</div>
            <div>호스팅 제공자 : (주)아뤼따움</div>
            <div>통신판매업신고번호 : 2022-서울용산-1004호</div>
            <div>건강기능식품판매업 영업신고증 제7호</div>
          </FooterMainInfo>

          <FooterInfo>
            <div>
              고객님의 안전거래를 위한 현금 거래에 대해 영서페이
              에스크로서비스를 이용하실 수 있습니다.
            </div>
            <div>
              아뤼따움 모든 고객은 월1200만원(리네즈 글로벌 상품 월1000만원)/연
              1200만원 내에서 할인 혜택을 받을 수 있습니다.(온/오프라인 합산)
            </div>
          </FooterInfo>
          <Footerlast>
            <div>ARUITAUM CORPORATION ALL RIGHTS RESERVED.</div>
          </Footerlast>
        </div>
        <FooterIcons>
          <FiFacebook className="icons" style={{ strokeWidth: '1' }} />
          <FiInstagram className="icons" style={{ strokeWidth: '1' }} />
          <FiYoutube className="icons" style={{ strokeWidth: '1' }} />
          <FiTwitter className="icons" style={{ strokeWidth: '1' }} />
        </FooterIcons>
      </FooterInner>
      <FiArrowUp
        className="goToTop"
        style={{ strokeWidth: '1' }}
        onClick={goToTop}
      />
    </FooterSection>
  );
}

const FooterSection = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 450px;
  background-color: #f0f0f0;
  .goToTop {
    position: fixed;
    bottom: 60px;
    right: 60px;
    font-size: 48px;
    color: white;
    background-color: #fbcbde;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      background-color: #ee2e7a;
    }
    @media (max-width: 375px) {
      right: 40px;
      bottom: 40px;
      font-size: 34px;
    }
  }
`;

const FooterInner = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1200px;
  margin: auto;
`;

const FooterTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  padding-bottom: 25px;
`;

const FooterMainInfo = styled.div`
  div {
    font-size: 12px;
    font-weight: normal;
    color: #666666;
    padding: 10px 0;
  }
`;

const FooterInfo = styled.div`
  padding: 25px 0;
  div {
    font-size: 12px;
    font-weight: normal;
    color: #666666;
    padding: 10px 0;
  }
`;

const Footerlast = styled.div`
  div {
    font-size: 12px;
    font-weight: normal;
    color: #666666;
  }
`;

const FooterIcons = styled.div`
  @media (max-width: 820px) {
    display: none;
  }
  .icons {
    color: white;
    border-radius: 50%;
    padding: 10px;
    margin: 10px;
    font-size: 58px;
    background-color: #fbcbde;
    &:hover {
      background-color: #ee2e7a;
    }
  }
`;

export default Footer;
