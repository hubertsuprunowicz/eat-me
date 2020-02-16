import React from 'react';

type Props = {
  error?: string;
};

// TODO: Create error view
const ErrorView: React.FC<Props> = ({ children, error }) => {
  return <>Error View ----------------------- {error ? error : ''}</>;
};

export default ErrorView;
