import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const App = () => {
  const showDeleteUserConfirm = () => {
    confirm({
      title: 'Do you want to delete this user?',
      icon: <ExclamationCircleOutlined />,
      content: 'All data of this user will be permanently deleted',
      onOk: () => {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel: () => {},
    });
  };

  return (
    <Space wrap>
      <Button type="primary" onClick={showDeleteUserConfirm}>
        Delete user
      </Button>
    </Space>
  );
};

export default App;
