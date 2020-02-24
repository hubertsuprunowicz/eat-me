import React, { useState, useEffect } from 'react';
import useForm from 'react-hook-form';
import { Box, Button } from 'style';
import Form from 'component/Form/Form';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/react-hooks';
import { useAuthState } from 'utils/auth';
import { EDIT_USER } from './profile.graphql';
import User from 'model/user';
import { Textarea } from './profile.view.style';

type EditUserForm = {
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
  avatar: string;
  description: string;
};

type Props = { user: User; setIsOpen: (arg: boolean) => void };

const EditUserDialog: React.FC<Props> = ({ setIsOpen, user }) => {
  const [, resetComponent] = useState();
  const [paginationForm, setPaginationForm] = useState<boolean>(true);
  const {
    handleSubmit,
    getValues,
    setValue,
    register,
    setError,
    errors,
    triggerValidation,
    reset,
  } = useForm<EditUserForm>();

  useEffect(() => {
    setValue('name', user.name);
    setValue('email', user.email);
    setValue('avatar', user.avatar);
    setValue('description', user.description);
  }, []);

  const [editUser] = useMutation(EDIT_USER, {
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

  const onSubmit = ({
    name,
    password,
    confirmPassword,
    email,
    avatar,
    description,
  }: EditUserForm) => {
    console.log('EDIT USER');
    console.log(name, password, confirmPassword, email, avatar, description);
  };

  return (
    <Form>
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
          ref={register}
        />
        <label htmlFor="password">
          <span>Password</span>
        </label>
        <input
          type="text"
          placeholder="Enter Password"
          name="password"
          ref={register}
        />
        <label htmlFor="confirmPassword">
          <input
            type="text"
            placeholder="Enter Confirm Password"
            name="confirmPassword"
            ref={register}
          />
        </label>

        <label htmlFor="email">
          <span>Email</span>
        </label>
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          ref={register}
        />
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
          ref={register}
        />
        <label htmlFor="description">
          <span>Description</span>
        </label>
        <Textarea
          cols={6}
          rows={8}
          className={'widder'}
          placeholder="Enter Description"
          name="description"
          ref={register}
        />
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
            onClick={e => {
              e.preventDefault();
              triggerValidation();
              onSubmit(getValues());
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

export default EditUserDialog;
