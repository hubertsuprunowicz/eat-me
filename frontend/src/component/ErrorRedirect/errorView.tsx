import React from 'react';
import { LinkButton, Box } from 'style';
import { RECIPES_VIEW } from 'view/Route/constants.route';

type Props = {
  error?: string;
};

// TODO: Create error view
const ErrorView: React.FC<Props> = ({ children, error }) => {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      alignContent={'center'}
      height={'100vh'}
    >
      Error View ----------------------- {error ? error : ''}
      <LinkButton
        to={`${RECIPES_VIEW}`}
        color={'warn.600'}
        borderRadius={'5px'}
        boxShadow={'neumorphism'}
      >
        Go Back
      </LinkButton>
    </Box>
  );
};

export default ErrorView;
