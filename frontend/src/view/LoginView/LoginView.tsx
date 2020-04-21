import React, { useState } from 'react';
import { Card } from '../../component/RecipeCard/styles';
import Form from '../../component/Form/Form';
import { AuthButton, AuthSwitch, Avatar } from './login.view.style';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { RECIPES_VIEW } from 'view/Route/constants.route';
import { Box, Button } from 'style';
import { useAuthDispatch } from 'utils/auth';
import { useForm, FieldError } from 'react-hook-form';
import ErrorMessage from 'component/ErrorMessage/ErrorMessage';
import {
  useLoginMutation,
  useCreateUserMutation,
  User,
} from 'model/generated/graphql';

type FormData = {
  username: string;
  password: string;
  confirmPassword?: string;
  mutationError?: FieldError;
  queryError?: FieldError;
};

const LoginView: React.FC = () => {
  const authDispatch = useAuthDispatch();
  const history = useHistory();
  const [loginForm, setLoginForm] = useState<boolean>(true);
  const { handleSubmit, register, errors, setError, reset } = useForm<
    FormData
  >();

  const [login] = useLoginMutation({
    onError: (error) =>
      setError('queryError', 'queryError', error.graphQLErrors[0].message),
    onCompleted: (data) => {
      authDispatch({
        type: 'login',
        token: data.login.token,
        user: data.login.user as User,
      });
      history.push(RECIPES_VIEW);
    },
  });

  const [createUser] = useCreateUserMutation({
    onError: (error) =>
      setError(
        'mutationError',
        'mutationError',
        error.graphQLErrors[0].message,
      ),
    onCompleted: (data) => {
      authDispatch({
        type: 'login',
        token: data.createUser.token,
        user: data.createUser.user as User,
      });
      history.push(RECIPES_VIEW);
    },
  });

  const onSubmit = handleSubmit(({ username, password, confirmPassword }) => {
    if (loginForm) login({ variables: { name: username, password: password } });
    else {
      confirmPassword === password
        ? createUser({
            variables: { name: username, password: password },
          })
        : setError(
            'confirmPassword',
            'notMatch',
            "password confirmation doesn't match password",
          );
    }
  });

  return (
    <Card height={'80vh'}>
      <Form onSubmit={onSubmit}>
        <Avatar src={'img/user-solid.svg'} />
        <Box display="flex" flexDirection="column" alignItems="center" p={20}>
          <label htmlFor="username">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            ref={
              loginForm
                ? register
                : register({
                    required: 'Username is required',
                    minLength: {
                      value: 4,
                      message:
                        'Username needs to be at least 4 characters long',
                    },
                  })
            }
            autoFocus
          />
          <ErrorMessage errors={errors} name={'username'} />
          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            ref={
              loginForm
                ? register
                : register({
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message:
                        'Password needs to be at least 6 characters long',
                    },
                  })
            }
          />
          <ErrorMessage errors={errors} name={'password'} />
          {!loginForm && (
            <label htmlFor="confirmPassword">
              <input
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                ref={register}
              />
            </label>
          )}
          <ErrorMessage errors={errors} name={'mutationError'} />
          <ErrorMessage errors={errors} name={'confirmPassword'} />
          <ErrorMessage errors={errors} name={'queryError'} />

          {loginForm ? (
            <Button
              color="grey.800"
              boxShadow="neumorphism"
              mt={6}
              width="80px"
              height="35px"
              type="submit"
            >
              Login
            </Button>
          ) : (
            <Button
              color="grey.800"
              boxShadow="neumorphism"
              mt={6}
              width="80px"
              height="35px"
              type="submit"
            >
              Register
            </Button>
          )}
        </Box>
      </Form>
      <AuthSwitch>
        <AuthButton
          onClick={() => {
            reset();
            setLoginForm(true);
          }}
          active={loginForm}
        >
          Login
        </AuthButton>
        <AuthButton
          onClick={() => {
            reset();
            setLoginForm(false);
          }}
          active={!loginForm}
        >
          Register
        </AuthButton>
      </AuthSwitch>
    </Card>
  );
};

export default LoginView;
