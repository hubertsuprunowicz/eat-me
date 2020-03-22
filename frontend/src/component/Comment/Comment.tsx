import React, { useState } from 'react';
import { StyledComment } from './comment.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import { formatDistance } from 'date-fns';
import { Box } from 'style';

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
      <FontAwesomeIcon size={'lg'} icon={faQuoteRight} />
      <Box
        ml={4}
        display={'flex'}
        flexDirection={'column'}
        style={{ fontSize: '0.5rem', textAlign: 'right', float: 'right' }}
      >
        <span style={{ fontSize: '0.6rem' }}>{username}</span>
        <span>
          <i>{formatDistance(timestamp, new Date())}</i>
        </span>
      </Box>
      <p style={{ marginBottom: '16px' }}>{children}</p>
      <Box
        position={'absolute'}
        display={'flex'}
        flexDirection={'column'}
        style={{ fontSize: '0.7rem', bottom: 3, right: 5 }}
      >
        <span>
          <strong>{rating}/5</strong>
        </span>
      </Box>
    </StyledComment>
  );
};

export default Comment;
