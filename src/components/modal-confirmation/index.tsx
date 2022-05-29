import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { ModalConfirmationProps } from './types';

const { confirm } = Modal;

const ModalConfirmation = ({ title, description, onOk, onCancel }: ModalConfirmationProps) => {
  const showDeleteUserConfirm = () =>
    confirm({
      title,
      icon: <ExclamationCircleOutlined />,
      content: description,
      onOk: () => onOk(),
      onCancel: () => onCancel?.(),
    });

  return (
    <Space wrap>
      <Button type="primary" onClick={showDeleteUserConfirm}>
        Delete user
      </Button>
    </Space>
  );
};

export default ModalConfirmation;
