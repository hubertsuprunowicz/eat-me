import React from 'react';
import { Redirect } from 'react-router-dom';
import { LOGIN_VIEW, ERROR_VIEW } from 'utils/constants.route';
import { ApolloError } from 'apollo-client';

type Props = {
  error: ApolloError | string;
};

const checkIfNotAuthorized = (error: ApolloError): boolean => {
  return (
    error.graphQLErrors &&
    error.graphQLErrors[0] &&
    error.graphQLErrors[0].message.includes('No authorization token')
  );
};

const ErrorRedirect: React.FC<Props> = ({ error }) => {
  if (typeof error === 'string') {
    return <Redirect to={ERROR_VIEW} />;
  }

  const errorMessage = error.networkError
    ? error.networkError.message
    : error.graphQLErrors[0].message;

  // TODO: pass error message to error view
  // currently solution not working
  return checkIfNotAuthorized(error) ? (
    <Redirect to={LOGIN_VIEW} />
  ) : (
    <Redirect
      to={{
        pathname: ERROR_VIEW,
        state: { error: errorMessage },
        key: errorMessage,
      }}
    />
  );
};

export default ErrorRedirect;
