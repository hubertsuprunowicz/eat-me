import React, { useState, useEffect } from 'react';
import RecipeCard from '../../component/RecipeCard/RecipeCard';
import * as Styled from '../../style';
import ErrorRedirect from 'component/ErrorRedirect/ErrorRedirect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilter,
  faPlusCircle,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import FormModal from 'component/FormModal/FormModal';
import AddRecipeForm from './CreateRecipeForm';
import { useParams } from 'react-router-dom';
import NoRecords from 'component/NoRecords/NoRecords';
import Filter from './Filtrer';
import TinderCard from 'component/TinderCard';
import Badge from 'component/Badge/Badge';
import LoadingOverlay from 'component/LoadingOverlay/LoadingOverlay';
import { useAuthState } from 'utils/auth';
import { useRecipesQuery, Recipe, Difficulty } from 'model/generated/graphql';
import { useRecipes } from 'utils/recipes.context';

export type RecipeFilter = {
  name_not_in?: string[];
  user?: { name?: string };
  user_not?: { name?: string };
  totalCost_gte?: number;
  totalCost_lte?: number;
  time_gte?: number;
  time_lte?: number;
  difficulty?: Difficulty;
  tag?: { name?: string };
  comment?: { rating_gte?: number; rating_lte?: number };
};

const RecipesView: React.FC = () => {
  const { username } = useParams();
  const [recipeIsOpen, setRecipeIsOpen] = useState<boolean>(false);
  const [isFilterOpen, setFilterIsOpen] = useState<boolean>(false);
  const [allRecipes, setAllRecipes] = useState<boolean>(true);
  const [firstFromPoll, setFirstFromPoll] = useState<number>(0);
  const [filter, setFilter] = useState<RecipeFilter>();
  const { user } = useAuthState();
  const [state, dispatch] = useRecipes();
  const { loading, error, data, fetchMore, refetch } = useRecipesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      offset: 0,
      filter: filter,
    },
  });

  useEffect(() => {
    if (username) {
      setFilter({ user: { name: username } });
      return;
    }

    setFilter({ user_not: { name: user!.name } });

    // Unnecessary depth
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  useEffect(() => {
    setFilter((old) => {
      return {
        ...old,
        name_not_in: Object.values(state.recipes).map((it) => it.name),
      };
    });

    // Unnecessary depth
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allRecipes]);

  useEffect(() => {
    if (data)
      fetchMore({
        variables: {
          offset: firstFromPoll,
        },
        updateQuery: (_prev, { fetchMoreResult }) => {
          return {
            Recipe: fetchMoreResult?.Recipe,
          };
        },
      });

    // Unnecessary depth
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstFromPoll]);

  const handleSwipe = (
    direction: 'left' | 'right',
    recipe: Recipe,
    index: number,
  ) => {
    if (!allRecipes) {
      if (direction === 'left') handleRemoveLovedOnLeft(recipe);

      return;
    }

    handleCardLeftScreen(index);
    if (direction === 'right') handleAddToLovedOnRight(recipe);
  };

  const handleRemoveLovedOnLeft = (recipe: Recipe) => {
    dispatch({
      type: 'RemoveLovedRecipe',
      payload: { recipe: recipe },
    });
  };

  const handleAddToLovedOnRight = (recipe: Recipe) => {
    dispatch({
      type: 'AddLovedRecipe',
      payload: { recipe: recipe },
    });
  };

  const handleCardLeftScreen = (
    index: number,
    direction?: 'left' | 'right',
    recipe?: Recipe,
  ) => {
    const counter = Math.abs(recipes.length - index);
    const currentRecipe = recipes[index - 1];
    const nextRecipe = recipes[index - 2];

    if (direction === 'right' && allRecipes && recipe) {
      handleAddToLovedOnRight(recipe);
    }

    if (direction === 'left' && !allRecipes && recipe) {
      handleRemoveLovedOnLeft(recipe);
    }

    if (currentRecipe || nextRecipe || !allRecipes) return;

    setFirstFromPoll(firstFromPoll + counter);
  };

  if (error) return <ErrorRedirect error={error} />;
  if (!data || !data.Recipe) return null;

  const recipes = data.Recipe;
  return (
    <Styled.Box>
      <Styled.Box
        pl={5}
        pr={5}
        mt={5}
        display={'flex'}
        justifyContent={'space-between'}
      >
        <span>Recipes</span>
        <div>
          <Styled.Button mr={4} onClick={() => setRecipeIsOpen(true)}>
            <FontAwesomeIcon size={'xs'} icon={faPlusCircle} /> Recipe
          </Styled.Button>
          <Styled.Button onClick={() => setFilterIsOpen(true)}>
            <FontAwesomeIcon size={'xs'} icon={faFilter} /> Filter
          </Styled.Button>
        </div>
      </Styled.Box>
      <Styled.Button
        onClick={() => setAllRecipes(!allRecipes)}
        ml={4}
        variant={allRecipes ? 'regular' : 'danger'}
      >
        <FontAwesomeIcon size={'xs'} icon={faHeart} /> Loved list
        <Badge backgroundColor={'danger.500'}>
          {Object.values(state.recipes).length}
        </Badge>
      </Styled.Button>
      <LoadingOverlay height={'80vh'} isLoading={loading}>
        {!allRecipes &&
          state.recipes &&
          Object.values(state.recipes).map((recipe: Recipe, index: number) => (
            <TinderCard
              key={recipe._id ?? ''}
              preventSwipe={['up', 'down']}
              onCardLeftScreen={(direction: 'left' | 'right') =>
                handleCardLeftScreen(index, direction, recipe)
              }
            >
              <RecipeCard
                id={recipe._id ?? ''}
                recipe={recipe}
                index={index}
                onSwipe={handleSwipe}
                onRefetch={refetch}
              />
            </TinderCard>
          ))}
      </LoadingOverlay>
      {allRecipes &&
        recipes &&
        (recipes as Recipe[]).map((recipe, index) => (
          <TinderCard
            key={recipe._id ?? ''}
            preventSwipe={['up', 'down']}
            onCardLeftScreen={(direction: 'left' | 'right') =>
              handleCardLeftScreen(index, direction, recipe)
            }
          >
            <RecipeCard
              id={recipe._id ?? ''}
              recipe={recipe}
              index={index}
              onSwipe={handleSwipe}
              onRefetch={() => {
                refetch();
                recipes.pop();
              }}
            />
          </TinderCard>
        ))}
      {!loading && <NoRecords mt={8}>Sorry, no recipes were found.</NoRecords>}
      {recipeIsOpen && (
        <FormModal
          title="Add Recipe"
          isOpen={recipeIsOpen}
          closeModal={() => setRecipeIsOpen(false)}
        >
          <AddRecipeForm setIsOpen={setRecipeIsOpen} />
        </FormModal>
      )}
      {isFilterOpen && (
        <FormModal
          title="Recipe Filter"
          isOpen={isFilterOpen}
          allRequired={false}
          closeModal={() => setFilterIsOpen(false)}
        >
          <Filter
            setIsOpen={setFilterIsOpen}
            setFilter={setFilter}
            onParticularUser={username}
          />
        </FormModal>
      )}
    </Styled.Box>
  );
};

export default RecipesView;
