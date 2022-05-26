import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCookie } from 'typescript-cookie';

const RequireAuth = ({ children }: any) => {
  const token = getCookie('id');

  return !token ? <Navigate to="/" /> : children;
};
export { RequireAuth };
