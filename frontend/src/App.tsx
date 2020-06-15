import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigate from './component/Navigate/Navigate';
import RecipesView from './view/RecipesView/RecipesView';
import LoginView from './view/LoginView/LoginView';
import { ThemeProvider } from 'styled-components';
import {
  LOGIN_VIEW,
  RECIPES_VIEW,
  PROFILE_VIEW,
  WATCHES_VIEW,
  MESSAGE_VIEW,
  ERROR_VIEW,
  RECIPE_VIEW,
} from 'utils/constants.route';
import ProfileView from 'view/ProfileView/ProfileView';
import { theme } from 'utils/theme';
import WatchesView from 'view/WachesView/WatchesView';
import MessageView from 'view/MessageView/MessageView';
import ErrorView from 'component/ErrorRedirect/ErrorView';
import { Authorization, AuthProvider } from 'utils/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RecipeView from 'view/RecipeView/RecipeView';
import { RecipesProvider } from 'utils/recipes.context';
import GlobalStyle from 'utils/GlobalStyles';
import Page from 'utils/Page';

toast.configure();

const recipesCardView = (
  <Authorization>
    <Page>
      <RecipesView />
    </Page>
  </Authorization>
);
const profileView = (
  <Authorization>
    <Page>
      <ProfileView />
    </Page>
  </Authorization>
);
const watchesView = (
  <Authorization>
    <Page>
      <WatchesView />
    </Page>
  </Authorization>
);
const messageView = (
  <Authorization>
    <Page>
      <MessageView />
    </Page>
  </Authorization>
);

const recipeView = (
  <Authorization>
    <Page>
      <RecipeView />
    </Page>
  </Authorization>
);

const loginView = (
  <Page display="flex" alignItems="center">
    <LoginView />
  </Page>
);
const errorView = <ErrorView />;

const App: React.FC = () => {
  // Remove auth token on page close/refresh
  // Window nullability due to electron
  window?.addEventListener('beforeunload', () => {
    sessionStorage.removeItem('token');
  });

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer className="toast-size" />
      <Router>
        <AuthProvider>
          <RecipesProvider>
            <Switch>
              <Route path={LOGIN_VIEW}>{loginView}</Route>
              <Route path={RECIPE_VIEW + '/:id'}>{recipeView}</Route>
              <Route path={PROFILE_VIEW + '/:username'}>{profileView}</Route>
              <Route path={PROFILE_VIEW}>{profileView}</Route>
              <Route path={RECIPES_VIEW + '/:username'}>
                {recipesCardView}
              </Route>
              <Route path={RECIPES_VIEW}>{recipesCardView}</Route>
              <Route path={WATCHES_VIEW}>{watchesView}</Route>
              <Route path={MESSAGE_VIEW}>{messageView}</Route>
              <Route path={ERROR_VIEW}>{errorView}</Route>
              <Route path={''}>{recipesCardView}</Route>
            </Switch>
            <GlobalStyle />
            <Navigate />
          </RecipesProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
