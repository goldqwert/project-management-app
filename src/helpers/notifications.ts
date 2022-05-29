import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotificaionConfig {
  message: string;
  description?: string;
}

const openNotification = (type: NotificationType, message: string, description?: string) => {
  const notificationsConfig: NotificaionConfig = { message };

  if (description) {
    notificationsConfig.description = description;
  }

  notification[type](notificationsConfig);
};

export default openNotification;
