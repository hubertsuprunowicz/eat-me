import React, { useState } from 'react';
import { Card } from '../../component/RecipeCard/recipe.card.style';
import Form from '../../component/Form/Form';
import { AuthButton, AuthSwitch, Avatar } from './login.view.style';
import useForm from 'react-hook-form';
import { LOGIN, CREATE_USER } from './login.graphql';
import { useMutation } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';
import { RECIPES_VIEW } from 'view/Route/constants.route';
import { Box, Button } from 'style';
import { toast } from 'react-toastify';
import { FieldError } from 'react-hook-form/dist/types';
import { useAuthDispatch } from 'utils/auth';

type FormData = {
  username: string;
  password: string;
  confirmPassword?: string;
  mutationError?: FieldError;
  queryError?: FieldError;
};

const LoginView: React.FC = () => {
  const authDispatch = useAuthDispatch();
  const [loginForm, setLoginForm] = useState<boolean>(true);
  const { handleSubmit, register, errors, setError, reset } = useForm<
    FormData
  >();

  const [login, { data }] = useMutation(LOGIN, {
    onError: error =>
      setError('queryError', 'queryError', error.graphQLErrors[0].message),
  });

  const [createUser] = useMutation(CREATE_USER, {
    onError: error => {
      setError(
        'mutationError',
        'mutationError',
        error.graphQLErrors[0].message
      );
    },
    onCompleted: () => {
      toast.success('Registration successfully completed', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
  });

  const onSubmit = handleSubmit(({ username, password, confirmPassword }) => {
    if (loginForm) login({ variables: { name: username, password: password } });
    else {
      confirmPassword === password
        ? createUser({
            variables: { name: username, password: 'test' },
          }).then(() => reset())
        : setError(
            'confirmPassword',
            'notMatch',
            "password confirmation doesn't match password"
          );
    }
  });

  if (data && data.login) {
    authDispatch({
      type: 'login',
      token: data.login.token,
      user: data.login.user,
    });
    return <Redirect to={RECIPES_VIEW} />;
  }

  return (
    <Card height={'80vh'}>
      <Form onSubmit={onSubmit}>
        <Avatar src={'img/user.svg'} />
        <Box display="flex" flexDirection="column" alignItems="center" p={20}>
          <label htmlFor="username">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            ref={register}
            required
          />
          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            ref={register}
            required
          />
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
          {errors.confirmPassword && errors.confirmPassword.message}
          {errors.queryError && errors.queryError.message}

          {/* FIXME: don't know what's going on */}
          {errors.mutationError && errors.mutationError.message}

          {loginForm ? (
            <Button
              bg="primary.400"
              boxShadow="neumorphism"
              mt={6}
              color="white"
              width="80px"
              height="35px"
              borderRadius="5px"
              type="submit"
            >
              Login
            </Button>
          ) : (
            <Button
              bg="primary.400"
              boxShadow="neumorphism"
              mt={6}
              color="white"
              width="80px"
              height="35px"
              borderRadius="5px"
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
