import { Component, ErrorInfo } from 'react';
import { Result } from 'antd';

import { ErrorBoundaryProps, ErrorBoundaryState } from './types';
import ButtonGoHome from '../button-go-home';

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
        <Result status="error" subTitle="Sorry, something went wrong." extra={<ButtonGoHome />} />
      );
    }

    return children;
  }
}

export default ErrorBoundary;
