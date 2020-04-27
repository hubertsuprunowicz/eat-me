import React, { useState, memo } from 'react';
import * as Styled from 'style';
import { Input } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import Form from 'component/Form/Form';
import { toast } from 'react-toastify';
import { useAuthState } from 'utils/auth';
import { useForm, FieldError } from 'react-hook-form';
import ErrorMessage from 'component/ErrorMessage/ErrorMessage';
import {
  Ingredient,
  Difficulty,
  Tag,
  useCreateRecipeMutation,
} from 'model/generated/graphql';

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
  mutationError?: FieldError;
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
    const tag = watch('tag');
    if (!tag) return;

    if (tag.name.length < 3) {
      setError(
        'tag',
        'tooShort',
        'This text should be at least 3 letters long',
      );
    } else if (tag.name.length > 20) {
      setError('tag', 'tooLong', 'Tag name should be at most 20 letters long');
    } else if (tags.length > 6) {
      setError('tag', 'tooMany', 'There should be at most 6 tags');
    } else {
      clearError('tag');
      setTags([...tags, tag]);
      setValue('tag.name', '');
    }
  };

  const handleIngredients = () => {
    const ingredient = watch('ingredient');
    if (!ingredient) return;

    if (ingredient.name.length < 3) {
      setError(
        'ingredient',
        'tooShort',
        'Ingredient name should be at least 3 letters long',
      );
    } else if (ingredient.name.length > 24) {
      setError(
        'ingredient',
        'tooLong',
        'Ingredient name should be at most 24 letters long',
      );
    } else if (ingredient.amount.length > 6) {
      setError(
        'ingredient',
        'tooLong',
        'Ingredient amount should be at most 6 letters long',
      );
    } else if (ingredients.length > 12) {
      setError(
        'ingredient',
        'tooMany',
        'There should be at most 12 ingredients',
      );
    } else {
      clearError('ingredient');
      setIngredients([...ingredients, ingredient]);
      setValue('ingredient.name', '');
      setValue('ingredient.amount', '');
    }
  };

  const [createRecipe] = useCreateRecipeMutation({
    onError: (error) => {
      setError(
        'mutationError',
        'mutationError',
        error.graphQLErrors[0].message,
      );
    },
    onCompleted: () => {
      reset();
      setIsOpen(false);
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
        difficulty: difficulty.toUpperCase() as Difficulty,
        userID: user._id ? user._id : '',
      },
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
      <Styled.Box
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
            required: 'Title is required',
            minLength: {
              value: 6,
              message: 'Title needs to be at least 6 characters long',
            },
            maxLength: {
              value: 64,
              message: 'Title must not exceed 64 characters long',
            },
          })}
        />
        <ErrorMessage errors={errors} name={'title'} />
        <label htmlFor="image">
          <span>Image Link</span>
        </label>
        <input
          type="text"
          placeholder="Enter Image Link"
          name="image"
          ref={register({
            required: 'Image link is required',
            minLength: {
              value: 5,
              message: 'Image link needs to be at least 5 characters long',
            },
          })}
        />
        <ErrorMessage errors={errors} name={'image'} />
        <label htmlFor="time">
          <span>Time</span>
        </label>
        <input
          type="number"
          placeholder="Time needed to prepare meal(minutes)"
          name="time"
          min={5}
          ref={register({
            required: 'Time is required',
            min: {
              value: 5,
              message: 'It should take at least 5 minutes to prepare the food',
            },
          })}
        />
        <ErrorMessage errors={errors} name={'time'} />
        <Input
          type="text"
          name="tags"
          ref={register({
            validate: () => {
              if (tags.length < 1) return 'Tags are required';
            },
          })}
          hidden
        />
        <label htmlFor="tag">
          <span>Tags</span>
        </label>
        <Styled.Box display="flex">
          <Input
            type="text"
            width={210}
            placeholder="Enter tag"
            name="tag.name"
            ref={register}
          />
          <Styled.IconButton
            height={'45px'}
            ml={4}
            boxShadow="clearInset"
            type="button"
            onClick={handleTags}
          >
            <FontAwesomeIcon size={'1x'} icon={faPlus} />
          </Styled.IconButton>
        </Styled.Box>
        <ErrorMessage errors={errors} name={'tag.name'} />
        <Styled.Box mt={4} mb={2} display="flex" flexWrap={'wrap'}>
          {tags &&
            tags.map((tag: Tag, index) => (
              <Styled.Tag
                bg={'primary.300'}
                key={tag.name + Math.random() * tag.name.length}
                cursor={'pointer'}
                onClick={() => removeTag(index)}
              >
                {tag.name} <FontAwesomeIcon icon={faTimes} />
              </Styled.Tag>
            ))}
        </Styled.Box>
        <ErrorMessage errors={errors} name={'tag'} />
        <ErrorMessage errors={errors} name={'tags'} />
      </Styled.Box>
      <Styled.Box
        display={paginationForm ? 'none' : 'flex'}
        flexDirection="column"
        alignItems="center"
        p={20}
      >
        <label htmlFor="difficulty">
          <span>Difficulty</span>
        </label>
        <Styled.Box display={'flex'}>
          <select name="difficulty" ref={register}>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </Styled.Box>
        <label htmlFor="description">
          <span>Description</span>
        </label>
        <textarea
          cols={6}
          rows={4}
          placeholder="Enter Description"
          name="description"
          ref={register({
            required: 'Description is required',
            min: {
              value: 40,
              message: 'Description needs to be at least 40 characters long',
            },
          })}
        />
        <ErrorMessage errors={errors} name={'description'} />
        <label htmlFor="totalCost">
          <span>Total Cost</span>
        </label>
        <input
          type="number"
          placeholder="Enter Total Cost"
          name="totalCost"
          ref={register({
            required: 'Total cost is required',
            min: {
              value: 1,
              message: 'Overall cost should be at least 1 (dollar)',
            },
          })}
        />
        <ErrorMessage errors={errors} name={'totalCost'} />
        <label htmlFor="ingredient">
          <span>Ingredients</span>
        </label>
        <Styled.Box display="flex">
          <Input
            type="text"
            name="ingredients"
            ref={register({
              validate: () => {
                if (ingredients.length < 1) return 'Ingredients are required';

                if (ingredients.length > 12)
                  return 'There should be at most 12 ingredients';
              },
            })}
            hidden
          />
          <Input
            width={145}
            type="text"
            placeholder="Enter name"
            name="ingredient.name"
            ref={register(
              watch('ingredient.amount') || ingredients.length < 1
                ? {
                    required: 'Ingredient name is required',
                  }
                : { required: false },
            )}
          />
          <Input
            ml={4}
            width={58}
            type="text"
            placeholder="Amount"
            name="ingredient.amount"
            ref={register(
              watch('ingredient.name') || ingredients.length < 1
                ? {
                    required: 'Ingredient amount is required',
                  }
                : { required: false },
            )}
          />
          <Styled.IconButton
            height={'45px'}
            ml={4}
            boxShadow="clearInset"
            type="button"
            onClick={handleIngredients}
          >
            <FontAwesomeIcon size={'1x'} icon={faPlus} />
          </Styled.IconButton>
        </Styled.Box>
        <ErrorMessage errors={errors} name={'ingredient'} />
        <ErrorMessage errors={errors} name={'ingredients'} />
        <ErrorMessage errors={errors} name={'ingredient.name'} />
        <ErrorMessage errors={errors} name={'ingredient.amount'} />
        {ingredients &&
          ingredients.map(({ name, amount }: Ingredient, index) => {
            return (
              <Styled.Box
                width="100%"
                display="flex"
                flexWrap={'wrap'}
                justifyContent="space-between"
                key={name + Math.random() * name.length}
                cursor={'pointer'}
                onClick={() => removeIngredient(index)}
              >
                <Styled.Box>{name}</Styled.Box>
                <div>
                  <Styled.Box>{amount}</Styled.Box>
                </div>
              </Styled.Box>
            );
          })}

        <ErrorMessage errors={errors} name={'ingredient.tag'} />
      </Styled.Box>

      <Styled.Box
        mb={6}
        width="100%"
        display="flex"
        justifyContent="space-between"
      >
        <Styled.Box display="flex" justifyContent="flex-start">
          <Styled.Button
            p={5}
            type="button"
            boxShadow={paginationForm ? 'clearInset' : 'neumorphism'}
            mr={5}
            onClick={() => setPaginationForm(!paginationForm)}
          >
            1
          </Styled.Button>
          <Styled.Button
            p={5}
            type="button"
            boxShadow={paginationForm ? 'neumorphism' : 'clearInset'}
            onClick={() => setPaginationForm(!paginationForm)}
          >
            2
          </Styled.Button>
        </Styled.Box>
        <Styled.Box display="flex" justifyContent="flex-end">
          <Styled.Button type="submit" p={5} variant="secondary" mr={5}>
            Submit
          </Styled.Button>
          <Styled.Button
            onClick={() => setIsOpen(false)}
            p={5}
            variant="danger"
            type={'button'}
          >
            Cancel
          </Styled.Button>
        </Styled.Box>
      </Styled.Box>
    </Form>
  );
};

export default memo(AddRecipeForm);
