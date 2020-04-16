import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button } from 'style';
import Form from 'component/Form/Form';
import { SEND_MESSAGE, GET_USER } from './message.graphql';
import { toast } from 'react-toastify';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { useAuthState } from 'utils/auth';

type MessageForm = {
  addressee: string;
  sender: string;
  message: number;
  timestamp: number;
};

export function isEmpty(obj: Object) {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}

type Props = { setIsOpen: (arg: boolean) => void };

const MessageDialog: React.FC<Props> = ({ setIsOpen }) => {
  const { user } = useAuthState();
  const {
    getValues,
    register,
    setError,
    errors,
    triggerValidation,
    reset,
  } = useForm<MessageForm>();

  const [getUser] = useLazyQuery(GET_USER, {
    onError: _ => {
      toast.error('Something has failed', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
    onCompleted: data => {
      if (!user) throw new Error('Not authorized exception');
      if (data.user._id === user._id) {
        setError('sender', 'yourself', 'you can not send message to yourself');
        return;
      }

      const { message } = getValues();

      if (!data.user) {
        setError('addressee', 'notFound', 'provided name does not exist');
        return;
      }

      if (!isEmpty(errors)) return;

      sendMessage({
        variables: {
          senderID: parseInt(user._id.toString()),
          addresseeID: parseInt(data.user._id),
          message: message,
          timestamp: Date.now(),
        },
      }).then(() => reset());

      setIsOpen(false);
    },
  });

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onError: _ => {
      toast.error('Something has failed', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
    onCompleted: () => {
      toast.success('Message has been sent', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
  });

  return (
    <Form>
      <Box display={'flex'} flexDirection="column" alignItems="center" p={20}>
        <label htmlFor="addressee">
          <span>Addressee</span>
        </label>
        <input
          type="text"
          placeholder="Enter Addressee"
          name="addressee"
          ref={register({
            required: true,
          })}
        />
        {errors.addressee &&
          errors.addressee.type === 'required' &&
          'Your input is required'}
        {errors.addressee && errors.addressee.message}
        {errors.sender && errors.sender.message}
        <label htmlFor="message">
          <span>Message</span>
        </label>
        <textarea
          cols={6}
          rows={8}
          placeholder="Enter Message"
          name="message"
          ref={register({
            required: true,
          })}
        />
        {errors.message &&
          errors.message.type === 'required' &&
          'Your input is required'}
        <Box display="flex" mt={4}>
          <Button
            type="submit"
            p={5}
            color={'secondary.500'}
            boxShadow="neumorphism"
            mr={5}
            onClick={e => {
              e.preventDefault();
              triggerValidation();

              return getUser({
                variables: {
                  name: getValues().addressee,
                },
              });
            }}
          >
            Submit
          </Button>

          <Button
            onClick={() => setIsOpen(false)}
            p={5}
            color={'danger.500'}
            boxShadow="neumorphism"
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Form>
  );
};

export default MessageDialog;
