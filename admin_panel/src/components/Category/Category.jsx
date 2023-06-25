import { useParams } from "react-router-dom";
import { Table, Button } from "antd";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, deleteCategory } from "../../store/categoriesSlice";
import { Link } from "react-router-dom";
import CreateCategoryModal from "./CreateCategoryModal";
import EditCategoryModal from "./EditCategoryModal";

const StoreCategory = () => {
  const { storeId } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editedItem, setEditedItem] = useState(null);

  // getting data from reduxthnk
  const dispatch = useDispatch();
  const categoryData = useSelector((state) => state.categories.data);
  const loading = useSelector((state) => state.categories.loading);
  const error = useSelector((state) => state.categories.error);

  useEffect(() => {
    dispatch(fetchCategories(storeId));
  }, [dispatch, storeId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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

  const handleDelete = (categoryId) => {
    dispatch(deleteCategory(categoryId)).then(() => {
      dispatch(fetchCategories(storeId));
    });
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
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => {
        return (
          <img
            src={`${image}`}
            alt="Logo"
            style={{
              width: "50px",
              aspectRatio: 1,
              objectFit: "cover",
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
      title: "Store Id",
      dataIndex: "store_id",
      key: "store Id",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <span>
          <Button type="primary" onClick={() => showEditModal(record)}>
            Edit
          </Button>{" "}
          <Button onClick={() => handleDelete(record.id)} type="primary" danger>
            Delete
          </Button>{" "}
          <Button style={{ background: "green", color: "#fff" }}>
            <Link to={`/products/category/${record.id}`}>Products</Link>
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
          <Button type="primary" >
          <Link to={`/`}>Back to Stores List</Link>
          </Button>
          <br />
          <h1> Category List for Sotre {storeId} </h1>
        </div>

        <div>
          <Button type="primary" onClick={() => showModal()}>
            Add Categoy
          </Button>
        </div>
      </div>
      <Table dataSource={categoryData} columns={columns} rowKey="id" />
      <EditCategoryModal
        handleCancel={handleCancel}
        isModalVisible={isModalVisible}
        editedItem={editedItem}
        />
      <CreateCategoryModal
        isEditModalVisible={isEditModalVisible}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default StoreCategory;
