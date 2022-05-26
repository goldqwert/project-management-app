import Button from '../../components/Button/Button';

import { ErrorProps } from './types';

const ErrorView = ({ handleClick }: ErrorProps) => (
  <div className="error-content">
    <p>
      Page is not found
      <Button onClick={handleClick}>Come back to welcome page</Button>
    </p>
  </div>
);
export default ErrorView;
