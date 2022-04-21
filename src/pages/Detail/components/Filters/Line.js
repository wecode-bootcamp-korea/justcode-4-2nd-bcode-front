import React, { useContext, useState } from 'react';
import styled, { css } from 'styled-components';

import { ReviewContext } from '../../Context';
import High from './High';
import Low from './Low';
import ByDate from './ByDate';

const Wrapper = styled.div``;

function Line() {
  const { setFilter } = useContext(ReviewContext);
  const [now, setNow] = useState('high');
  const filterReviewComponent = e => {
    // eslint-disable-next-line default-case
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
    }
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <Wrapper>
      {(function () {
        // eslint-disable-next-line default-case
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
        }
      })()}
    </Wrapper>
  );
}

export default Line;
