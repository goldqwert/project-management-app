import { WithTranslation } from 'react-i18next';

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps extends WithTranslation {
  children: React.ReactNode;
}

export type { ErrorBoundaryProps, ErrorBoundaryState };
