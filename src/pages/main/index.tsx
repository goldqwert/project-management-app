import { Layout } from 'antd';

import './index.scss';

const { Content } = Layout;

const MainPage = () => (
  <Content className="welcome">
    <div className="welcome__content"></div>
  </Content>
);

export default MainPage;
