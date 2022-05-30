import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const useCookiesStorage = (deps: string[]) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(deps);

  const onLogout = () => {
    console.log('exit');
    removeCookie('authToken');
    removeCookie('authUserId');
    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  return {
    cookies,
    setCookie,
    removeCookie,
    onLogout,
  };
};

export default useCookiesStorage;
