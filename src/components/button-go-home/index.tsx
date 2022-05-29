import { Button } from 'antd';
import { Link } from 'react-router-dom';

const ButtonGoHome = () => (
  <Button type="primary">
    <Link to="/">Go to home</Link>
  </Button>
);

export default ButtonGoHome;
