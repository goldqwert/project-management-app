import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import PrivateRoute from './private-route';
import { LoadingPage, BoardsPage, BoardDetailsPage, WelcomePage } from '../pages';

import './index.scss';

const SignInPage = lazy(() => import('../pages/sign-in'));
const SignUpPage = lazy(() => import('../pages/sign-up'));
const ErrorPage = lazy(() => import('../pages/error'));
const EditProfile = lazy(() => import('../pages/edit-profile'));
// const BoardDetailsPage = lazy(() => import('../pages/boards-details'));

const AppRoutes = () => (
  <Suspense fallback={<LoadingPage />}>
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="sign-in" element={<SignInPage />} />
      <Route path="sign-up" element={<SignUpPage />} />
      <Route
        path="boards"
        element={
          <PrivateRoute>
            <BoardsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="boards/:boardId"
        element={
          <PrivateRoute>
            <BoardDetailsPage />
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
