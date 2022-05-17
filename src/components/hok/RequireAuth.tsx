import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import MainPage from '../../Pages/MainPage/MainPage';

const RequireAuth = () => {
  const { isAuth } = useSelector((state: RootState) => state.signIn);

  return !isAuth ? <Navigate to="/sign-up" /> : <MainPage />;
};
export { RequireAuth };
