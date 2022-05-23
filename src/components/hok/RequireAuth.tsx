import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const RequireAuth = ({ children }) => {
  const token = useSelector((state: RootState) => state.signIn.token);
  // const token = getCookie("jwt");
  console.log(token);
  return !token ? <Navigate to="/" /> : children;
};
export { RequireAuth };
