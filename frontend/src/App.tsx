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
  MESSAGE_VIEW,
  ERROR_VIEW,
  RECIPE_VIEW,
} from 'view/Route/constants.route';
import ProfileView from 'view/ProfileView/ProfileView';
import { theme } from 'utils/theme';
import WatchesView from 'view/WachesView/WatchesView';
import MessageView from 'view/MessageView/MessageView';
import ErrorView from 'component/ErrorRedirect/errorView';
import { Authorization, AuthProvider } from 'utils/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TestView from 'view/test/TestView';
import RecipeView from 'view/RecipeView/RecipeView';

toast.configure();

const loginView = <LoginView />;

const recipesCardView = (
  <Authorization>
    <RecipesView />
  </Authorization>
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
const messageView = (
  <Authorization>
    <MessageView />
  </Authorization>
);

const recipeView = <RecipeView />;

const errorView = <ErrorView />;

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Main>
        <Router>
          <AuthProvider>
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
            <Navigate />
          </AuthProvider>
        </Router>
      </Main>
    </ThemeProvider>
  );
};

export default App;
