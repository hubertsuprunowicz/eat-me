import React, { useState } from 'react';
import { Box, Button } from 'style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faFilter } from '@fortawesome/free-solid-svg-icons';
import { MessageList } from './message.view.style';
import FormModal from 'component/FormModal/FormModal';
import MessageDialog from './MessageDialog';
import { useAuthState } from 'utils/auth';
import { useQuery } from '@apollo/react-hooks';
import { YOUR_MESSAGES } from './message.graphql';

type Props = {};

const MessageView: React.FC<Props> = () => {
  const { user } = useAuthState();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { loading, data } = useQuery(YOUR_MESSAGES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      name: user ? user.name : undefined,
    },
  });

  if (loading) return <>loading...</>;

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
        {data &&
          data.messages.map(
            ({ _id, title, message, timestamp, addressee }: any) => (
              <li key={_id}>
                <img
                  src="https://www.gdansk.pl/download/2019-09/135042.jpg"
                  alt=""
                />
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  ml={5}
                >
                  <b style={{ fontSize: '14px' }}>{title}</b>
                  <span style={{ fontSize: '10px', color: 'grey' }}>
                    {message}
                  </span>
                </Box>
              </li>
            )
          )}
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
