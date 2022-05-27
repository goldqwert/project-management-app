import { Layout, Result, Button } from 'antd';
import { Link } from 'react-router-dom';

import './index.scss';

const { Content } = Layout;

const ErrorPage = () => (
  <Content className="error">
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="link">
          <Link to="/">Go to home</Link>
        </Button>
      }
    />
  </Content>
);

export default ErrorPage;
