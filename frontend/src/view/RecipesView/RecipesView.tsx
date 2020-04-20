import React, { useState, useEffect } from 'react';
import RecipeCard from '../../component/RecipeCard/RecipeCard';
import { useQuery } from '@apollo/react-hooks';
import User from '../../model/user';
import { Box, Button } from '../../style';
import { RECIPES } from './recipes.graphql';
import ErrorRedirect from 'component/ErrorRedirect/ErrorRedirect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilter,
  faPlusCircle,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import FormModal from 'component/FormModal/FormModal';
import AddRecipeForm, { Difficulty, Tag, Ingredient } from './CreateRecipeForm';
import { useParams } from 'react-router-dom';
import NoRecords from 'component/NoRecords/NoRecords';
import Filter from './Filtrer';
import TinderCard from 'component/TinderCard';
import Badge from 'component/Badge/Badge';
import LoadingOverlay from 'component/LoadingOverlay/LoadingOverlay';
import { useAuthState } from 'utils/auth';

export type RecipeFilter = {
  name_not_in?: string[];
  user?: { name?: string };
  user_not?: { name?: string };
  totalCost_gte?: number;
  totalCost_lte?: number;
  time_gte?: number;
  time_lte?: number;
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
  tag?: { name?: string };
  comment?: { rating_gte?: number; rating_lte?: number };
};

export type Recipe = {
  _id: string;
  title: string;
  name: string;
  difficulty: Difficulty;
  description?: string;
  totalCost: number;
  time: number;
  image: string;
  tag: Tag[];
  ingredient: Ingredient[];
  user: User;
  comment: any;
};

const RecipesView: React.FC = () => {
  const { username } = useParams();
  const [recipeIsOpen, setRecipeIsOpen] = useState<boolean>(false);
  const [isFilterOpen, setFilterIsOpen] = useState<boolean>(false);
  const [allRecipes, setAllRecipes] = useState<boolean>(true);
  const [firstFromPoll, setFirstFromPoll] = useState<number>(0);
  const [filter, setFilter] = useState<RecipeFilter>();
  const [lovedList, setLovedList] = useState<any[]>([]);
  const { user } = useAuthState();
  const { loading, error, data, fetchMore, refetch } = useQuery(RECIPES, {
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
    setFilter(old => {
      return { ...old, name_not_in: lovedList.map(it => it.name) };
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
            Recipe: fetchMoreResult.Recipe,
          };
        },
      });

    // Unnecessary depth
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstFromPoll]);

  const handleSwipe = (
    direction: 'left' | 'right',
    recipe: any,
    index: number,
  ) => {
    if (!allRecipes) {
      if (direction === 'left') handleRemoveLovedOnLeft(index);

      return;
    }

    handleCardLeftScreen(index);
    if (direction === 'right') handleAddToLovedOnRight(recipe);
  };

  const handleRemoveLovedOnLeft = (index: number) => {
    setLovedList(old => {
      const temp = old;
      temp.splice(index, 1);
      return temp;
    });
  };

  const handleAddToLovedOnRight = (recipe: any) => {
    setLovedList(old => [...old, recipe]);
  };

  const handleCardLeftScreen = (
    index: number,
    direction?: 'left' | 'right',
  ) => {
    const counter = Math.abs(recipes.length - index);
    const currentRecipe = recipes[index - 1];
    const nextRecipe = recipes[index - 2];

    if (direction === 'right' && allRecipes) {
      handleAddToLovedOnRight(recipes[index]);
    }

    if (direction === 'left' && !allRecipes) {
      handleRemoveLovedOnLeft(index);
    }

    if (currentRecipe || nextRecipe || !allRecipes) return;

    setFirstFromPoll(firstFromPoll + counter);
  };

  if (error) return <ErrorRedirect error={error} />;
  if (!data) return null;

  const recipes = data.Recipe;
  return (
    <Box>
      <Box
        pl={5}
        pr={5}
        mt={5}
        display={'flex'}
        justifyContent={'space-between'}
      >
        <span>Recipes</span>
        <div>
          <Button
            boxShadow="neumorphism"
            mr={4}
            onClick={() => setRecipeIsOpen(true)}
          >
            <FontAwesomeIcon size={'xs'} icon={faPlusCircle} /> Recipe
          </Button>
          <Button boxShadow="neumorphism" onClick={() => setFilterIsOpen(true)}>
            <FontAwesomeIcon size={'xs'} icon={faFilter} /> Filter
          </Button>
        </div>
      </Box>
      <Button
        onClick={() => setAllRecipes(!allRecipes)}
        ml={4}
        color={allRecipes ? 'grey.500' : 'danger.500'}
        boxShadow="neumorphism"
      >
        <FontAwesomeIcon size={'xs'} icon={faHeart} /> Loved list
        <Badge backgroundColor={'danger.500'}>{lovedList.length}</Badge>
      </Button>
      <LoadingOverlay height={'80vh'} isLoading={loading}>
        {!allRecipes &&
          lovedList.map((recipe: Recipe, index: number) => (
            <TinderCard
              key={recipe._id}
              preventSwipe={['up', 'down']}
              onCardLeftScreen={(direction: 'left' | 'right') =>
                handleCardLeftScreen(index, direction)
              }
            >
              <RecipeCard
                id={recipe._id}
                recipe={recipe}
                index={index}
                onSwipe={handleSwipe}
                onRefetch={() => {
                  refetch();
                  lovedList.pop();
                }}
              />
            </TinderCard>
          ))}
      </LoadingOverlay>
      {allRecipes &&
        recipes.map((recipe: Recipe, index: number) => (
          <TinderCard
            key={recipe._id}
            preventSwipe={['up', 'down']}
            onCardLeftScreen={(direction: 'left' | 'right') =>
              handleCardLeftScreen(index, direction)
            }
          >
            <RecipeCard
              id={recipe._id}
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
      {!loading && <NoRecords>Sorry, there is no more recipes...</NoRecords>}
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
    </Box>
  );
};

export default RecipesView;
