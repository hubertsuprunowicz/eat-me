import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
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

type RecipeFilterForm = {
  rating?: {
    from?: number;
    to?: number;
  };
  price?: {
    from?: number;
    to?: number;
  };
  time?: {
    from?: number;
    to?: number;
  };
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
  tag?: string;
};

const LIMIT = 6;

const RecipesView: React.FC = () => {
  const { username } = useParams();
  const [page, setPage] = useState<number>(0);
  const [mode, setMode] = useState<'ALL' | 'LOVED' | 'YOURS'>('ALL');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFilterOpen, setFilterIsOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<RecipeFilter>();
  const { loading, error, data } = useQuery(RECIPES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      limit: !!username ? undefined : LIMIT,
      offset: !!username ? undefined : page,
      filter: username
        ? {
            ...filter,
            user: { name: username },
          }
        : filter,
    },
  });

  const paginationHandler = (cardNumber: number) => {
    if (!(cardNumber % LIMIT)) {
      setPage(cardNumber + page);
    }
  };

  if (loading) return <>Loading data...</>;
  // if (error) return <ErrorRedirect error={error} />;

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
      {!recipes.length ? (
        <NoRecords>
          Sorry, there is no recipes to show. Please add one or come back later
        </NoRecords>
      ) : (
        <SwipeableViews
          onChangeIndex={(cardNumber: number) =>
            paginationHandler(cardNumber + 1)
          }
          enableMouseEvents
          index={currentIndex}
        >
          {recipes.map((recipe: Recipe, index: any) => (
            <RecipeCard
              key={recipe._id}
              id={recipe._id}
              recipe={recipe}
              index={index}
              setCurrentIndex={setCurrentIndex}
            />
          ))}
        </SwipeableViews>
      )}
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
