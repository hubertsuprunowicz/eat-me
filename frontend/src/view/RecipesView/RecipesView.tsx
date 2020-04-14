import React, { useState, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
// import TinderCard from 'react-tinder-card';
import RecipeCard from '../../component/RecipeCard/RecipeCard';
import { useQuery } from '@apollo/react-hooks';
import User from '../../model/user';
import { Box, Button, Text } from '../../style';
import { RECIPES } from './recipes.graphql';
import ErrorRedirect from 'component/ErrorRedirect/errorRedirect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilter,
  faPlusCircle,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import FormModal from 'component/FormModal/FormModal';
import AddRecipeForm, { Difficulty, Tag, Ingredient } from './AddRecipeForm';
import { useParams } from 'react-router-dom';
import NoRecords from 'component/NoRecords/NoRecords';
import Filter from './Filtrer';
import TinderCard from 'component/TinderCard';
import Badge from 'component/Badge/Badge';

export type RecipeFilter = {
  user?: { name?: string };
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

const OFFSET = 10;

const RecipesView: React.FC = () => {
  const { username } = useParams();
  const [recipeIsOpen, setRecipeIsOpen] = useState<boolean>(false);
  const [isFilterOpen, setFilterIsOpen] = useState<boolean>(false);
  const [allRecipes, setAllRecipes] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [qty, setQty] = useState<number>(0);
  const [filter, setFilter] = useState<RecipeFilter>();
  const [lovedList, setLovedList] = useState<any[]>([]);
  const { loading, error, data, fetchMore } = useQuery(RECIPES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      offset: 0,
      filter: filter,
    },
  });

  useEffect(() => {
    if (username) setFilter({ user: { name: username } });
  }, [username]);

  useEffect(() => {
    if (data) handleCardLeftScreen(qty);

    // Unnecessary depth
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qty]);

  const handleSwipe = (direction: 'left' | 'right', recipe: any) => {
    recipes.pop();
    setQty(recipes.length);

    if (direction === 'right') setLovedList([...lovedList, recipe]);
  };

  const handleCardLeftScreen = (
    index: number,
    direction?: 'left' | 'right',
  ) => {
    const nextPageOffset = Math.abs(OFFSET - index);

    if (direction === 'right') setLovedList([...lovedList, recipes[index]]);
    if ((currentIndex + nextPageOffset) % (OFFSET - 2)) return;
    setCurrentIndex(currentIndex + nextPageOffset);
    fetchMore({
      variables: {
        offset: currentIndex + nextPageOffset,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        return {
          Recipe: [...fetchMoreResult.Recipe],
          ...prev.Recipe.slice(OFFSET - index),
        };
      },
    });
  };

  // TODO
  if (!data) return null;
  // if (loading) return <>Loading data...</>;
  // if (error) return <ErrorRedirect error={error} />;

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
        onClick={() => setAllRecipes(false)}
        ml={4}
        color="danger.500"
        boxShadow="neumorphism"
      >
        <FontAwesomeIcon size={'xs'} icon={faHeart} /> Loved list
        <Badge backgroundColor={'danger.500'}>{lovedList.length}</Badge>
      </Button>
      {/* <h2 style={{ padding: '0 40px' }}>What are you going to eat today?</h2> */}
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
            />
          </TinderCard>
        ))}
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
            />
          </TinderCard>
        ))}
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
          <Filter setIsOpen={setRecipeIsOpen} setFilter={setFilter} />
        </FormModal>
      )}
    </Box>
  );
};

export default RecipesView;
