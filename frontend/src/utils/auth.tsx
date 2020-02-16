import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { LOGIN_VIEW } from 'view/Route/constants.route';

type Action = { type: 'login'; token: string } | { type: 'logout' };
type Dispatch = (action: Action) => void;
type State = { login: boolean };
type AuthProviderProps = { children: React.ReactNode };

const AuthStateContext = React.createContext<State | undefined>(undefined);
const AuthDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

function authReducer(state: State, action: Action) {
  switch (action.type) {
    case 'login': {
      sessionStorage.setItem('token', action.token);
      return { login: state.login = true };
    }
    case 'logout': {
      sessionStorage.removeItem('token');
      return { login: state.login = false };
    }
    default: {
      throw new Error(`Unhandled action: ${action}`);
    }
  }
}

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = React.useReducer(authReducer, { login: false });
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

function useAuthDispatch(token?: string) {
  const context = React.useContext(AuthDispatchContext);

  if (token) sessionStorage.setItem('token', token);

  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  }
  return context;
}

const Authorization: React.FC = ({ children }) => {
  const authState = useAuthState();

  if (authState.login) return <>{children}</>;

  return <Redirect to={LOGIN_VIEW} />;
};

export { Authorization, AuthProvider, useAuthState, useAuthDispatch };
