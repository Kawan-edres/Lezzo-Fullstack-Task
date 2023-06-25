import { Modal, Form, Input, Button } from "antd";
import { useForm } from 'antd/es/form/Form';
import { useDispatch } from 'react-redux';
import {fetchCategories, updateCategory } from '../../store/categoriesSlice';
import { UploadOutlined } from '@ant-design/icons';
import Upload from 'antd/es/upload/Upload';
import { getBase64 } from '../../../util/converter';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";



// eslint-disable-next-line react/prop-types
const EditCategoryModal = ({isModalVisible, handleCancel,editedItem }) => {

  const {storeId}=useParams();


  const dispatch = useDispatch();
  const [form] = useForm();
  const [image,setImage]=useState("");

    useEffect(() => {
      if (editedItem) {
        form.setFieldsValue({
          // eslint-disable-next-line react/prop-types
          name: editedItem.name,
          // eslint-disable-next-line react/prop-types
          image: editedItem.image,
        });
      }
    }, [editedItem, form]);
    
  const handleSubmit = (values) => {
    const updatedCategory = {
      // eslint-disable-next-line react/prop-types
      id: editedItem.id,
      name: values.name,
      image,
      storeId
    };
    dispatch(updateCategory(updatedCategory)).then(()=>{
      handleCancel();
      dispatch(fetchCategories(storeId))
    });

  };
  return (
    <Modal
      title="Edit Category"
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter the Category name" }]}
          >
          <Input />
        </Form.Item>
        <Form.Item
          name="image"
          label="image"
          rules={[{ required: true, message: "Please enter the Category Image" }]}

        >
            <Upload onChange={(info) => {getBase64(info.file,setImage);}}  name='logo' beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
        </Form.Item>
     
        <Form.Item>
          <Button type="primary" htmlType="submit">
          Update
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCategoryModal;
