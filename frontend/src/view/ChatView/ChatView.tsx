import React from 'react';
import { Box, IconButton } from 'style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { MessageList } from './chat.view.style';

type Props = {};

const ChatView: React.FC<Props> = () => {
  return (
    <Box p={5} width={'100%'}>
      <Box display={'flex'} justifyContent={'space-between'}>
        <span>Chat</span>
        <IconButton bg="transparent">
          <FontAwesomeIcon icon={faEllipsisV} />
        </IconButton>
      </Box>
      <MessageList>
        {/* TODO: Link */}
        <li>
          <img src="https://www.gdansk.pl/download/2019-09/135042.jpg" alt="" />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            ml={5}
          >
            <b style={{ fontSize: '14px' }}>Lorem ipsum</b>
            <span style={{ fontSize: '10px', color: 'grey' }}>
              his defines the default size of an element before the remaining
              space is distributed.
            </span>
          </Box>
        </li>
        <li>
          <img src="https://www.gdansk.pl/download/2019-09/135042.jpg" alt="" />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            ml={5}
          >
            <b style={{ fontSize: '14px' }}>Lorem ipsum</b>
            <span style={{ fontSize: '10px', color: 'grey' }}>
              his defines the default size of an element before the remaining
              space is distributed.
            </span>
          </Box>
        </li>
        <li>
          <img src="https://www.gdansk.pl/download/2019-09/135042.jpg" alt="" />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            ml={5}
          >
            <b style={{ fontSize: '14px' }}>Lorem ipsum</b>
            <span style={{ fontSize: '10px', color: 'grey' }}>
              his defines the default size of an element before the remaining
              space is distributed.
            </span>
          </Box>
        </li>
        <li>
          <img src="https://www.gdansk.pl/download/2019-09/135042.jpg" alt="" />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            ml={5}
          >
            <b style={{ fontSize: '14px' }}>Lorem ipsum</b>
            <span style={{ fontSize: '10px', color: 'grey' }}>
              his defines the default size of an element before the remaining
              space is distributed.
            </span>
          </Box>
        </li>
        <li>
          <img src="https://www.gdansk.pl/download/2019-09/135042.jpg" alt="" />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            ml={5}
          >
            <b style={{ fontSize: '14px' }}>Lorem ipsum</b>
            <span style={{ fontSize: '10px', color: 'grey' }}>
              his defines the default size of an element before the remaining
              space is distributed.
            </span>
          </Box>
        </li>
        <li>
          <img src="https://www.gdansk.pl/download/2019-09/135042.jpg" alt="" />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            ml={5}
          >
            <b style={{ fontSize: '14px' }}>Lorem ipsum</b>
            <span style={{ fontSize: '10px', color: 'grey' }}>
              his defines the default size of an element before the remaining
              space is distributed.
            </span>
          </Box>
        </li>
        <li>
          <img src="https://www.gdansk.pl/download/2019-09/135042.jpg" alt="" />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            ml={5}
          >
            <b style={{ fontSize: '14px' }}>Lorem ipsum</b>
            <span style={{ fontSize: '10px', color: 'grey' }}>
              his defines the default size of an element before the remaining
              space is distributed.
            </span>
          </Box>
        </li>
        <li>
          <img src="https://www.gdansk.pl/download/2019-09/135042.jpg" alt="" />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            ml={5}
          >
            <b style={{ fontSize: '14px' }}>Lorem ipsum</b>
            <span style={{ fontSize: '10px', color: 'grey' }}>
              his defines the default size of an element before the remaining
              space is distributed.
            </span>
          </Box>
        </li>
        <li>
          <img src="https://www.gdansk.pl/download/2019-09/135042.jpg" alt="" />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            ml={5}
          >
            <b style={{ fontSize: '14px' }}>Lorem ipsum</b>
            <span style={{ fontSize: '10px', color: 'grey' }}>
              his defines the default size of an element before the remaining
              space is distributed.
            </span>
          </Box>
        </li>
        <li>
          <img src="https://www.gdansk.pl/download/2019-09/135042.jpg" alt="" />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            ml={5}
          >
            <b style={{ fontSize: '14px' }}>Lorem ipsum</b>
            <span style={{ fontSize: '10px', color: 'grey' }}>
              his defines the default size of an element before the remaining
              space is distributed.
            </span>
          </Box>
        </li>
        <li>
          <img src="https://www.gdansk.pl/download/2019-09/135042.jpg" alt="" />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            ml={5}
          >
            <b style={{ fontSize: '14px' }}>Lorem ipsum</b>
            <span style={{ fontSize: '10px', color: 'grey' }}>
              his defines the default size of an element before the remaining
              space is distributed.
            </span>
          </Box>
        </li>
        <li>
          <img src="https://www.gdansk.pl/download/2019-09/135042.jpg" alt="" />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            ml={5}
          >
            <b style={{ fontSize: '14px' }}>Lorem ipsum</b>
            <span style={{ fontSize: '10px', color: 'grey' }}>
              his defines the default size of an element before the remaining
              space is distributed.
            </span>
          </Box>
        </li>
        <li>
          <img src="https://www.gdansk.pl/download/2019-09/135042.jpg" alt="" />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            ml={5}
          >
            <b style={{ fontSize: '14px' }}>Lorem ipsum</b>
            <span style={{ fontSize: '10px', color: 'grey' }}>
              his defines the default size of an element before the remaining
              space is distributed.
            </span>
          </Box>
        </li>
      </MessageList>
    </Box>
  );
};

export default ChatView;
