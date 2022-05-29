import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { usersService } from '../../api';
import { useCookiesStorage } from '../../hooks';
import { getMessageFromError, openNotification } from '../../helpers';

const { confirm } = Modal;

const ModalDeleteUser = () => {
  const { cookies, onLogout } = useCookiesStorage(['authUserId', 'authUserToken']);

  const showDeleteUserConfirm = () => {
    confirm({
      title: 'Do you want to delete this user?',
      icon: <ExclamationCircleOutlined />,
      content: 'All data of this user will be permanently deleted',
      onOk: () => onOk(),
      onCancel: () => {},
    });
  };

  const onOk = async () => {
    try {
      await usersService.deleteUser(cookies.authUserId, cookies.authToken);
      openNotification('success', 'User succesfully deleted');
      onLogout();
    } catch (error) {
      openNotification('error', getMessageFromError(error));
    }
  };

  return (
    <Space wrap>
      <Button type="primary" onClick={showDeleteUserConfirm}>
        Delete user
      </Button>
    </Space>
  );
};

export default ModalDeleteUser;
