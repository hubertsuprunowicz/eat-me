import React, { useState } from 'react';
import { StyledComment } from './comment.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons';

type Props = {};

const Comment: React.FC = () => {
  return (
    <StyledComment>
      <FontAwesomeIcon size={'lg'} icon={faQuoteRight} />
      <span style={{ fontSize: '0.5rem', textAlign: 'right', float: 'right' }}>
        Username88
      </span>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod
        tempor incididunt ut labore et dolore magna.
      </p>
    </StyledComment>
  );
};

export default Comment;
