import { Spin, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import './index.scss';

const { Title } = Typography;

const LoadingPage = () => {
  const { t } = useTranslation();

  return (
    <div className="loading">
      <Title level={3}>{t('loading')}</Title>
      <Spin />
    </div>
  );
};

export default LoadingPage;
