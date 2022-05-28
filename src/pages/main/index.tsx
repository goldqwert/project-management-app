import { Layout } from 'antd';
import { useAuth } from '../../hooks';

import './index.scss';

const { Content } = Layout;

const MainPage = () => {
  useAuth();

  return (
    <Content className="welcome">
      <div className="welcome__content"></div>
    </Content>
  );
};

export default MainPage;
