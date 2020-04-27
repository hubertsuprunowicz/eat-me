import React from 'react';
import { Box, Text } from 'style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const NoRecords: React.FC<{ mt?: number; infomation?: string }> = ({
  children,
  mt,
  infomation,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection={'column'}
      alignItems="center"
      width="100%"
      height="50vh"
      mt={mt}
      p={0}
      pl={5}
      pr={5}
      textAlign={'center'}
    >
      <Text variant={'cursive'} p={10} pb={0} fontSize={38}>
        {children}
      </Text>
      {infomation && (
        <Box mt={6} p={6} color="danger.500">
          <FontAwesomeIcon icon={faInfoCircle} />
          <Text ml={2}>
            Watches View is place with recipes created by subscribed users
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default NoRecords;
