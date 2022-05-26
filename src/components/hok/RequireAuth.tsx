import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCookie } from 'typescript-cookie';
import { RootState } from '../../types/types';

const RequireAuth = ({ children }) => {
  // const token = useSelector((state: RootState) => state.signIn.token);
  const token = getCookie('id');
  return !token ? <Navigate to="/" /> : children;
};
export { RequireAuth };
