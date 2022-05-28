import { Typography } from 'antd';
import { Spin } from 'antd';

import './index.scss';

const { Title } = Typography;

const LoadingPage = () => (
  <div className="loading">
    <Title>Loading... Please wait</Title>
    <Spin />
  </div>
);

export default LoadingPage;
