import { Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';

import { WelcomePage, ErrorPage } from '../pages';

import './index.scss';

const AppRoutes = () => (
  <>
    <Layout className="layout">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Layout>
  </>
);

export default AppRoutes;
