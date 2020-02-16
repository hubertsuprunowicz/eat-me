import React from 'react';
import { Redirect } from 'react-router-dom';
import { LOGIN_VIEW, ERROR_VIEW } from 'view/Route/constants.route';
import { ApolloError } from 'apollo-client';

type Props = {
  error: ApolloError;
};

function checkIfNotAuthorized(error: ApolloError): boolean {
  return (
    error.graphQLErrors &&
    error.graphQLErrors[0] &&
    error.graphQLErrors[0].message.includes('No authorization token')
  );
}

const ErrorRedirect: React.FC<Props> = ({ error }) => {
  return checkIfNotAuthorized(error) ? (
    <Redirect to={LOGIN_VIEW} />
  ) : (
    <Redirect to={ERROR_VIEW} />
  );
};

export default ErrorRedirect;
