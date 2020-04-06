import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import RecipeCard from '../../component/RecipeCard/RecipeCard';
import { useQuery } from '@apollo/react-hooks';
import User from '../../model/user';
import { Box, Button, Text } from '../../style';
import { RECIPES, LIMIT } from './recipes.graphql';
import ErrorRedirect from 'component/ErrorRedirect/errorRedirect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import FormModal from 'component/FormModal/FormModal';
import AddRecipeForm, { Difficulty, Tag, Ingredient } from './AddRecipeForm';
import { useParams } from 'react-router-dom';

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
  const [page, setPage] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { username } = useParams();
  const { loading, error, data } = useQuery(RECIPES, {
    variables: {
      offset: page,
      onlyPerson: !!username,
      personName: username,
    },
    fetchPolicy: 'cache-and-network',
  });

  const paginationHandler = (cardNumber: number) => {
    if (!(cardNumber % LIMIT)) {
      setPage(cardNumber + page);
    }
  };

  if (loading) return <>Loading data...</>;

  // TODO: error occured after change view: recipes -> recipe -> recipes
  // if (error) return <ErrorRedirect error={error} />;

  const recipes = data[Object.keys(data)[0]];

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
      {/* <h2 style={{ padding: '0 40px' }}>What are you going to eat today?</h2> */}
      {!recipes.length && (
        <Box
          p={8}
          textAlign={'center'}
          mt={'50%'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Text fontSize={24}>
            Sorry, there is no recipes to show. Please add one or come back
            later
          </Text>
        </Box>
      )}
      {recipes.length > 0 && (
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
