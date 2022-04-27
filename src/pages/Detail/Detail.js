import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import OrderBox from './components/OrderBox';
import Reviews from './components/Reviews';
import { DetailContext, UserContext } from './Context';
import { getCookie } from '../../cookie';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 100px;
  margin-top: 100px;
  justify-content: center;

  @media (max-width: 820px) {
    margin: 0;
    margin-top: 100px;
  }
  .detail {
    display: flex;
    flex-direction: row;
    width: 100%;
    @media (max-width: 375px) {
      flex-direction: column;
    }
  }
`;
const ImgBox = styled.img`
  margin: 0 140px;
  @media screen and (max-width: 1920px) {
    width: 35%;
  }
  @media (max-width: 820px) {
    width: 35%;
    height: 60%;
    margin: 300px 100px;
  }
  @media (max-width: 375px) {
    width: 100%;
    margin: 0;
  }
`;

function Detail() {
  const { product_id } = useParams();
  const [item, setItem] = useState();
  const [reviews, setReviews] = useState();
  const [loading, setLoading] = useState(true);
  const [reivewObj, setReviewObj] = useState({});
  const [user_id, setUser_id] = useState(1);
  const cookie = getCookie('user_id');

  const processOnlyItem = res => {
    res.rate = res.reviewSum._avg.rating;
    return res;
  };

  const itemRate = count => {
    const arr = [];
    for (let i = 1; i < count + 1; i++) {
      arr[i] = i;
    }
    for (let j = count + 1; j < 6; j++) {
      arr[j] = 0;
    }
    arr.shift();
    return arr;
  };

  const localItem = id => {
    let getItem = localStorage.getItem('itemsViewed');
    if (!getItem) {
      return localStorage.setItem('itemsViewed', id);
    } else if (getItem) {
      if (
        getItem
          .split(',')
          .map(v => v === id)
          .indexOf(true) === -1
      ) {
        localStorage.setItem('itemsViewed', getItem + ',' + id);
      }
    }
  };

  // localStorage
  useEffect(() => {
    if (loading === false) {
      localItem(product_id);
    }
  }, [loading]);

  // get Data
  useEffect(() => {
    // data fetching
    fetch(`/data/detail.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        setReviews(res.reviews);
        setItem(processOnlyItem(res));
        setReviewObj(res.reviewSum);
        setLoading(false);
      });

    // verify user fetching
    fetch('http://localhost:8000/user/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: cookie,
      },
    })
      .then(res => res.json())
      .then(res => setUser_id(res.userId));
  }, []);

  return (
    <Wrapper>
      <UserContext.Provider value={{ user_id }}>
        {loading ? (
          <div>loading...</div>
        ) : (
          <DetailContext.Provider
            value={{ item, itemRate, reviews, reivewObj }}
          >
            <div className="detail">
              <ImgBox src={item.image_url} />
              <OrderBox />
            </div>
            <Reviews />
          </DetailContext.Provider>
        )}
      </UserContext.Provider>
    </Wrapper>
  );
}

export default Detail;
