import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import { usersService } from '../api';
import { logout } from '../store';
import { useAppDispatch } from './redux';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [cookies] = useCookies();

  useEffect(() => {
    checkUserAuth();
  }, []);

  const checkUserAuth = async () => {
    const authData = cookies?.['persist%3Aroot']?.auth;

    let authUserId = '';
    let authToken = '';

    if (authData) {
      const parsedAuthData = JSON.parse(authData);

      authUserId = parsedAuthData.authUserId;
      authToken = parsedAuthData.authToken;
    }

    try {
      await usersService.getUser(authUserId, authToken);
    } catch (error) {
      dispatch(logout());
      navigate('/');
    }
  };
};

export default useAuth;
