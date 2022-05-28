import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Form, Input } from 'antd';

import { useCookiesStorage } from '../../hooks';
import { boardsService } from '../../api';
import { getMessageFromError, openNotification } from '../../helpers';

const ModalCreateBoard = () => {
  const navigate = useNavigate();
  const { cookies } = useCookiesStorage(['authToken']);
  const [isVisible, setIsVisible] = useState(false);
  const [isCreateLoading, setIsCreateLoading] = useState(false);

  const onCreate = async (values: IBoard) => {
    setIsCreateLoading(true);
    try {
      await boardsService.createBoard(cookies.authToken, values);
      openNotification('success', 'Board successfully created!');
      navigate('/main');
    } catch (error) {
      openNotification('error', getMessageFromError(error));
    } finally {
      setIsVisible(false);
      setIsCreateLoading(false);
    }
  };

  const onOk = async () => {
    const values = await form.validateFields();
    form.resetFields();
    onCreate(values);
  };

  const onCancel = () => setIsVisible(false);

  const openModal = () => setIsVisible(true);

  const [form] = Form.useForm();

  return (
    <div>
      <Button type="link" onClick={openModal}>
        Create new board
      </Button>
      <Modal
        visible={isVisible}
        title="New board"
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
    </div>
  );
};

export default ModalCreateBoard;
