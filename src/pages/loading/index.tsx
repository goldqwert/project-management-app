import { Spin, Typography } from 'antd';

import './index.scss';

const { Title } = Typography;

const LoadingPage = () => (
  <div className="loading">
    <Title level={3}>Loading...</Title>
    <Spin />
  </div>
);

export default LoadingPage;
