import { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';

import { useAppDispatch, useCookiesStorage } from '../../hooks';
import { columnsService } from '../../api';
import { getMessageFromError, openNotification } from '../../helpers';
import { getBoardsColumnsAsync } from '../../store';
import { ModalCreateColumnProps } from './types';
import { useTranslation } from 'react-i18next';

const ModalCreateColumn = ({ boardId }: ModalCreateColumnProps) => {
  const { t } = useTranslation();
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
      openNotification('success', t('columnCreated'));
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
        {t('createColumn')}
      </Button>
      <Modal
        visible={isVisible}
        title={t('newColumn')}
        onCancel={onCancel}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            {t('cancel')}
          </Button>,
          <Button key="submit" type="primary" loading={isCreateLoading} onClick={onOk}>
            {t('submit')}
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
            label={t('title')}
            rules={[
              {
                required: true,
                message: t('titleRequiredFrom3To30'),
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
