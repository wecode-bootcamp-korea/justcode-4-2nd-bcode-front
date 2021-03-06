import styled, { css } from 'styled-components';
import { FiUser, FiClock, FiShoppingBag, FiSearch } from 'react-icons/fi';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchList from './searchList';
import SearchWordList from './searchWordList';
import LatelyModal from './LatelyModal';
import CartModal from './CartModal';
import Category from './Category';

const now = new Date();

function Nav() {
  const [inputClassName, setInputClassName] = useState('mainInputBox');
  const [inputSearchName, setInputSearchName] = useState('inputBox');
  const [inputState, setInputState] = useState(false);
  const [searchArray, setSearchArray] = useState([]);
  const [inputWord, setInputWord] = useState('');
  const [resultSearch, setResultSearch] = useState([]);
  const [latelymodalClassName, setLatelyModalClassName] =
    useState('latelyModal');
  const [cartModalClassName, setCartModalClassName] = useState('cartModal');
  const [openModal, setOpenModal] = useState(false);
  const [searchWord, setsearchWord] = useState(
    JSON.parse(localStorage.getItem('item')) || []
  );
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    fetch(`/data/searchData.json`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setSearchArray(data);
      });
  }, []);
  const changeClassName = e => {
    setOpenModal(true);
    setInputClassName('mainInputBoxChange');
    setInputSearchName('inputBoxChange');
  };

  const searchValue = e => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (!inputRef.current.value == '') {
        //최근검색어가 11개 이상되면 마지막 값 삭제 후 추가
        if (searchWord.length === 11) {
          searchWord.pop();
          setsearchWord(searchWord);
        }
        //같은 최근 검색어를 또 입력하면 가장 상단으로 옮기고
        //저장되어 있던 단어 삭제
        for (let i = 0; i < searchWord.length; i++) {
          if (searchWord[i].item === inputRef.current.value) {
            searchWord.splice(i, 1);
          }
        }
        setsearchWord(searchWord);
        addSearchWord(inputRef.current.value);
        inputRef.current.value = '';
      }
    }
  };
  const searchValueComplete = e => {
    console.log(e);
    if (searchWord.length === 11) {
      searchWord.pop();
      setsearchWord(searchWord);
    }
    //같은 최근 검색어를 또 입력하면 가장 상단으로 옮기고
    //저장되어 있던 단어 삭제
    for (let i = 0; i < searchWord.length; i++) {
      if (searchWord[i].item === e) {
        searchWord.splice(i, 1);
      }
    }
    setsearchWord(searchWord);
    addSearchWord(e);
  };

  const addSearchWord = item => {
    const todayMonth = now.getMonth() + 1;
    const todayDate = now.getDate();

    const nowDate = todayMonth + '.' + todayDate;

    const items = {
      id: Date.now(),
      item: item,
      expire: Date.now() + 30,
      date: nowDate,
    };
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

  const goToCart = () => {
    navigate(`/cart`);
  };

  const goToHome = () => {
    navigate('/');
    window.location.reload();
  };

  const goTologin = () => {
    navigate('/login');
    window.location.reload();
  };

  const deletedata = id => {
    setsearchWord(searchWord.filter(searchWord => searchWord.id !== id));
  };

  const noFocus = e => {
    setOpenModal(false);
    setInputClassName('mainInputBox');
    setInputSearchName('inputBox');
  };

  const setInputPage = e => {
    setInputWord(e.target.value);
    e.target.value === '' ? setInputState(false) : setInputState(true);
  };

  const setLatelyClassName = name => {
    setLatelyModalClassName(name);
  };

  const setCartClassName = name => {
    setCartModalClassName(name);
  };

  //검색어 자동완성
  useEffect(() => {
    if (inputWord !== '') {
      const result = searchArray.filter(word => {
        return word.name.includes(inputWord);
      });
      setResultSearch(result);
    }
  }, [inputWord]);

  //로컬스토리지 저장
  useEffect(() => {
    window.localStorage.setItem('item', JSON.stringify(searchWord));
  }, [searchWord]);

  return (
    <>
      <NavSection>
        {openModal ? <ClickModal onClick={noFocus}></ClickModal> : ''}
        <TopSectoion>
          <Section>
            <Header>
              <Image src="/image/logo.svg" onClick={goToHome} />
              <div className="Input" onClick={e => e.stopPropagation()}>
                <div className="hiddenBox" />
                <input
                  className={inputSearchName}
                  type="text"
                  placeholder="두피도 지구도 편안하게 라보에이치 샴푸 바 출시!"
                  onFocus={changeClassName}
                  onKeyUp={searchValue}
                  onChange={setInputPage}
                  ref={inputRef}
                />
                <FiSearch className="searchIcon" onClick={searchValue} />
                <div className={inputClassName}>
                  {inputState ? (
                    <SerchList>
                      {resultSearch.map((comment, index) => {
                        if (index < 13) {
                          return (
                            <SearchWordList
                              key={index}
                              id={comment.id}
                              name={comment.name}
                              searchValue={searchValueComplete}
                            />
                          );
                        }
                      })}
                    </SerchList>
                  ) : (
                    <>
                      <InputHeader>
                        <div className="inputTitle">최근검색어</div>
                      </InputHeader>
                      <ul className="searchDataList">
                        {searchWord === '' && (
                          <NoSearchWord>
                            <span className="noSearhData">
                              최근 검색어가 없습니다.
                            </span>
                          </NoSearchWord>
                        )}
                        {searchWord.map((comment, index) => {
                          return (
                            <SearchList
                              key={index}
                              id={comment.id}
                              item={comment.item}
                              date={comment.date}
                              deletedata={deletedata}
                            />
                          );
                        })}
                      </ul>
                      <span className="maininputfooter">
                        검색어는 최대 30일까지 보관됩니다
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="font">
                <div className="fonts">
                  <FiUser
                    className="icon"
                    style={{ stroke: 'black', strokeWidth: '1' }}
                    onClick={goTologin}
                  />
                </div>
                <div className="fonts">
                  <FiClock
                    className="icon"
                    style={{ stroke: 'black', strokeWidth: '1' }}
                    onMouseOver={() => {
                      setLatelyModalClassName('latelyModalChange');
                    }}
                    onMouseOut={() => {
                      setLatelyModalClassName('latelyModal');
                    }}
                  />
                </div>
                <div className="fonts">
                  <FiShoppingBag
                    className="icon"
                    style={{ stroke: 'black', strokeWidth: '1' }}
                    onMouseOver={() => {
                      setCartModalClassName('cartModalChange');
                    }}
                    onMouseOut={() => {
                      setCartModalClassName('cartModal');
                    }}
                    onClick={goToCart}
                  />
                </div>
              </div>
            </Header>
          </Section>
        </TopSectoion>
        <LatelyModal
          latelymodalClassName={latelymodalClassName}
          setLatelyClassName={setLatelyClassName}
        />
        <CartModal
          cartModalClassName={cartModalClassName}
          setCartClassName={setCartClassName}
        />
      </NavSection>
      <Category />
    </>
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
  transition: all 0.3s ease-in;
`;

const inputBoxItem = css`
  position: relative;
  width: 402px;
  height: 45px;
  border: solid 2px #ee2d7a;
  border-radius: 30px;
  padding-left: 20px;
  outline: none;
  z-index: 300;
  transition: all 0.3s ease-in;
`;

const NavSection = styled.div`
  position: relative;
  height: 100px;
  z-index: 120;
`;

const ClickModal = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 200;
`;
const TopSectoion = styled.nav`
  width: 100%;
  z-index: 120;
  background-color: white;
`;

const Section = styled.nav`
  width: 1200px;
  height: 80px;
  margin: auto;
  margin-top: 10px;

  @media (max-width: 1200px) {
    width: 100%;
  }
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
    padding-left: 70px;
    padding-top: 10px;
    @media (max-width: 1000px) {
      display: none;
    }
    .hiddenBox {
      position: absolute;
      top: -30px;
      width: 420px;
      height: 70px;
      background-color: white;
      z-index: 250;
    }
    .mainInputBox {
      ${mainInputBoxItem}
      transform: translateY(-95%);
      visibility: hidden;
      z-index: 200;
    }
    .mainInputBoxChange {
      ${mainInputBoxItem}
      transition: all 0.3s ease-in;
      visibility: visible;
      z-index: 200;
    }
    .searchIcon {
      position: absolute;
      right: 30px;
      height: 42px;
      font-size: 24px;
      color: #ee2d7a;
      cursor: pointer;
      z-index: 300;
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
  .inputBox {
    ${inputBoxItem}
  }
  .inputBoxChange {
    ${inputBoxItem}
    border-bottom: solid 2px #f0f0f0;
    border-radius: 30px 30px 0 0;
  }
  .font {
    display: flex;
    font-size: 36px;
    width: 300px;
    height: 80px;
    @media (max-width: 600px) {
      width: 160px;
      height: 80px;
    }
    .fonts {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 80px;
      @media (max-width: 600px) {
        width: 50px;
        height: 80px;
      }
    }
    .icon {
      font-size: 38px;
      cursor: pointer;
      @media (max-width: 600px) {
        font-size: 26px;
      }
    }
  }
`;

const Image = styled.img`
  width: 200px;
  cursor: pointer;
  @media (max-width: 600px) {
    width: 150px;
    padding: 10px;
  }
`;

const InputHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 67px;
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

const SerchList = styled.ul`
  padding: 50px 0 0 20px;
`;

export default Nav;
