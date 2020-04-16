import React, { useState, memo } from 'react';
import { Box, IconButton, Tag, Button } from 'style';
import { Input } from './recipes.view.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import Form from 'component/Form/Form';
import { useMutation } from '@apollo/react-hooks';
import { RECIPE_CREATE } from './recipes.graphql';
import { toast } from 'react-toastify';
import { useAuthState } from 'utils/auth';
import { useForm } from 'react-hook-form';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type Ingredient = {
  name: string;
  amount: string;
};

export type Tag = {
  name: string;
};

const Ingredient: React.FC<Ingredient & {
  index: number;
  ingredients: Ingredient[];
}> = ({ name, amount, index, ingredients }) => {
  return (
    <Box
      width="100%"
      display="flex"
      flexWrap={'wrap'}
      justifyContent="space-between"
      key={name + Math.random() * name.length}
    >
      <Box>{name}</Box>
      <div>
        <Box>{amount}</Box>
        <Button
          type="button"
          onClick={function() {
            ingredients.splice(index, 1);
          }}
        >
          -
        </Button>
      </div>
    </Box>
  );
};

type RecipeForm = {
  title: string;
  description: string;
  image: string;
  time: number;
  difficulty: Difficulty;
  tag: Tag;
  tags?: Tag[];
  ingredient: Ingredient;
  ingredients?: Ingredient[];
  totalCost: number;
};

type Props = { setIsOpen: (arg: boolean) => void };

const AddRecipeForm: React.FC<Props> = ({ setIsOpen }) => {
  const [, resetComponent] = useState();
  const [paginationForm, setPaginationForm] = useState<boolean>(true);
  const {
    handleSubmit,
    watch,
    register,
    setError,
    errors,
    clearError,
    reset,
    setValue,
  } = useForm<RecipeForm>();
  const [tags, setTags] = useState<Tag[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const { user } = useAuthState();

  const handleTags = () => {
    if (!watch('tag')) return;

    if (watch('tag').name.length < 4) {
      setError(
        'tags',
        'tooShort',
        'This text should be at least 4 letters long',
      );
    } else if (tags.length >= 6) {
      setError('tags', 'tooMany', 'There is too many tags');
    } else {
      clearError('tags');
      setTags([...tags, watch('tag')]);
      setValue('tag', { name: '' });
    }
  };

  const handleIngredients = () => {
    if (!watch('ingredient')) return;

    if (watch('ingredient').name.length < 3) {
      setError(
        'ingredients',
        'tooShort',
        'This text should be at least 3 letters long',
      );
    } else {
      clearError('ingredients');
      setIngredients([...ingredients, watch('ingredient')]);
      setValue('ingredient', { name: '', amount: '' });
    }
  };

  const [createRecipe] = useMutation(RECIPE_CREATE, {
    onError: _ => {
      toast.error('Something has failed', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
    onCompleted: () => {
      toast.success('Recipe has been added', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
  });

  const onSubmit = ({
    description,
    image,
    title,
    time,
    difficulty,
    totalCost,
  }: RecipeForm) => {
    if (!user) throw new Error('Not authorized exception');
    createRecipe({
      variables: {
        name: title,
        description: description,
        image: image,
        time: parseInt(time.toString()),
        tag: tags,
        ingredient: ingredients,
        totalCost: parseFloat(totalCost.toString()),
        difficulty: difficulty.toUpperCase() as "EASY" | "MEDIUM" | "HARD",
        userID: user._id,
      },
    }).then(() => {
      reset();
      setIsOpen(false);
    });
  };

  const removeIngredient = (index: number) => {
    const temp = ingredients;
    temp.splice(index, 1);
    setIngredients(temp);
    resetComponent({});
  };

  const removeTag = (index: number) => {
    const temp = tags;
    temp.splice(index, 1);
    setTags(temp);
    resetComponent({});
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Box
        display={paginationForm ? 'flex' : 'none'}
        flexDirection="column"
        alignItems="center"
        p={20}
      >
        <label htmlFor="title">
          <span>Title</span>
        </label>
        <input
          type="text"
          placeholder="Enter Title"
          name="title"
          ref={register({
            required: true,
          })}
        />
        <label htmlFor="image">
          <span>Image Link</span>
        </label>
        <input
          type="text"
          placeholder="Enter Image Link"
          name="image"
          ref={register({
            required: true,
          })}
        />
        <label htmlFor="time">
          <span>Time</span>
        </label>
        <input
          type="number"
          placeholder="Time needed to prepare meal(minutes)"
          name="time"
          min={5}
          ref={register({
            required: true,
          })}
        />
        <label htmlFor="tag">
          <span>Tags</span>
        </label>
        <Box display="flex">
          <Input
            type="text"
            width={210}
            placeholder="Enter tag"
            name="tag.name"
            ref={register}
            minLength={4}
            maxLength={20}
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
        <Box mt={4} mb={2} display="flex" flexWrap={'wrap'}>
          {tags &&
            tags.map((tag: Tag, index) => (
              <Tag
                bg={'primary.300'}
                key={tag.name + Math.random() * tag.name.length}
                cursor={'pointer'}
                onClick={() => removeTag(index)}
              >
                {tag.name} <FontAwesomeIcon icon={faTimes} />
              </Tag>
            ))}
        </Box>
        {errors.tags && errors.tags.message}
      </Box>
      <Box
        display={paginationForm ? 'none' : 'flex'}
        flexDirection="column"
        alignItems="center"
        p={20}
      >
        <label htmlFor="difficulty">
          <span>Difficulty</span>
        </label>
        <Box display={'flex'}>
          <select
            name="difficulty"
            ref={register({
              required: true,
            })}
          >
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </Box>
        <label htmlFor="description">
          <span>Description</span>
        </label>
        <textarea
          cols={6}
          rows={4}
          placeholder="Enter Description"
          name="description"
          ref={register({
            required: true,
          })}
        />
        <label htmlFor="totalCost">
          <span>Total Cost</span>
        </label>
        <input
          type="number"
          placeholder="Enter Total Cost"
          name="totalCost"
          ref={register({
            required: true,
          })}
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
          />
          <Input
            ml={4}
            width={55}
            type="text"
            placeholder="amount"
            name="ingredient.amount"
            ref={register({
              required: true,
            })}
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
          ingredients.map(({ name, amount }: Ingredient, index) => {
            return (
              <Box
                width="100%"
                display="flex"
                flexWrap={'wrap'}
                justifyContent="space-between"
                key={name + Math.random() * name.length}
                cursor={'pointer'}
                onClick={() => removeIngredient(index)}
              >
                <Box>{name}</Box>
                <div>
                  <Box>{amount}</Box>
                </div>
              </Box>
            );
          })}

        {errors.tags && errors.tags.message}
      </Box>

      <Box mb={6} width="100%" display="flex" justifyContent="space-between">
        <Box display="flex" justifyContent="flex-start">
          <Button
            p={5}
            color={'grey.700'}
            boxShadow={paginationForm ? 'insetNeo' : 'neumorphism'}
            mr={5}
            onClick={() => setPaginationForm(!paginationForm)}
          >
            1
          </Button>
          <Button
            p={5}
            color={'grey.700'}
            boxShadow={paginationForm ? 'neumorphism' : 'insetNeo'}
            onClick={() => setPaginationForm(!paginationForm)}
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
  );
};

export default memo(AddRecipeForm);
