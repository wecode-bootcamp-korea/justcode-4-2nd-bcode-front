import styled, { css } from 'styled-components';
import { FiMenu } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import CategoryList from './CategoryList';

function Category(props) {
  const [categoryClassName, setCartClassName] = useState('categoryList');
  const [categoryData, setCategoryData] = useState([]);

  const moveCategoryList = () => {
    setCartClassName('categoryListChange');
  };

  const backCategoryList = () => {
    setCartClassName('categoryList');
  };

  useEffect(() => {
    fetch(`/data/categoryData.json`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setCategoryData(data);
      });
  }, []);

  return (
    <>
      <CategoryBar>
        <CategoryMain>
          <CategoryMenu
            onMouseOver={moveCategoryList}
            onMouseOut={backCategoryList}
          >
            <FiMenu
              className="icon"
              style={{ stroke: 'black', strokeWidth: '1' }}
            />
            <span>카테고리</span>
          </CategoryMenu>
          <div
            className={categoryClassName}
            onMouseOver={moveCategoryList}
            onMouseOut={backCategoryList}
          >
            <ul>
              {categoryData.map((comment, index) => {
                return (
                  <CategoryList
                    key={index}
                    id={comment.id}
                    name={comment.name}
                  />
                );
              })}
            </ul>
          </div>
        </CategoryMain>
      </CategoryBar>
    </>
  );
}

const CategoryCss = css`
  position: absolute;
  width: 150px;
  height: 350px;
  transition: all 0.3s ease-in;
  border: 2px solid #ededed;
  background-color: white;
  z-index: 120;
`;

const CategoryBar = styled.section`
  width: 100%;
  height: 70px;
  border-top: 2px solid #ededed;
  border-bottom: 2px solid #ededed;
  .categoryList {
    ${CategoryCss}
    display: none;
  }
  .categoryListChange {
    ${CategoryCss}
    display: block;
  }
`;

const CategoryMain = styled.div`
  width: 1200px;
  height: 100%;
  margin: auto;
  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const CategoryMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  width: 150px;
  padding-left: 15px;
  .icon {
    font-size: 32px;
    @media (max-width: 375px) {
      font-size: 28px;
    }
  }
  span {
    padding: 3px 0 0 15px;
    font-size: 18px;
    @media (max-width: 375px) {
      font-size: 16px;
    }
  }
  &:hover {
    color: #f47dab;
  }
`;

export default Category;
