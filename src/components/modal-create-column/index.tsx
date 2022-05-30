import { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';

import { useAppDispatch, useCookiesStorage } from '../../hooks';
import { columnsService } from '../../api';
import { getMessageFromError, openNotification } from '../../helpers';
import { getBoardsColumnsAsync } from '../../store';
import { ModalCreateColumnProps } from './types';

const ModalCreateColumn = ({ boardId }: ModalCreateColumnProps) => {
  const dispatch = useAppDispatch();
  const { cookies } = useCookiesStorage(['authToken']);
  const [isVisible, setIsVisible] = useState(false);
  const [isCreateLoading, setIsCreateLoading] = useState(false);

  const onCreate = async (values: IBoard) => {
    setIsCreateLoading(true);
    try {
      await columnsService.createColumn(cookies.authToken, {
        id: boardId,
        title: values.title,
      });
      dispatch(getBoardsColumnsAsync({ token: cookies.authToken, boardId }));
      openNotification('success', 'Column successfully created!');
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
    <>
      <Button type="primary" onClick={openModal}>
        Create column
      </Button>
      <Modal
        visible={isVisible}
        title="New column"
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
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateColumn;
