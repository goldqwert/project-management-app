import { Layout } from 'antd';
import { useCookies } from 'react-cookie';

import { Footer, Header } from './components';
import { AppRoutes } from './routes';

const App = () => {
  const [cookies] = useCookies(['authToken', 'lang', 'authUserId']);

  return (
    <Layout className="layout">
      {cookies.authToken && cookies.authUserId && <Header />}
      <AppRoutes />
      <Footer />
    </Layout>
  );
};

export default App;
