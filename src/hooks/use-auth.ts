import { useEffect } from 'react';

import useCookiesStorage from './use-cookies-storage';
import { usersService } from '../api';

const useAuth = () => {
  const { onLogout } = useCookiesStorage([]);

  useEffect(() => {
    checkUserAuth();
    window.addEventListener('storage', checkUserAuth);
  }, []);

  const checkUserAuth = async () => {
    const userToken = localStorage.getItem('authToken');
    const userId = localStorage.getItem('authUserId');

    let id = '';
    let token = '';

    if (userToken && userId) {
      id = userId;
      token = userToken;
    }

    try {
      await usersService.getUser(id, token);
    } catch (error) {
      onLogout();
    }
  };
};

export default useAuth;
