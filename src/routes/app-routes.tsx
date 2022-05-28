import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import PrivateRoute from './private-route';
import { LoadingPage, WelcomePage } from '../pages';

import './index.scss';

const SignInPage = lazy(() => import('../pages/sign-in'));
const SignUpPage = lazy(() => import('../pages/sign-up'));
const MainPage = lazy(() => import('../pages/main'));
const ErrorPage = lazy(() => import('../pages/error'));
const EditProfile = lazy(() => import('../pages/edit-profile'));

const AppRoutes = () => (
  <Suspense fallback={<LoadingPage />}>
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route
        path="/main"
        element={
          <PrivateRoute>
            <MainPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit-profile"
        element={
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
