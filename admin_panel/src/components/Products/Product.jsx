import { useNavigate, useParams } from "react-router-dom";
import { Table, Button } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../../store/productsSlice";
import CreateProductModal from "./CreateProductModal";
import EditProductModal from "./EditProductModal";

const Product = () => {
  const { categoryId } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editedItem, setEditedItem] = useState(null);

  const navigate=useNavigate();
  // getting data from reduxthnk
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.products.data);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts(categoryId));
  }, [dispatch, categoryId]);

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

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId)).then(() => {
      dispatch(fetchProducts(categoryId));
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
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Created Date",
      dataIndex: "created_date",
      key: "createdDate",
    },
    {
      title: "Category Id",
      dataIndex: "category_id",
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
          <Button type="primary" onClick={()=>navigate(-1)} >
          Back to Category List
          </Button>
          <br />
          <h1> Product List for Category {categoryId} </h1>
        </div>

        <div>
          <Button type="primary" onClick={() => showModal()}>
            Add Product
          </Button>
        </div>
      </div>
      <Table dataSource={productData} columns={columns} rowKey="id" />
      <CreateProductModal
        handleCancel={handleCancel}
        isModalVisible={isModalVisible}
        />
      <EditProductModal
        isEditModalVisible={isEditModalVisible}
        handleCancel={handleCancel}
        editedItem={editedItem}
      />
    </>
  );
};

export default Product;
