import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigate from './component/Navigate/Navigate';
import RecipesView from './view/RecipesView/RecipesView';
import { Main } from './style';
import LoginView from './view/LoginView/LoginView';
import { ThemeProvider } from 'styled-components';
import {
  LOGIN_VIEW,
  RECIPES_VIEW,
  PROFILE_VIEW,
  WATCHES_VIEW,
  CHAT_VIEW,
  ERROR_VIEW,
} from 'view/Route/constants.route';
import ProfileView from 'view/ProfileView/ProfileView';
import { theme } from 'utils/theme';
import WatchesView from 'view/WachesView/WatchesView';
import ChatView from 'view/ChatView/ChatView';
import ErrorView from 'component/ErrorRedirect/errorView';
import { Authorization, AuthProvider } from 'utils/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TestView from 'view/test/TestView';

toast.configure();

const loginView = <LoginView />;

const recipesCardView = (
  // <Authorization>
  <RecipesView />
  // </Authorization>
);
const profileView = (
  <Authorization>
    <ProfileView />
  </Authorization>
);
const watchesView = (
  <Authorization>
    <WatchesView />
  </Authorization>
);
const chatView = (
  <Authorization>
    <ChatView />
  </Authorization>
);
const errorView = <ErrorView />;

const testView = <TestView />;

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Main>
        <Router>
          <AuthProvider>
            <Navigate>
              <Switch>
                <Route path={'/test'}>{testView}</Route>
                <Route path={LOGIN_VIEW}>{loginView}</Route>
                <Route path={RECIPES_VIEW}>{recipesCardView}</Route>
                <Route path={PROFILE_VIEW}>{profileView}</Route>
                <Route path={WATCHES_VIEW}>{watchesView}</Route>
                <Route path={CHAT_VIEW}>{chatView}</Route>
                <Route path={ERROR_VIEW}>{errorView}</Route>
              </Switch>
            </Navigate>
          </AuthProvider>
        </Router>
      </Main>
    </ThemeProvider>
  );
};

export default App;
