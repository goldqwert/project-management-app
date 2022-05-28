import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../hooks';

const PrivateRoute = ({ children }: IChildren) => {
  const authToken = useAppSelector((state) => state.auth.authToken);

  return authToken ? children : <Navigate to="/" />;
};

export default PrivateRoute;
