import { Component, ErrorInfo } from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

import { ErrorBoundaryProps, ErrorBoundaryState } from './types';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Uncaught error:', error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <Result
          status="error"
          subTitle="Sorry, something went wrong."
          extra={
            <Button type="link">
              <Link to="/">Go to home</Link>
            </Button>
          }
        />
      );
    }

    return children;
  }
}

export default ErrorBoundary;
