import React from 'react';
import { useForm, FieldError } from 'react-hook-form';
import { Box, Button } from 'style';
import Form from 'component/Form/Form';
import { CREATE_MESSAGE } from './message.graphql';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/react-hooks';
import { useAuthState } from 'utils/auth';
import ErrorMessage from 'component/ErrorMessage/ErrorMessage';

type MessageForm = {
  addressee: string;
  sender: string;
  message: number;
  timestamp: number;
  mutationError?: FieldError;
};

type Props = { setIsOpen: (arg: boolean) => void };

const MessageDialog: React.FC<Props> = ({ setIsOpen }) => {
  const { user } = useAuthState();
  const { register, setError, errors, handleSubmit, reset } = useForm<
    MessageForm
  >();

  const [sendMessage] = useMutation(CREATE_MESSAGE, {
    onError: error => {
      setError(
        'mutationError',
        'mutationError',
        error.graphQLErrors[0].message,
      );
    },
    onCompleted: () => {
      reset();
      toast.success('Message has been sent', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
  });

  const onSubmit = handleSubmit(({ addressee, message }) => {
    sendMessage({
      variables: {
        sender: user!.name,
        addressee: addressee,
        message: message,
      },
    });
  });

  return (
    <Form onSubmit={onSubmit}>
      <Box display={'flex'} flexDirection="column" alignItems="center" p={20}>
        <label htmlFor="addressee">
          <span>Addressee</span>
        </label>
        <input
          type="text"
          placeholder="Enter Addressee"
          name="addressee"
          ref={register({
            required: 'Addressee is required',
            validate: value => {
              if (value === user!.name)
                return 'You can not send message to yourself';
            },
          })}
        />
        <ErrorMessage errors={errors} name={'addressee'} />
        <label htmlFor="message">
          <span>Message</span>
        </label>
        <textarea
          cols={6}
          rows={8}
          placeholder="Enter Message"
          name="message"
          ref={register({
            required: 'Message is required',
          })}
        />
        <ErrorMessage errors={errors} name={'message'} />
        <ErrorMessage errors={errors} name={'mutationError'} />
        <Box display="flex" mt={4}>
          <Button
            type="submit"
            p={5}
            color={'secondary.500'}
            boxShadow="neumorphism"
            mr={5}
          >
            Submit
          </Button>

          <Button
            onClick={() => setIsOpen(false)}
            p={5}
            color={'danger.500'}
            boxShadow="neumorphism"
            type={'button'}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Form>
  );
};

export default MessageDialog;
