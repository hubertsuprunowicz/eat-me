import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { LOGIN_VIEW } from 'view/Route/constants.route';

type User = {
  _id: number;
  name: string;
};

type Action =
  | { type: 'login'; token: string; user: User | undefined }
  | { type: 'logout' };
type Dispatch = (action: Action) => void;
type State = {
  login: boolean;
  token: string | undefined;
  user: User | undefined;
};
type AuthProviderProps = { children: React.ReactNode };

const AuthStateContext = React.createContext<State | undefined>(undefined);
const AuthDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

function authReducer(_: State, action: Action) {
  switch (action.type) {
    case 'login': {
      sessionStorage.setItem('token', action.token);
      return {
        login: true,
        token: action.token,
        user: action.user,
      };
    }
    case 'logout': {
      return {
        login: false,
        token: undefined,
        user: undefined,
      };
    }
    default: {
      throw new Error(`Unhandled action: ${action}`);
    }
  }
}

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = React.useReducer(authReducer, {
    login: false,
    token: undefined,
    user: undefined,
  });

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }
  return context;
}

function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);

  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  }
  return context;
}

const Authorization: React.FC = ({ children }) => {
  const { login } = useAuthState();

  if (login) return <>{children}</>;

  return <Redirect to={LOGIN_VIEW} />;
};

export { Authorization, AuthProvider, useAuthState, useAuthDispatch };
