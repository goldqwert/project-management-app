import { useEffect } from 'react';

import useCookiesStorage from './use-cookies-storage';
import { usersService } from '../api';

const useAuth = () => {
  const { cookies, onLogout } = useCookiesStorage([]);

  useEffect(() => {
    checkUserAuth();
  }, []);

  const checkUserAuth = async () => {
    const { authUserId, authToken } = cookies;

    let id = '';
    let token = '';

    if (authUserId && authToken) {
      id = authUserId;
      token = authToken;
    }

    try {
      await usersService.getUser(id, token);
    } catch (error) {
      onLogout();
    }
  };
};

export default useAuth;
