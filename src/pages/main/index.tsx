import { Layout } from 'antd';
import { Navigate } from 'react-router-dom';
import { useAuth, useCookiesStorage } from '../../hooks';

import './index.scss';

const { Content } = Layout;

const MainPage = () => {
  const { cookies } = useCookiesStorage(['authToken']);

  useAuth();

  if (!cookies.authToken) {
    return <Navigate replace to="/" />;
  }

  return (
    <Content className="welcome">
      <div className="welcome__content"></div>
    </Content>
  );
};

export default MainPage;
