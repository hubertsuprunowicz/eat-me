import React, { useState, useRef } from 'react';
import { Box, Button } from 'style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faFilter } from '@fortawesome/free-solid-svg-icons';
import { MessageList } from './message.view.style';
import FormModal from 'component/FormModal/FormModal';
import MessageDialog from './MessageDialog';
import { useAuthState } from 'utils/auth';
import { useQuery } from '@apollo/react-hooks';
import { YOUR_MESSAGES, MESSAGE_RECIVED } from './message.graphql';
import ErrorRedirect from 'component/ErrorRedirect/errorRedirect';
import { format, formatDistance, formatRelative, subDays } from 'date-fns';
import debounce from 'lodash.debounce';

type Props = {};

const MessageView: React.FC<Props> = () => {
  const { user } = useAuthState();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const searchRef = useRef<any>();
  const [searchBody, setSearchBody] = useState<{
    message?: string;
    by?: string;
  }>({});

  const { data, loading, subscribeToMore } = useQuery(YOUR_MESSAGES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      name: user!.name,
      // ...searchBody
    },
  });

  const onChange = debounce(
    () => {
      if (searchRef && searchRef.current) console.log(searchRef.current.value);
    },
    200,
    { maxWait: 250 },
  );

  subscribeToMore({
    document: MESSAGE_RECIVED,
    variables: { id: user!._id },
    onError: err => {
      return <ErrorRedirect error={err.message} />;
    },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev.messages;

      // Needed due to multiple resubscriptions
      if (
        prev.messages.length > 0 &&
        prev.messages[prev.messages.length - 1]._id ===
          subscriptionData.data.messageRecived._id
      )
        return prev.messages;

      return {
        messages: [
          ...prev.messages,
          { ...subscriptionData.data.messageRecived },
        ],
      };
    },
  });

  if (loading) return <>loading...</>;

  return (
    <Box pt={6} style={{ paddingBottom: '80px' }}>
      <Box pl={6} pr={6} display={'flex'} justifyContent={'space-between'}>
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
      <Box>
        <input
          ref={searchRef as any}
          onChange={onChange}
          type="search"
          name="search"
          placeholder="Search.."
        />
      </Box>
      <MessageList>
        {/* TODO: Link */}
        {data.messages &&
          data.messages.map(
            ({ _id, title, message, timestamp, sender }: any) => (
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
                  width={'100%'}
                >
                  <Box display="flex" justifyContent="space-between">
                    <b style={{ fontSize: '14px' }}>{sender.name}</b>
                    <span style={{ fontSize: '10px' }}>
                      {formatDistance(timestamp, new Date())}
                    </span>
                  </Box>
                  <span style={{ fontSize: '10px', color: 'grey' }}>
                    {message}
                  </span>
                </Box>
              </li>
            ),
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
