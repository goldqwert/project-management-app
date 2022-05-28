import { Layout } from 'antd';

import { Footer, Header } from './components';
import { useAppSelector } from './hooks';
import { AppRoutes } from './routes';

const App = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  return (
    <Layout className="layout">
      {isAuth && <Header />}
      <AppRoutes />
      <Footer />
    </Layout>
  );
};

export default App;
