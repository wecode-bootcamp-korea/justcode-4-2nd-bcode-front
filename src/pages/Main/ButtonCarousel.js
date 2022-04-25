import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../../components/Card/Card';
import { AiOutlineReload } from 'react-icons/ai';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  button {
    border: 1px solid silver;
    border-radius: 20px;
    background-color: inherit;
    padding: 10px 40px;
  }

  .title {
    display: block;
    padding: 20px 0;
    width: 60%;
    font-weight: 800;
    font-size: 1.2rem;
    margin-bottom: 40px;
    @media (min-width: 375px), (max-width: 820px) {
      width: 90%;
    }
  }
  @media (min-width: 375px), (max-width: 820px) {
    width: 100%;
  }
`;

const Cards = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 50px;
  @media (min-width: 375px), (max-width: 820px) {
    margin-left: 30px;
  }
  div {
    margin-right: 5px;
    &:last-child {
      margin-right: 0;
    }
  }
  @media (max-width: 375px) {
    padding-right: 30px;
    width: 100%;
    overflow: scroll;
  }
`;

function ButtonCarousel() {
  const [recoItems, setRecoItems] = useState([]);
  const [more, setMore] = useState(1);

  const fetchItem = () => {
    fetch('/data/latelyData.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        setRecoItems(res);
      });
  };

  useEffect(() => {
    fetchItem();
  }, []);

  const first = recoItems.slice(0, 5);
  const sec = recoItems.slice(-5);

  return (
    <Wrapper>
      <span className="title">고객님을 위해 추천 드려요</span>
      <Cards>
        {more === 1
          ? first.map(i => <Card key={i.id} products={i} />)
          : sec.map(i => <Card key={i.id} products={i} />)}
      </Cards>
      <button onClick={() => (more === 1 ? setMore(2) : setMore(1))}>
        <AiOutlineReload style={{ color: '#ee2c7a' }} /> 더보기 {more}/2
      </button>
    </Wrapper>
  );
}

export default ButtonCarousel;
