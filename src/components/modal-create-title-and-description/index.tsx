import { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';

import { ModalCreateTitleAndDescriptionProps } from './types';

const ModalCreateTitleAndDescription = ({
  title,
  buttonText,
  buttonType,
  onCreate,
}: ModalCreateTitleAndDescriptionProps) => {
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const onOk = async () => {
    const values = await form.validateFields();
    setIsCreateLoading(true);
    await onCreate(values);
    form.resetFields();
    setIsCreateLoading(false);
    setIsVisible(false);
  };

  const onCancel = () => setIsVisible(false);

  const openModal = () => setIsVisible(true);

  const [form] = Form.useForm();

  return (
    <>
      <Button type={buttonType} onClick={openModal}>
        {buttonText}
      </Button>
      <Modal
        visible={isVisible}
        title={title}
        onCancel={onCancel}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={isCreateLoading} onClick={onOk}>
            Submit
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: 'public' }}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: 'Title is required and must be at least 3 and no more than 30 symbols',
                whitespace: true,
                min: 3,
                max: 30,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message:
                  'Description is required and must be at least 3 and no more than 30 symbols',
                whitespace: true,
                min: 3,
                max: 30,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateTitleAndDescription;
