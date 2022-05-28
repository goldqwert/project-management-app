import { Layout } from 'antd';

import { Footer, Header } from './components';
import { AppRoutes } from './routes';

const App = () => (
  <Layout className="layout">
    {/* TODO IS AUTH */}
    {false && <Header />}
    <AppRoutes />
    <Footer />
  </Layout>
);

export default App;
