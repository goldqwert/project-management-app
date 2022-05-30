import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: IChildren) => {
  const [cookies] = useCookies(['authToken']);

  return cookies.authToken ? children : <Navigate to="/" />;
};

export default PrivateRoute;
