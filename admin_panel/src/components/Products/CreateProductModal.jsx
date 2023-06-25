

import { Button, Modal, Form, Input, Upload } from 'antd';
import { useDispatch } from 'react-redux';
import { useForm } from 'antd/es/form/Form';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { getBase64 } from '../../../util/converter';
import { fetchProducts, createProduct } from "../../store/productsSlice";

import { useParams } from 'react-router-dom';
// eslint-disable-next-line react/prop-types
const CreateCategoryModal = ({isModalVisible,handleCancel}) => {

  const {categoryId}=useParams();

  const dispatch = useDispatch();
  const [form] = useForm();
  const [image,setImage]=useState("");


  
  const handleAddStore = () => {
    form.validateFields().then((values) => {

      const data={
        name:values.name,
        image:image,
        price:values.price,
        categoryId
      }
      

      dispatch(createProduct (data)).then(() => {
        handleCancel();
        dispatch(fetchProducts(categoryId)); 
      }); 
      

    });
  };


    return (
        <Modal
        title="Add Product"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form  form={form} onFinish={handleAddStore}  >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter the store name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
            rules={[{ required: true, message: "Please upload the image" }]}
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
          >
            <Upload onChange={(info) => {getBase64(info.file,setImage);}}  name='logo' beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter the store Price" }]}
          >
            <Input />
          </Form.Item>
          
          

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
}

export default CreateCategoryModal;