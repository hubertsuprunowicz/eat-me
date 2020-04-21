import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { LOGIN_VIEW } from 'view/Route/constants.route';
import produce from 'immer';
import { User, Recipe } from 'model/generated/graphql';

type LovedRevipeAction = {
  type: 'AddLovedRecipe' | 'RemoveLovedRecipe';
  payload: {
    recipe: Recipe;
  };
};

type Action = LovedRevipeAction;

type Dispatch = (action: Action) => void;

type State = {
  readonly recipes: { [key: string]: Recipe };
};

const createReducer: () => React.Reducer<State, Action> = () => (
  state,
  action,
) => {
  switch (action.type) {
    case 'AddLovedRecipe':
      return produce(state, (draft) => {
        draft.recipes[action.payload.recipe._id as string] =
          action.payload.recipe;
      });
    case 'RemoveLovedRecipe':
      return produce(state, (draft) => {
        if (draft.recipes[action.payload.recipe._id as string])
          delete draft.recipes[action.payload.recipe._id as string];
      });
    default:
      return state;
  }
};

const RecipesStateContext = React.createContext<State | undefined>(undefined);
const RecipesDispatchContext = React.createContext<Dispatch | undefined>(
  undefined,
);

const initialRecipes = {
  recipes: {},
};

const RecipesProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(createReducer(), initialRecipes);

  return (
    <RecipesStateContext.Provider value={state}>
      <RecipesDispatchContext.Provider value={dispatch}>
        {children}
      </RecipesDispatchContext.Provider>
    </RecipesStateContext.Provider>
  );
};

const useRecipesState = () => {
  const context = React.useContext(RecipesStateContext);

  if (context === undefined) {
    throw new Error(
      'useRecipesState must be used within a RecipesStateContext',
    );
  }

  return context;
};

const useRecipesDispatch = () => {
  const context = React.useContext(RecipesDispatchContext);

  if (context === undefined) {
    throw new Error(
      'useRecipesDispatch must be used within a RecipesDispatchContext',
    );
  }

  return context;
};

function useRecipes(): [
  ReturnType<typeof useRecipesState>,
  ReturnType<typeof useRecipesDispatch>,
] {
  return [useRecipesState(), useRecipesDispatch()];
}

export { RecipesProvider, useRecipesState, useRecipesDispatch, useRecipes };
