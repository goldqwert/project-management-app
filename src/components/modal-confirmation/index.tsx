import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { ModalConfirmationProps } from './types';
import { useTranslation } from 'react-i18next';

const { confirm } = Modal;

const ModalConfirmation = ({ title, description, onOk, onCancel }: ModalConfirmationProps) => {
  const { t } = useTranslation();

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
        {t('deleteUser')}
      </Button>
    </Space>
  );
};

export default ModalConfirmation;
