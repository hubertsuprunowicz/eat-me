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
import { faFilter, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import FormModal from 'component/FormModal/FormModal';
import AddRecipeForm, { Difficulty, Tag, Ingredient } from './AddRecipeForm';
import { useParams } from 'react-router-dom';
import NoRecords from 'component/NoRecords/NoRecords';
import Filter from './Filtrer';
import TinderCard from 'component/TinderCard';

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

const RecipesView: React.FC = () => {
  const { username } = useParams();
  const [mode, setMode] = useState<'ALL' | 'LOVED' | 'YOURS'>('ALL');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFilterOpen, setFilterIsOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<RecipeFilter>();
  const { loading, error, data, fetchMore } = useQuery(RECIPES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      offset: 0,
      filter: username
        ? {
            ...filter,
            user: { name: username },
          }
        : { filter },
    },
  });

  // <NoRecords>
  //             Sorry, there is no recipes to show. Please add one or come back
  //             later
  //           </NoRecords>

  // TODO
  if (!data) return null;
  // if (loading) return <>Loading data...</>;
  // if (error) return <ErrorRedirect error={error} />;

  const onCardLeftScreen = (index: number, direction: 'left' | 'right') => {
    const nextPageOffset = Math.abs(10 - index);
    if ((currentIndex + nextPageOffset) % 8) return;
    setCurrentIndex(currentIndex + nextPageOffset);
    fetchMore({
      variables: {
        offset: currentIndex + nextPageOffset,
        filter: username
          ? {
              ...filter,
              user: { name: username },
            }
          : { filter },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        return {
          Recipe: [...fetchMoreResult.Recipe],
          ...prev.Recipe.slice(10 - index),
        };
      },
    });
  };

  const recipes = data.Recipe;
  return (
    <Box>
      <Box
        pl={5}
        pr={5}
        mt={5}
        mb={4}
        display={'flex'}
        justifyContent={'space-between'}
      >
        <span>Recipes</span>
        <div>
          <Button
            boxShadow="neumorphism"
            mr={4}
            onClick={() => setIsOpen(true)}
          >
            <FontAwesomeIcon size={'xs'} icon={faPlusCircle} /> Recipe
          </Button>
          <Button boxShadow="neumorphism" onClick={() => setFilterIsOpen(true)}>
            <FontAwesomeIcon size={'xs'} icon={faFilter} /> Filter
          </Button>
        </div>
      </Box>
      {/* <h2 style={{ padding: '0 40px' }}>What are you going to eat today?</h2> */}
      {recipes.reverse().map((recipe: Recipe, index: number) => (
        <TinderCard
          key={recipe._id}
          preventSwipe={['up', 'down']}
          onCardLeftScreen={(direction: 'left' | 'right') =>
            onCardLeftScreen(index, direction)
          }
        >
          <RecipeCard
            key={recipe._id}
            id={recipe._id}
            recipe={recipe}
            index={index}
            setCurrentIndex={setCurrentIndex}
          />
        </TinderCard>
      ))}
      {isOpen && (
        <FormModal
          title="Add Recipe"
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
        >
          <AddRecipeForm setIsOpen={setIsOpen} />
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
            setMode={setMode}
            setFilter={setFilter}
          />
        </FormModal>
      )}
    </Box>
  );
};

export default RecipesView;
