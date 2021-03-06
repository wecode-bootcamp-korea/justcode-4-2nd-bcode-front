import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function CategoryList(props) {
  const navigate = useNavigate();

  const goToCategory = () => {
    navigate(`/list/${props.id}`);
    window.location.reload();
  };
  return (
    <CategoryListCard onClick={goToCategory}>{props.name}</CategoryListCard>
  );
}

const CategoryListCard = styled.li`
  font-size: 14px;
  font-weight: 600;
  padding: 22px;
  cursor: pointer;
`;

export default CategoryList;
