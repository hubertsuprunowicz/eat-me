import React, { useState, useMemo } from 'react';
import SwipeableViews from 'react-swipeable-views';
import RecipeCard from '../../component/RecipeCard/RecipeCard';
import { useQuery, useMutation } from '@apollo/react-hooks';
import User from '../../model/user';
import { Box, Button, Tag, IconButton } from '../../style';
import { RECIPES, LIMIT, RECIPE_CREATE } from './recipes.graphql';
import ErrorRedirect from 'component/ErrorRedirect/errorRedirect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilter,
  faPlusCircle,
  faTemperatureHigh,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import Form from 'component/Form/Form';
import FormModal from 'component/FormModal/FormModal';
import useForm from 'react-hook-form';
import { FormContext, useFormContext } from 'react-hook-form';
import { Input } from './recipes.view.style';
import { toast } from 'react-toastify';
import AddRecipeForm from './AddRecipeForm';

export type Difficulty = 'easy' | 'medium' | 'hard';

type Ingredient = {
  name: string;
  amount: string;
};

type RecipeForm = {
  title: string;
  description: string;
  image: string;
  time: number;
  difficulty: Difficulty;
  tag: string;
  tags?: string[];
  ingredient: Ingredient;
  ingredients?: Ingredient[];
};

const RecipesView: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { loading, error, data } = useQuery(RECIPES, {
    variables: {
      offset: page,
    },
    fetchPolicy: 'cache-and-network',
  });

  const paginationHandler = (cardNumber: number) => {
    if (!(cardNumber % LIMIT)) {
      setPage(cardNumber + page);
    }
  };

  if (loading) return <>Loading data...</>;
  if (error) return <ErrorRedirect error={error} />;

  const { recipes } = data;

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
          <Button boxShadow="neumorphism">
            <FontAwesomeIcon size={'xs'} icon={faFilter} /> Filter
          </Button>
        </div>
      </Box>
      <SwipeableViews
        onChangeIndex={cardNumber => paginationHandler(cardNumber + 1)}
        enableMouseEvents
      >
        {recipes.map((recipe: User) => (
          <RecipeCard key={recipe._id} id={recipe._id} />
        ))}
      </SwipeableViews>
      <FormModal
        title="Add Recipe"
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
      >
        <AddRecipeForm setIsOpen={setIsOpen} />
      </FormModal>
    </Box>
  );
};

export default RecipesView;
