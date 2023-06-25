import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTotalProducts } from '../../store/productsSlice';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const ProductCount = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.data);

  useEffect(() => {
    dispatch(fetchTotalProducts());
  }, [dispatch]);

  return (
    <Link to="/store" >
        <div style={{ width: 300, height: 200 }} >
            
      <Card
        style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        cover={<div style={{ fontSize: '48px', fontWeight: 'bold' }}>{products.length}</div>}
      >
        <Meta title="Total Products" />
      </Card>
        </div>
    </Link>
  );
};

export default ProductCount;
