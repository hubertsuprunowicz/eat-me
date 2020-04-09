import React, { useState, useRef } from 'react';
import { Box, Button, Text, IconButton, LinkIconButton } from 'style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MessageList } from './message.view.style';
import FormModal from 'component/FormModal/FormModal';
import MessageDialog from './MessageDialog';
import { useAuthState } from 'utils/auth';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  YOUR_MESSAGES,
  MESSAGE_RECIVED,
  DELETE_MESSAGE,
} from './message.graphql';
import ErrorRedirect from 'component/ErrorRedirect/errorRedirect';
import { formatDistance } from 'date-fns';
import debounce from 'lodash.debounce';
import Form from 'component/Form/Form';
import NoRecords from 'component/NoRecords/NoRecords';
import { toast } from 'react-toastify';
import { PROFILE_VIEW } from 'view/Route/constants.route';

const MessageView: React.FC = () => {
  const { user } = useAuthState();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const searchRef = useRef<any>();
  const [searchBody, setSearchBody] = useState<{
    message?: string;
    by?: string;
  }>({});

  const { data, loading, subscribeToMore, refetch, updateQuery } = useQuery(
    YOUR_MESSAGES,
    {
      fetchPolicy: 'cache-and-network',
      variables: {
        name: user!.name,
        ...searchBody,
      },
    },
  );

  const [deleteMessage] = useMutation(DELETE_MESSAGE, {
    onError: _ => {
      toast.error('Something has failed', {
        delay: 500,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
    onCompleted: data => {
      refetch();
      // TODO: update query via immer after delete
      // updateQuery: (prev, { subscriptionData }) => {
      //   return produce(prev, draft => {
      //     draft = data
      //   });
    },
  });

  const onChange = debounce(
    () => {
      if (searchRef && searchRef.current)
        setSearchBody({ message: searchRef.current.value });
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

  // TODO: pagination
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
        </div>
      </Box>
      <Box mt={8} display="flex" justifyContent="center">
        <Form>
          <input
            ref={searchRef as any}
            onChange={onChange}
            type="search"
            name="search"
            placeholder="Search by message content"
          />
        </Form>
      </Box>
      {/* TODO: loading overlay */}
      {loading ? (
        <>loading...</>
      ) : (
        <MessageList>
          {data && data.messages && data.messages.length < 1 ? (
            <NoRecords>
              Sorry, there is no messages to show. Come back later :)
            </NoRecords>
          ) : (
            data.messages.map(
              ({ _id, title, message, timestamp, sender }: any) => (
                <li key={_id}>
                  <LinkIconButton
                    mr={5}
                    to={`${PROFILE_VIEW}/${sender.name}`}
                    width="35px"
                    height="35px"
                  >
                    <img
                      src="https://www.gdansk.pl/download/2019-09/135042.jpg"
                      alt=""
                    />
                  </LinkIconButton>

                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    ml={5}
                    width={'100%'}
                  >
                    <Box
                      width={'100%'}
                      display="flex"
                      justifyContent="space-between"
                    >
                      <Text fontSize={14} fontWeight={500}>
                        {sender.name}
                      </Text>
                      <Text fontSize={10}>
                        {formatDistance(timestamp, new Date())}
                      </Text>
                    </Box>
                    <Box display="flex" justifyContent={'space-between'}>
                      <Text p={4} pl={0} fontSize={10} color={'grey'}>
                        {message}
                      </Text>
                      <IconButton
                        onClick={() =>
                          deleteMessage({ variables: { id: _id } })
                        }
                        boxShadow="neumorphism"
                        width="33px"
                        height="33px"
                        color="danger.500"
                        borderRadius="50%"
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </IconButton>
                    </Box>
                  </Box>
                </li>
              ),
            )
          )}
        </MessageList>
      )}

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
