import React from 'react';
import { StyledComment } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import { formatDistance } from 'date-fns';
import { Box, Text } from 'style';

type Props = {
  rating: number;
  timestamp: number;
  username: string;
};

const Comment: React.FC<Props> = ({
  timestamp,
  username,
  children,
  rating,
}) => {
  return (
    <StyledComment>
      <Box display={'flex'} justifyContent="space-between">
        <FontAwesomeIcon size={'lg'} icon={faQuoteRight} />
        <Box
          ml={4}
          display={'flex'}
          flexDirection={'column'}
          textAlign={'right'}
        >
          <Text className={'pre-text'} fontSize="0.6rem">
            {username}
          </Text>
          <Text mt={3} fontSize="0.5rem">
            <i>{formatDistance(timestamp, new Date())}</i>
          </Text>
        </Box>
      </Box>

      <Text fontSize={10} m={3} mb={6}>
        {children}
      </Text>
      <Box
        position={'absolute'}
        display={'flex'}
        flexDirection={'column'}
        bottom={3}
        right={5}
      >
        <Text fontSize="0.7rem" fontWeight={700}>
          {rating}/5
        </Text>
      </Box>
    </StyledComment>
  );
};

export default Comment;
