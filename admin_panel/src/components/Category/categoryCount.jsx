import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTotalCategories } from '../../store/categoriesSlice';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const CategoryCount = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.data);

  useEffect(() => {
    dispatch(fetchTotalCategories());
  }, [dispatch]);

  return (
    <Link to="/store" >
        <div style={{ width: 300, height: 200 }} >
            
      <Card
        style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        cover={<div style={{ fontSize: '48px', fontWeight: 'bold' }}>{categories.length}</div>}
      >
        <Meta title="Total categories" />
      </Card>
        </div>
    </Link>
  );
};

export default CategoryCount;
