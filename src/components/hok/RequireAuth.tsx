import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate} from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import MainPage from '../MainPage/MainPage';

 const RequireAuth = () => {
  const { isAuth } = useSelector((state: RootState) => state.signIn);
  // Если у нас есть пользователь(token) - то перебросить на main route
   return !isAuth ? <Navigate to="/sign-up" /> : <MainPage />;

};
 export { RequireAuth };
