import { Layout, Result } from 'antd';
import { ButtonGoHome } from '../../components';

import './index.scss';

const { Content } = Layout;

const ErrorPage = () => (
  <Content className="error">
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<ButtonGoHome />}
    />
  </Content>
);

export default ErrorPage;
