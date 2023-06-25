import  { useEffect } from 'react';
import { Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPaginatedStoreData } from '../../store/storesSlice';

const VirtualizedStore = () => {
  const dispatch = useDispatch();
  const { pageNumber, pageSize, data, total } = useSelector((state) => state.store);

  useEffect(() => {
    dispatch(fetchPaginatedStoreData({ page: pageNumber, pageSize }));
  }, [dispatch, pageNumber, pageSize]);

  const handleTableChange = (pagination) => {
    const { current, pageSize } = pagination;
    dispatch(fetchPaginatedStoreData({ page: current, pageSize }));
  };

  const columns = [
    {
      title: 'Store Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Logo',
      dataIndex: 'logo',
      key: 'logo',
      render: (logo) => <img src={logo} alt="Store Logo"  />,
    },
    {
      title: 'Created_Date',
      dataIndex: 'created_date',
      key: 'created_date',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{
        current: pageNumber,
        pageSize,
        total: total, // Use the total property from the response data
      }}
      onChange={handleTableChange}
      scroll={{ y: 500 }} // Set a fixed height for the table container to enable vertical scrolling
    />
  );
};

export default VirtualizedStore;
