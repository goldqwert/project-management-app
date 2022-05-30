import { Layout, Result } from 'antd';
import { useTranslation } from 'react-i18next';
import { ButtonGoHome } from '../../components';

import './index.scss';

const { Content } = Layout;

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <Content className="error">
      <Result status="404" title="404" subTitle={t('page404')} extra={<ButtonGoHome />} />
    </Content>
  );
};

export default ErrorPage;
