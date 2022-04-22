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
        </CategoryMain>
      </CategoryBar>
      <CategorySection>
        <div
          className={categoryClassName}
          onMouseOver={moveCategoryList}
          onMouseOut={backCategoryList}
        >
          <ul>
            {categoryData.map((comment, index) => {
              return (
                <CategoryList key={index} id={comment.id} name={comment.name} />
              );
            })}
          </ul>
        </div>
      </CategorySection>
      <HiddenSection>
        <CategoryHidden></CategoryHidden>
      </HiddenSection>
    </>
  );
}

const CategoryCss = css`
  position: absolute;
  width: 150px;
  height: 350px;
  transition: all 0.3s ease-in;
  border: 1px solid #b4b4b4;
  background-color: white;
  z-index: 100;
`;

const CategoryBar = styled.section`
  position: relative;
  height: 70px;
  width: 100%;
  border: 2px solid #f0f0f0;
  background-color: white;
`;

const CategorySection = styled.div`
  width: 1200px;
  height: 70px;
  margin: auto;
  .categoryList {
    ${CategoryCss}
    transform: translateY(-180%);
  }
  .categoryListChange {
    ${CategoryCss}
    transform: translateY(0%);
  }
`;

const CategoryMain = styled.div`
  width: 1200px;
  height: 100%;
  margin: auto;
`;

const CategoryMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  width: 150px;
  padding-left: 15px;
  z-index: 120;
  .icon {
    font-size: 32px;
  }
  span {
    padding: 3px 0 0 15px;
    font-size: 18px;
  }
  &:hover {
    color: #f47dab;
  }
`;

const CategoryHidden = styled.div`
  position: absolute;
  width: 200px;
  height: 300px;
  background-color: white;
  top: -120px;
  z-index: 110;
`;

const HiddenSection = styled.div`
  width: 1200px;
  height: 70px;
  margin: auto;
`;

export default Category;
