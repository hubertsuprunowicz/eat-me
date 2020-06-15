import React, { useState } from 'react';
import { useForm, FieldError } from 'react-hook-form';
import { Box, Button } from 'style';
import Form from 'component/Form/Form';
import { toast } from 'react-toastify';
import { Textarea, FileUploadLabel, FileUploadButton } from './styles';
import ErrorMessage from 'component/ErrorMessage/ErrorMessage';
import { User, useUpdateUserMutation } from 'model/generated/graphql';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faUpload } from '@fortawesome/free-solid-svg-icons';

type EditUserForm = {
  name?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
  avatar?: Blob[];
  description?: string;
  mutationError?: FieldError;
};

type Props = {
  refetch: () => void;
  user: User;
  setIsOpen: (arg: boolean) => void;
};

const isEmpty = (obj: Object) => {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
};

const UpdateUserDialog: React.FC<Props> = ({ setIsOpen, user, refetch }) => {
  const [paginationForm, setPaginationForm] = useState<boolean>(true);
  const { register, setError, errors, reset, handleSubmit } = useForm<
    EditUserForm
  >({
    defaultValues: {
      name: user.name || '',
      email: user.email || '',
      description: user.description || '',
      password: '',
      confirmPassword: '',
    },
  });

  const [updateUser] = useUpdateUserMutation({
    onError: (error) => {
      setError(
        'mutationError',
        'mutationError',
        error.graphQLErrors[0].message,
      );
    },
    onCompleted: () => {
      reset();
      setIsOpen(false);
      toast.success('User updated successfuly', {
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

    if (avatar?.[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(avatar[0]);
      reader.onloadend = ({ currentTarget }) => {
        updateUser({
          variables: {
            oldName: user.name,
            name: name === user.name ? null : name,
            password: password,
            email: !email || email === user.email ? null : email,
            avatar: (currentTarget as any).result,
            description: description,
          },
        });
      };
    } else {
      updateUser({
        variables: {
          oldName: user.name,
          name: name === user.name ? null : name,
          password: password,
          email: !email || email === user.email ? null : email,
          avatar: undefined,
          description: description,
        },
      });
    }
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
        <label>Avatar</label>
        <FileUploadLabel htmlFor="avatar">
          <FontAwesomeIcon size={'1x'} icon={faUpload} />
          Browse for an image
        </FileUploadLabel>
        <FileUploadButton
          id="avatar"
          name="avatar"
          type="file"
          accept="image/*"
          ref={register}
        />
        <ErrorMessage errors={errors} name={'avatar'} />
        <label htmlFor="description">
          <span>Description</span>
        </label>
        <Textarea
          cols={6}
          rows={8}
          wrap="hard"
          className={'widder'}
          placeholder="Enter Description"
          name="description"
          ref={register({
            minLength: {
              value: 4,
              message: 'Description needs to be at least 4 characters long',
            },
            maxLength: {
              value: 360,
              message: 'Description needs to be at most 360 characters long',
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
            boxShadow={paginationForm ? 'clearInset' : 'neumorphism'}
            mr={5}
            onClick={() => setPaginationForm(!paginationForm)}
          >
            1
          </Button>
          <Button
            type="button"
            p={5}
            boxShadow={paginationForm ? 'neumorphism' : 'clearInset'}
            onClick={() => setPaginationForm(!paginationForm)}
          >
            2
          </Button>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button type="submit" p={5} variant={'secondary'} mr={5}>
            Submit
          </Button>
          <Button
            onClick={() => setIsOpen(false)}
            p={5}
            variant={'danger'}
            type={'button'}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Form>
  );
};

export default UpdateUserDialog;
