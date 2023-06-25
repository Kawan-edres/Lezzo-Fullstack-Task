import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStoreData } from '../../store/storesSlice';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const StoreCount = () => {
  const dispatch = useDispatch();
  const stores = useSelector(state => state.store.data);

  useEffect(() => {
    dispatch(fetchStoreData());
  }, [dispatch]);

  return (
    <Link to="/" >
        <div style={{ width: 200, height: 200 }} >
            
      <Card
        style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        cover={<div style={{ fontSize: '48px', fontWeight: 'bold' }}>{stores.length}</div>}
        
      >
        <Meta title="Total Stores" />
      </Card>
        </div>
    </Link>
  );
};

export default StoreCount;
