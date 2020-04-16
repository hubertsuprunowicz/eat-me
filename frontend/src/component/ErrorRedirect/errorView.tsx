import React from 'react';
import { LinkButton, Box, Text } from 'style';
import { RECIPES_VIEW } from 'view/Route/constants.route';

const ErrorView: React.FC = () => {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      alignContent={'center'}
      height={'100vh'}
    >
      <Text variant="cursive" fontSize={80} fontWeight={400}>
        Opss...
      </Text>
      <Text mt={4}>Something went wrong</Text>
      <LinkButton to={`${RECIPES_VIEW}`} mt={7}>
        Go Back
      </LinkButton>
    </Box>
  );
};

export default ErrorView;
