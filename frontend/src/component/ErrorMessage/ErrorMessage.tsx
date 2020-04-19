import React from 'react';
import { ErrorMessage as InternalErrorMessage } from 'react-hook-form';
import { Text } from 'style';

type Props = any;

const ErrorMessage: React.FC<Props> = ({ name, errors, message, children }) => {
  return (
    <InternalErrorMessage name={name} errors={errors} message={message}>
      {({ message }: any) => (
        <Text width="260px" mt={1} fontSize={0} color="danger.700">
          {children}
          {message}
        </Text>
      )}
    </InternalErrorMessage>
  );
};

export default ErrorMessage;
