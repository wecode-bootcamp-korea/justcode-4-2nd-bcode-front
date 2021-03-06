import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../../components/Card/Card';
import { AiOutlineReload } from 'react-icons/ai';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    border: 1px solid silver;
    border-radius: 20px;
    background-color: inherit;
    padding: 10px 40px;
    cursor: pointer;
  }
  .title {
    display: block;
    position: absolute;
    top: 0;
    font-weight: 800;
    font-weight: bold;
    font-size: 24px;
  }
  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const Cards = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 50px;
  position: relative;
  padding-top: 70px;
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
    fetch('http://localhost:8000/category/1', {
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
  const sec = recoItems.slice(4, 9);

  return (
    <Wrapper>
      <Cards>
        <span className="title">고객님을 위해 추천 드려요</span>
        {more === 1
          ? first.map(i => <Card key={i.id} item={i} />)
          : sec.map(i => <Card key={i.id} item={i} />)}
      </Cards>
      <button onClick={() => (more === 1 ? setMore(2) : setMore(1))}>
        <AiOutlineReload style={{ color: '#ee2c7a' }} /> 더보기 {more}/2
      </button>
    </Wrapper>
  );
}

export default ButtonCarousel;
