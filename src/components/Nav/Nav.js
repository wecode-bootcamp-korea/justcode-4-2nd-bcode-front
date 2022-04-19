import styled, { css } from 'styled-components';
import { FiUser } from 'react-icons/fi';
import { FiShoppingBag } from 'react-icons/fi';
import { FiClock } from 'react-icons/fi';
import { FiSearch } from 'react-icons/fi';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchList from './searchList';

function Nav() {
  const [inputClassName, setInputClassName] = useState('mainInputBox');
  const [hiddenBox, setHiddenBox] = useState('hidden');
  const [searchWord, setsearchWord] = useState(
    JSON.parse(localStorage.getItem('item')) || []
  );
  const navigate = useNavigate();
  const [arrayKey, setArrayKey] = useState(0);
  const inputRef = useRef();

  const changeClassName = () => {
    inputClassName === 'mainInputBox'
      ? setInputClassName('mainInputBoxChange')
      : setInputClassName('mainInputBox');
    hiddenBox === 'hidden' ? setHiddenBox('visible') : setHiddenBox('hidden');
  };

  const pressEnter = e => {
    let k = 0;
    if (e.key === 'Enter') {
      if (!e.target.value == '') {
        for (let i = 0; i < searchWord.length; i++) {
          if (searchWord[i].item === e.target.value) {
            k = 1;
          }
        }
        if (k === 1) {
          goToSearchPage(e.target.value);
        } else {
          addSearchWord(e.target.value);
          e.target.value = '';
        }
      }
    }
  };

  const addSearchWord = item => {
    const items = {
      id: arrayKey,
      item: item,
      expire: Date.now() + 30,
    };
    setArrayKey(arrayKey + 1);
    console.log(arrayKey);
    let newSearchword = searchWord;
    newSearchword.unshift(items);
    setsearchWord(newSearchword);
    window.localStorage.setItem('item', JSON.stringify(searchWord));
    goToSearchPage(items.item);
  };

  const goToSearchPage = item => {
    navigate(`/search?${item}`);
    window.location.reload();
  };

  const deletedata = id => {
    setsearchWord(searchWord.filter(searchWord => searchWord.id !== id));
  };

  const inputFocus = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    window.localStorage.setItem('item', JSON.stringify(searchWord));
  }, [searchWord]);

  return (
    <Section>
      <Header>
        <Image src="/image/logo.svg" />
        <div className="Input">
          <div className="hiddenBox"></div>
          <InputBox
            type="text"
            placeholder="두피도 지구도 편안하게 라보에이치 샴푸 바 출시!"
            onFocus={changeClassName}
            onBlur={changeClassName}
            onKeyUp={pressEnter}
            ref={inputRef}
          />
          <FiSearch className="searchIcon" />
          <div className={inputClassName} onClick={inputFocus}>
            <InputHeader>
              <div className="inputTitle">최근검색어</div>
            </InputHeader>
            <ul className="searchDataList">
              {searchWord == '' && (
                <NoSearchWord>
                  <span className="noSearhData">최근 검색어가 없습니다.</span>
                </NoSearchWord>
              )}
              {searchWord.map((comment, index) => {
                return (
                  <SearchList
                    key={index}
                    id={index}
                    item={comment.item}
                    deletedata={deletedata}
                  />
                );
              })}
            </ul>
            <span className="maininputfooter">
              검색어는 최대 30일까지 보관됩니다
            </span>
          </div>
        </div>
        <div className="font">
          <div className="fonts">
            <FiUser
              className="icon"
              style={{ stroke: 'black', strokeWidth: '1' }}
            />
          </div>
          <div className="fonts">
            <FiClock
              className="icon"
              style={{ stroke: 'black', strokeWidth: '1' }}
            />
          </div>
          <div className="fonts">
            <FiShoppingBag
              className="icon"
              style={{ stroke: 'black', strokeWidth: '1' }}
            />
          </div>
        </div>
      </Header>
    </Section>
  );
}

const mainInputBoxItem = css`
  position: absolute;
  width: 402px;
  height: 500px;
  border: solid 2px #ee2d7a;
  border-radius: 0 0 30px 30px;
  background-color: #ffffff;
  top: 20px;
  left: 20px;
  transition: all 0.3s ease-in;
`;

const Section = styled.nav`
  width: 1200px;
  height: 80px;
  margin: auto;
  padding-top: 10px;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  z-index: 1;
  .Input {
    position: relative;
    padding-left: 20px;
    .hiddenBox {
      position: fixed;
      top: 0px;
      width: 420px;
      height: 50px;
      background-color: white;
      z-index: 250;
    }
    .mainInputBox {
      ${mainInputBoxItem}
      transform: translateY(-95%);
      visibility: hidden;
    }
    .mainInputBoxChange {
      ${mainInputBoxItem}
      transition: all 0.3s ease-in;
      visibility: visible;
    }
    .searchIcon {
      position: absolute;
      right: 30px;
      height: 50px;
      font-size: 24px;
      color: #ee2d7a;
      z-index: 250;
    }
    .maininputfooter {
      position: absolute;
      bottom: 10px;
      left: 120px;
      font-size: 12px;
      color: #9a9a9a;
      font-weight: 600;
    }
    .searchDataList {
      height: 80%;
    }
  }
  .font {
    display: flex;
    font-size: 36px;
    width: 300px;
    height: 80px;
    .fonts {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 80px;
      border: 1px solid #f0f0f0;
    }
    .icon {
      font-size: 38px;
    }
  }
`;
const Image = styled.img`
  width: 200px;
`;

const InputBox = styled.input`
  position: relative;
  width: 380px;
  height: 45px;
  border: solid 2px #ee2d7a;
  border-radius: 30px;
  padding-left: 20px;
  outline: none;
  z-index: 300;
  transition: all 0.3s ease-in;
  &:focus {
    border-bottom: solid 2px #f0f0f0;
    border-radius: 30px 30px 0 0;
  }
`;

const InputHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 30px;
  padding-top: 40px;
  border-bottom: 2px solid #f0f0f0;
  .inputTitle {
    font-size: 18px;
    color: #8c8c8c;
  }
`;
const NoSearchWord = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  .noSearhData {
    color: #6b6b6b;
    font-size: 14px;
  }
`;

export default Nav;
