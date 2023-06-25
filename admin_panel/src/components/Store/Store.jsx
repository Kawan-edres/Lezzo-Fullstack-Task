  import { Table, Button } from "antd";
  import { useState,useEffect } from "react";
  import ModalPopUp from "./CreateStoreModal.jsx";
  import EditModal from "./EditStoreModal";
  import { useDispatch, useSelector } from 'react-redux';
  import { fetchStoreData,deleteStore } from '../../store/storesSlice';
  import { Link } from 'react-router-dom';

  const StoreTable = () => {
    
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editedItem, setEditedItem] = useState(null);

    // getting data from reduxthnk 
    const dispatch = useDispatch();
    const storeData = useSelector((state) => state.store.data);
    const loading = useSelector((state) => state.store.loading);
    const error = useSelector((state) => state.store.error);


    
    
    useEffect(() => {
      dispatch(fetchStoreData());
    }, [dispatch]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    const handleDelete = (storeId) => {
      dispatch(deleteStore(storeId)).then(()=>{
        dispatch(fetchStoreData());
      });
     
    };
    const showEditModal = (record) => {
      setEditedItem(record);
      setIsEditModalVisible(true);

     
    };

    const showModal = () => {
      setIsModalVisible(true);
    };

    const handleCancel = () => {
      setIsModalVisible(false);
      setIsEditModalVisible(false);
    };

  
    

    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Logo",
        dataIndex: "logo",
        key: "logo",
        render: (logo) => {

          return (
            <img

            src={`${logo}`}
            alt="Logo"
              style={{
                width: "50px",
                aspectRatio: 1,
                objectFit: "cover"
              }}
            />
          );
        },
      },
      {
        title: "Created Date",
        dataIndex: "created_date",
        key: "createdDate",
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
      },
      {
        title: "Actions",
        key: "actions",
        render: (_, record) => (
          <span>
            <Button type="primary" onClick={() => showEditModal(record)}>
              Edit
            </Button>{" "}
            <Button type="primary" danger onClick={() => handleDelete(record.id)}>
              Delete
            </Button>{" "}
            <Button style={{background:"green",color:"#fff"}} >
            <Link to={`/categories/store/${record.id}`}>Categories</Link>
            </Button>
          </span>
        ),
      },
    ];


    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <div>
            <h1> Store List </h1>
          </div>
          <div>
            <Button onClick={showModal} type="primary">
              Add Store
            </Button>
          </div>
        </div>
        <Table dataSource={storeData} columns={columns} rowKey="id" />
        <EditModal
          handleCancel={handleCancel}
          isEditModalVisible={isEditModalVisible}
          editedItem={editedItem}
        />
        <ModalPopUp
          isModalVisible={isModalVisible}
          handleCancel={handleCancel}
        />
      </>
    );
  };
  export default StoreTable;
