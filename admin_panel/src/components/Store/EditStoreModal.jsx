import { Modal, Form, Input, Button } from "antd";
import { useForm } from 'antd/es/form/Form';
import { useDispatch } from 'react-redux';
import { fetchStoreData, updateStore } from '../../store/storesSlice';
import { UploadOutlined } from '@ant-design/icons';
import Upload from 'antd/es/upload/Upload';
import { getBase64 } from '../../../util/converter';
import { useEffect, useState } from 'react';



// eslint-disable-next-line react/prop-types
const EditModal = ({isEditModalVisible, handleCancel,editedItem }) => {

  const dispatch = useDispatch();
  const [form] = useForm();
  const [image,setImage]=useState("");

    // Initialize the form values using the editedItem prop
    useEffect(() => {
      if (editedItem) {
        form.setFieldsValue({
          // eslint-disable-next-line react/prop-types
          name: editedItem.name,
          // eslint-disable-next-line react/prop-types
          logo: editedItem.logo,
          // eslint-disable-next-line react/prop-types
          address: editedItem.address
        });
      }
    }, [editedItem, form]);
    
  const handleSubmit = (values) => {
    const updatedStore = {
      // eslint-disable-next-line react/prop-types
      id: editedItem.id,
      name: values.name,
      logo: image,
      address: values.address,
    };
    dispatch(updateStore(updatedStore)).then(()=>{
      handleCancel();
      dispatch(fetchStoreData())

    });

  };
  return (
    <Modal
      title="Edit Store"
      open={isEditModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter the store name" }]}

        >
          <Input />
        </Form.Item>
        <Form.Item
          name="logo"
          label="Logo"
          rules={[{ required: true, message: "Please enter the store name" }]}

        >
            <Upload onChange={(info) => {getBase64(info.file,setImage);}}  name='logo' beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          
        >
          <Input />
        </Form.Item>
        {/* Add other form inputs here */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
          Update
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
