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
import { isEmpty } from 'view/MessageView/MessageDialog';

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
    formState,
    setValue,
    register,
    setError,
    errors,
    triggerValidation,
    reset,
  } = useForm<EditUserForm>({
    defaultValues: {
      name: user.name || '',
      email: user.email || '',
      avatar: user.avatar || '',
      description: user.description || '',
      password: '',
      confirmPassword: '',
    },
  });

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

  const lengthValidator = (field: string, value: string) => {
    if (value === '') return false;
    if (value.length < 4) {
      setError(
        field as
          | 'name'
          | 'email'
          | 'avatar'
          | 'description'
          | 'password'
          | 'confirmPassword',
        'length',
        `${field} need to be at least 4 characters long`
      );
      return true;
    }

    return false;
  };

  const emailIsNotValid = (email: string) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('email', 'notValid', `email is not valid`);
      return true;
    }

    return false;
  };

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
        "password confirmation doesn't match password"
      );
    }

    lengthValidator('name', name);
    lengthValidator('password', password);
    lengthValidator('email', email);
    lengthValidator('avatar', avatar);
    lengthValidator('description', description);
    emailIsNotValid(email);

    if (!isEmpty(errors)) return;

    editUser({
      variables: {
        oldName: user.name,
        name: name,
        password: password,
        email: email,
        avatar: avatar,
        description: description,
      },
    }).then(() => {
      reset();
      setIsOpen(false);
    });
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
        {errors.name && errors.name.message}
        <label htmlFor="password">
          <span>Password</span>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          ref={register}
        />
        {errors.password && errors.password.message}
        <label htmlFor="confirmPassword">
          <input
            type="password"
            placeholder="Enter Confirm Password"
            name="confirmPassword"
            ref={register}
          />
          {errors.confirmPassword && errors.confirmPassword.message}
        </label>
        <label htmlFor="email">
          <span>Email</span>
        </label>
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          ref={register}
        />
        {errors.email && errors.email.message}
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
        {errors.avatar && errors.avatar.message}
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
        {errors.description && errors.description.message}
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
