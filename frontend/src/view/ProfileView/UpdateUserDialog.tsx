import React, { useState } from 'react';
import { useForm, FieldError } from 'react-hook-form';
import { Box, Button } from 'style';
import Form from 'component/Form/Form';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_USER } from './profile.graphql';
import User from 'model/user';
import { Textarea } from './styles';
import ErrorMessage from 'component/ErrorMessage/ErrorMessage';

type EditUserForm = {
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
  avatar: string;
  description: string;
  mutationError?: FieldError;
};

type Props = {
  refetch: () => void;
  user: User;
  setIsOpen: (arg: boolean) => void;
};

function isEmpty(obj: Object) {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}

const UpdateUserDialog: React.FC<Props> = ({ setIsOpen, user, refetch }) => {
  const [paginationForm, setPaginationForm] = useState<boolean>(true);
  const { register, setError, errors, reset, handleSubmit } = useForm<
    EditUserForm
  >({
    defaultValues: {
      name: user.name || '',
      email: user.email || '',
      avatar: user.avatar || '',
      description: user.description || '',
      password: '',
      confirmPassword: '',
    },
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    onError: error => {
      setError(
        'mutationError',
        'mutationError',
        error.graphQLErrors[0].message,
      );
    },
    onCompleted: () => {
      reset();
      setIsOpen(false);
      toast.success('Message has been sent', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      refetch();
    },
  });

  const onSubmit = ({
    name,
    password,
    confirmPassword,
    email,
    avatar,
    description,
  }: EditUserForm) => {
    if (!user) throw new Error('Not authorized exception');
    if (password !== confirmPassword) {
      setError(
        'confirmPassword',
        'notMatch',
        "password confirmation doesn't match password",
      );
      return;
    }

    if (!isEmpty(errors)) return;

    updateUser({
      variables: {
        oldName: user.name,
        name: name === user.name ? null : name,
        password: password,
        email: !user.email || email === user.email ? null : email,
        avatar: avatar,
        description: description,
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Box
        display={paginationForm ? 'flex' : 'none'}
        flexDirection="column"
        alignItems="center"
        p={20}
      >
        <label htmlFor="name">
          <span>Username</span>
        </label>
        <input
          type="text"
          placeholder="Enter Username"
          name="name"
          ref={register({
            minLength: {
              value: 4,
              message: 'Username needs to be at least 4 characters long',
            },
          })}
        />
        <ErrorMessage errors={errors} name={'name'} />
        <label htmlFor="password">
          <span>Password</span>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          ref={register({
            minLength: {
              value: 6,
              message: 'Password needs to be at least 6 characters long',
            },
          })}
        />
        <ErrorMessage errors={errors} name={'password'} />
        <label htmlFor="confirmPassword">
          <input
            type="password"
            placeholder="Enter Confirm Password"
            name="confirmPassword"
            ref={register}
          />
          <ErrorMessage errors={errors} name={'confirmPassword'} />
        </label>
        <label htmlFor="email">
          <span>Email</span>
        </label>
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          ref={register({
            minLength: {
              value: 4,
              message: 'Email needs to be at least 4 characters long',
            },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Email address did not pass validation',
            },
          })}
        />
        <ErrorMessage errors={errors} name={'email'} />
      </Box>
      <Box
        display={paginationForm ? 'none' : 'flex'}
        flexDirection="column"
        alignItems="center"
        p={20}
      >
        <label htmlFor="avatar">
          <span>Avatar</span>
        </label>
        <input
          type="text"
          placeholder="Enter Avatar Url"
          name="avatar"
          ref={register({
            minLength: {
              value: 4,
              message: 'Link to avatar needs to be at least 4 characters long',
            },
          })}
        />
        <ErrorMessage errors={errors} name={'avatar'} />
        <label htmlFor="description">
          <span>Description</span>
        </label>
        <Textarea
          cols={6}
          rows={8}
          className={'widder'}
          placeholder="Enter Description"
          name="description"
          ref={register({
            minLength: {
              value: 4,
              message: 'Description needs to be at least 4 characters long',
            },
            maxLength: {
              value: 460,
              message: 'Description needs to be at most 460 characters long',
            },
          })}
        />
        <ErrorMessage errors={errors} name={'description'} />
        <ErrorMessage errors={errors} name={'mutationError'} />
      </Box>
      <Box mb={6} width="100%" display="flex" justifyContent="space-between">
        <Box display="flex" justifyContent="flex-start">
          <Button
            type="button"
            p={5}
            color={'grey.700'}
            boxShadow={paginationForm ? 'insetNeo' : 'neumorphism'}
            mr={5}
            onClick={() => setPaginationForm(!paginationForm)}
          >
            1
          </Button>
          <Button
            type="button"
            p={5}
            color={'grey.700'}
            boxShadow={paginationForm ? 'neumorphism' : 'insetNeo'}
            onClick={() => setPaginationForm(!paginationForm)}
          >
            2
          </Button>
        </Box>
        <Box display="flex" justifyContent="flex-end">
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
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Form>
  );
};

export default UpdateUserDialog;
