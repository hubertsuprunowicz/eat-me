import React from 'react';
import { Box, Text } from 'style';

const NoRecords: React.FC = ({ children }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="50vh"
      p={0}
      textAlign={'center'}
    >
      <Text p={9} fontSize={4}>
        {children}
      </Text>
    </Box>
  );
};

export default NoRecords;
