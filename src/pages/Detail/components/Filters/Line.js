import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { ReviewContext } from '../../Context';
import High from './ByHigh';
import Low from './ByLow';
import ByDate from './ByDate';

const Wrapper = styled.div`
  button {
    @media (max-width: 375px) {
      font-size: 15px;
    }
  }
`;

function Line() {
  const { setFilter } = useContext(ReviewContext);
  const [now, setNow] = useState('high');
  const filterReviewComponent = e => {
    switch (e.target.className) {
      case 'high': {
        setFilter(<High />);
        setNow('high');
        break;
      }
      case 'low': {
        setFilter(<Low />);
        setNow('low');
        break;
      }
      case 'date': {
        setFilter(<ByDate />);
        setNow('date');
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <Wrapper>
      {(function () {
        switch (now) {
          case 'high': {
            return (
              <div>
                <button
                  style={{ color: 'black' }}
                  onClick={e => filterReviewComponent(e)}
                  className="high"
                >
                  √ 높은평점순
                </button>
                <button
                  style={{ color: 'silver' }}
                  onClick={e => filterReviewComponent(e)}
                  className="low"
                >
                  낮은평점순
                </button>
                <button
                  style={{ color: 'silver' }}
                  onClick={e => filterReviewComponent(e)}
                  className="date"
                >
                  작성일순
                </button>
              </div>
            );
          }
          case 'low': {
            return (
              <div>
                <button
                  style={{ color: 'silver' }}
                  onClick={e => filterReviewComponent(e)}
                  className="high"
                >
                  높은평점순
                </button>
                <button
                  style={{ color: 'black' }}
                  onClick={e => filterReviewComponent(e)}
                  className="low"
                >
                  √ 낮은평점순
                </button>
                <button
                  style={{ color: 'silver' }}
                  onClick={e => filterReviewComponent(e)}
                  className="date"
                >
                  작성일순
                </button>
              </div>
            );
          }
          case 'date': {
            return (
              <div>
                <button
                  style={{ color: 'silver' }}
                  onClick={e => filterReviewComponent(e)}
                  className="high"
                >
                  높은평점순
                </button>
                <button
                  style={{ color: 'silver' }}
                  onClick={e => filterReviewComponent(e)}
                  className="low"
                >
                  낮은평점순
                </button>
                <button
                  style={{ color: 'black' }}
                  onClick={e => filterReviewComponent(e)}
                  className="date"
                >
                  √ 작성일순
                </button>
              </div>
            );
          }
          default: {
            return (
              <div>
                <button
                  style={{ color: 'black' }}
                  onClick={e => filterReviewComponent(e)}
                  className="high"
                >
                  √ 높은평점순
                </button>
                <button
                  style={{ color: 'silver' }}
                  onClick={e => filterReviewComponent(e)}
                  className="low"
                >
                  낮은평점순
                </button>
                <button
                  style={{ color: 'silver' }}
                  onClick={e => filterReviewComponent(e)}
                  className="date"
                >
                  작성일순
                </button>
              </div>
            );
          }
        }
      })()}
    </Wrapper>
  );
}

export default Line;
