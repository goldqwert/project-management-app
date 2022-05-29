import { Component, ErrorInfo } from 'react';
import { Typography } from 'antd';

import { ErrorBoundaryProps, ErrorBoundaryState } from './types';

import './index.scss';

const { Title } = Typography;

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
        <div className="boundary">
          <Title level={3}>Sorry, something went wrong.</Title>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
