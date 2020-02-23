import React, { useState } from 'react';
import { Box, IconButton, Button } from 'style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisV,
  faPlusCircle,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { MessageList } from './message.view.style';
import FormModal from 'component/FormModal/FormModal';
import MessageDialog from './MessageDialog';

type Props = {};

const MessageView: React.FC<Props> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Box p={6}>
      <Box display={'flex'} justifyContent={'space-between'}>
        <span>Message</span>
        <div>
          <Button
            boxShadow="neumorphism"
            mr={4}
            onClick={() => setIsOpen(true)}
          >
            <FontAwesomeIcon size={'xs'} icon={faPlusCircle} /> Message
          </Button>
          <Button boxShadow="neumorphism">
            <FontAwesomeIcon size={'xs'} icon={faFilter} /> Filter
          </Button>
        </div>
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
      </MessageList>
      <FormModal
        title="Send Message"
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
      >
        <MessageDialog setIsOpen={setIsOpen} />
      </FormModal>
    </Box>
  );
};

export default MessageView;
