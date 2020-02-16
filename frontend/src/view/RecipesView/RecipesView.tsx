import React, { useState } from 'react';
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

const RecipesView = () => {
  const methods = useForm();
  const {
    handleSubmit,
    register,
    watch,
    getValues,
    setError,
    errors,
    clearError,
    reset,
    setValue,
  } = useForm<RecipeForm>();
  const [paginationForm, setPaginationForm] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const { loading, error, data } = useQuery(RECIPES, {
    variables: {
      offset: page,
    },
    fetchPolicy: 'cache-and-network',
  });

  const [createRecipe] = useMutation(RECIPE_CREATE, {
    onError: error => {
      console.log(error);
    },
    onCompleted: () => {
      toast.success('Recipe has been added', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
  });

  const paginationHandler = (cardNumber: number) => {
    if (!(cardNumber % LIMIT)) {
      setPage(cardNumber + page);
    }
  };

  const handleTags = () => {
    if (watch('tag').length < 4) {
      setError(
        'tags',
        'tooShort',
        'This text should be at least 4 letters long'
      );
    } else if (tags.length >= 6) {
      setError('tags', 'tooMany', 'There is too many tags');
    } else {
      clearError('tags');
      setTags([...tags, watch('tag')]);
      setValue('tag', '');
    }
  };

  const handleIngredients = () => {
    console.log(getValues());
    if (watch('ingredient').name.length < 3) {
      setError(
        'ingredients',
        'tooShort',
        'This text should be at least 3 letters long'
      );
    } else {
      clearError('ingredients');
      setIngredients([...ingredients, watch('ingredient')]);
      setValue('ingredient', { name: '', amount: '' });
    }
  };

  const handlePagination = () => {
    console.log(getValues());
    setPaginationForm(!paginationForm);
    console.log(getValues());
  };

  const onSubmit = ({ description, image, title, time }: RecipeForm) => {
    createRecipe({
      variables: {
        title: title,
        description: description,
        image: image,
        time: time,
        tag: getValues().tags,
        ingredient: getValues().ingredients,
      },
    }).then(() => reset());
  };

  function FirstPageForm() {
    const { register } = useFormContext();
    return (
      <Box display="flex" flexDirection="column" alignItems="center" p={20}>
        <label htmlFor="title">
          <span>Title</span>
        </label>
        <input
          type="text"
          placeholder="Enter Title"
          name="title"
          ref={register}
          required
        />
        <label htmlFor="image">
          <span>Image Link</span>
        </label>
        <input
          type="text"
          placeholder="Enter Image Link"
          name="image"
          ref={register}
          required
        />
        <label htmlFor="time">
          <span>Time</span>
        </label>
        <input
          type="number"
          placeholder="Time needed to prepare meal(minutes)"
          name="time"
          min={5}
          ref={register}
          required
        />
        <label htmlFor="tag">
          <span>Tags</span>
        </label>
        <Box display="flex">
          <Input
            type="text"
            width={210}
            placeholder="Enter tag"
            name="tag"
            ref={register}
            minLength={4}
            maxLength={20}
            required
          />
          <IconButton
            ml={4}
            boxShadow="insetNeo"
            type="button"
            onClick={handleTags}
          >
            <FontAwesomeIcon size={'1x'} icon={faPlus} />
          </IconButton>
        </Box>
        <Box mt={4} mb={2} display="flex" flexWrap={'wrap'} maxWidth={'33vw'}>
          {tags &&
            tags.map((tag: string) => (
              <Tag bg={'primary.300'} key={tag + Math.random() * tag.length}>
                {tag}
              </Tag>
            ))}
        </Box>
        {errors.tags && errors.tags.message}
      </Box>
    );
  }

  function SecondsPageForm() {
    const { register } = useFormContext();
    return (
      <Box display="flex" flexDirection="column" alignItems="center" p={20}>
        <label htmlFor="difficulty">
          <span>Difficulty</span>
        </label>
        <Box display={'flex'}>
          <select name="difficulty" ref={register}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </Box>
        <label htmlFor="description">
          <span>Description</span>
        </label>
        <textarea
          cols={6}
          rows={4}
          style={{ resize: 'vertical' }}
          placeholder="Enter Description"
          name="description"
          ref={register}
          required
        />
        <label htmlFor="ingredient">
          <span>Ingredients</span>
        </label>
        <Box display="flex">
          <Input
            width={132}
            type="text"
            placeholder="Enter name"
            name="ingredient.name"
            ref={register}
            minLength={3}
            maxLength={20}
            required
          />
          <Input
            ml={4}
            width={55}
            type="text"
            placeholder="amount"
            name="ingredient.amount"
            ref={register}
            maxLength={10}
          />
          <IconButton
            ml={4}
            boxShadow="insetNeo"
            type="button"
            onClick={handleIngredients}
          >
            <FontAwesomeIcon size={'1x'} icon={faPlus} />
          </IconButton>
        </Box>

        {ingredients &&
          ingredients.map(({ name, amount }: Ingredient) => (
            <Box
              width="100%"
              display="flex"
              flexWrap={'wrap'}
              justifyContent="space-between"
              key={name + Math.random() * name.length}
            >
              <Box>{name}</Box>
              <Box>{amount}</Box>
            </Box>
          ))}

        {errors.tags && errors.tags.message}
      </Box>
    );
  }

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
        isOpen={modalIsOpen}
        closeModal={() => setIsOpen(false)}
      >
        <FormContext {...methods}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {paginationForm && <FirstPageForm />}

            {!paginationForm && <SecondsPageForm />}

            <Box
              mb={6}
              width="100%"
              display="flex"
              justifyContent="space-between"
            >
              <Box display="flex" justifyContent="flex-start">
                <Button
                  p={5}
                  color={'grey.700'}
                  boxShadow={paginationForm ? 'insetNeo' : 'neumorphism'}
                  mr={5}
                  onClick={handlePagination}
                >
                  1
                </Button>
                <Button
                  p={5}
                  color={'grey.700'}
                  boxShadow={paginationForm ? 'neumorphism' : 'insetNeo'}
                  onClick={handlePagination}
                >
                  2
                </Button>
              </Box>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  type="submit"
                  p={5}
                  color={'secondary.500'}
                  boxShadow="neumorphism"
                  mr={5}
                >
                  Submit
                </Button>
                <Button
                  onClick={() => setIsOpen(false)}
                  p={5}
                  color={'danger.500'}
                  boxShadow="neumorphism"
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Form>
        </FormContext>
      </FormModal>
    </Box>
  );
};

export default RecipesView;
