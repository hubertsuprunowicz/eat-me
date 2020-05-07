import React, { useState } from 'react';
import { useForm, FieldError } from 'react-hook-form';
import * as Style from 'style';
import Form from 'component/Form/Form';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from './styles';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import ErrorMessage from 'component/ErrorMessage/ErrorMessage';
import {
  useUpdateRecipeMutation,
  Difficulty,
  Tag,
  Ingredient,
  Recipe,
} from 'model/generated/graphql';

type UpdateRecipeForm = {
  id: number;
  title?: string;
  description?: string;
  image?: Blob[];
  time?: number;
  difficulty?: Difficulty;
  totalCost?: number;
  tag?: Tag;
  tags?: Tag[];
  ingredient?: Ingredient;
  ingredients?: Ingredient[];
  mutationError?: FieldError;
};

type Props = { recipe: Recipe; setIsOpen: (arg: boolean) => void };

const UpdateRecipeDialog: React.FC<Props> = ({ setIsOpen, recipe }) => {
  const [, resetComponent] = useState();
  const [paginationForm, setPaginationForm] = useState<1 | 2 | 3>(1);
  const [tags, setTags] = useState<Tag[]>(recipe.tag);
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    recipe.ingredient,
  );
  const {
    handleSubmit,
    setValue,
    register,
    setError,
    errors,
    reset,
    clearError,
    watch,
  } = useForm<UpdateRecipeForm>({
    defaultValues: {
      description: recipe.description,
      difficulty: recipe.difficulty,
      title: recipe.name,
      time: recipe.time,
      totalCost: recipe.totalCost,
    },
  });

  const [updateRecipe] = useUpdateRecipeMutation({
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
      toast.success('Recipe has been updated successfully', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
  });

  const onSubmit = (data: UpdateRecipeForm) => {
    if (data?.image?.[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(data?.image?.[0]);
      reader.onloadend = ({ currentTarget }) => {
        updateRecipe({
          variables: {
            id: recipe._id ? recipe._id : '',
            name: data.title,
            description: data.description,
            image: (currentTarget as any).result,
            time: data.time ? parseInt(data.time.toString()) : undefined,
            tag: tags.map((it) => {
              return {
                name: it.name,
              };
            }),
            ingredient: ingredients.map((it) => {
              return {
                name: it.name,
                amount: it.amount,
              };
            }),
            totalCost: data.totalCost
              ? parseFloat(data.totalCost.toString())
              : undefined,
            difficulty: data.difficulty,
          },
        });
      };
    } else {
      updateRecipe({
        variables: {
          id: recipe._id ? recipe._id : '',
          name: data.title,
          description: data.description,
          image: undefined,
          time: data.time ? parseInt(data.time.toString()) : undefined,
          tag: tags.map((it) => {
            return {
              name: it.name,
            };
          }),
          ingredient: ingredients.map((it) => {
            return {
              name: it.name,
              amount: it.amount,
            };
          }),
          totalCost: data.totalCost
            ? parseFloat(data.totalCost.toString())
            : undefined,
          difficulty: data.difficulty,
        },
      });
    }
  };

  const removeIngredient = (index: number) => {
    const temp = ingredients;
    if (temp) temp.splice(index, 1);
    setIngredients(temp);
    resetComponent({});
  };

  const removeTag = (index: number) => {
    const temp = tags;
    if (temp) temp.splice(index, 1);
    setTags(temp);
    resetComponent({});
  };

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
    } else if (ingredient.amount.length > 18) {
      setError(
        'ingredient',
        'tooLong',
        'Ingredient amount should be at most 18 letters long',
      );
    } else if (ingredients?.length > 14) {
      setError(
        'ingredient',
        'tooMany',
        'There should be at most 14 ingredients',
      );
    } else {
      clearError('ingredient');
      setIngredients([...ingredients, ingredient]);
      setValue('ingredient.name', '');
      setValue('ingredient.amount', '');
    }
  };

  return (
    <Form>
      <Style.Box
        display={paginationForm === 1 ? 'flex' : 'none'}
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
          <span>Image</span>
        </label>
        <input type="file" name="image" accept="image/*" ref={register} />
        <ErrorMessage errors={errors} name={'image'} />
        <label htmlFor="time">
          <span>Time</span>
        </label>
        <input
          type="number"
          placeholder="Time needed to prepare meal (minutes)"
          name="time"
          ref={register({
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
        <Style.Box display="flex">
          <Input
            type="text"
            width={210}
            placeholder="Enter tag"
            name="tag.name"
            ref={register}
          />
          <Style.IconButton
            height={'45px'}
            ml={4}
            boxShadow="insetNeumorphism"
            type="button"
            onClick={handleTags}
          >
            <FontAwesomeIcon size={'1x'} icon={faPlus} />
          </Style.IconButton>
        </Style.Box>
        <ErrorMessage errors={errors} name={'tag.name'} />
        <Style.Box mt={4} mb={2} display="flex" flexWrap={'wrap'}>
          {tags &&
            tags?.map((tag: Tag, index) => (
              <Style.Tag
                bg={'primary.300'}
                key={tag.name + Math.random() * tag.name.length}
                cursor={'pointer'}
                onClick={() => removeTag(index)}
              >
                {tag.name} <FontAwesomeIcon icon={faTimes} />
              </Style.Tag>
            ))}
        </Style.Box>
        <ErrorMessage errors={errors} name={'tag'} />
        <ErrorMessage errors={errors} name={'tags'} />
      </Style.Box>
      <Style.Box
        display={paginationForm === 2 ? 'flex' : 'none'}
        flexDirection="column"
        alignItems="center"
        p={20}
      >
        <label htmlFor="difficulty">
          <span>Difficulty</span>
        </label>
        <Style.Box display={'flex'}>
          <select name="difficulty" ref={register}>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </Style.Box>
        <label htmlFor="description">
          <span>Description</span>
        </label>
        <textarea
          cols={6}
          rows={4}
          wrap="hard"
          placeholder="Enter Description"
          name="description"
          ref={register({
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
          placeholder="Enter Total Cost (dollars)"
          name="totalCost"
          ref={register({
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
        <Style.Box display="flex">
          <Input
            type="text"
            name="ingredients"
            ref={register({
              validate: () => {
                if (ingredients.length < 1) return 'Ingredients are required';

                if (ingredients.length > 14)
                  return 'There should be at most 14 ingredients';
              },
            })}
            hidden
          />
          <Input
            width={132}
            type="text"
            placeholder="Enter name"
            name="ingredient.name"
            ref={register(
              watch('ingredient.amount') && ingredients.length < 1
                ? {
                    required: 'Ingredient name is required',
                  }
                : { required: false },
            )}
          />
          <Input
            ml={4}
            width={55}
            type="text"
            placeholder="Amount"
            name="ingredient.amount"
            ref={register(
              watch('ingredient.name') && ingredients.length < 1
                ? {
                    required: 'Ingredient amount is required',
                  }
                : { required: false },
            )}
          />
          <Style.IconButton
            height={'45px'}
            ml={4}
            boxShadow="insetNeumorphism"
            type="button"
            onClick={handleIngredients}
          >
            <FontAwesomeIcon size={'1x'} icon={faPlus} />
          </Style.IconButton>
        </Style.Box>
        <ErrorMessage errors={errors} name={'ingredient'} />
        <ErrorMessage errors={errors} name={'ingredients'} />
        <ErrorMessage errors={errors} name={'ingredient.name'} />
        <ErrorMessage errors={errors} name={'ingredient.amount'} />
        {ingredients &&
          ingredients.map(({ _id, name, amount }: Ingredient, index) => (
            <Style.Box
              width="100%"
              display="flex"
              flexWrap={'wrap'}
              justifyContent="space-between"
              key={_id ?? ''}
              cursor={'pointer'}
              onClick={() => removeIngredient(index)}
            >
              <Style.Box>{name}</Style.Box>
              <div>
                <Style.Box>{amount}</Style.Box>
              </div>
            </Style.Box>
          ))}

        <ErrorMessage errors={errors} name={'ingredient'} />
      </Style.Box>

      <Style.Box
        mb={6}
        width="100%"
        display="flex"
        justifyContent="space-between"
      >
        <Style.Box display="flex" justifyContent="flex-start">
          <Style.Button
            p={5}
            type="button"
            boxShadow={
              paginationForm === 1 ? 'insetNeumorphism' : 'neumorphism'
            }
            mr={4}
            onClick={() => setPaginationForm(1)}
          >
            1
          </Style.Button>
          <Style.Button
            p={5}
            type="button"
            boxShadow={
              paginationForm === 2 ? 'insetNeumorphism' : 'neumorphism'
            }
            mr={4}
            onClick={() => setPaginationForm(2)}
          >
            2
          </Style.Button>
        </Style.Box>
        <Style.Box display="flex" justifyContent="flex-end">
          <Style.Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            p={5}
            variant={'secondary'}
            mr={5}
          >
            Submit
          </Style.Button>
          <Style.Button
            onClick={() => setIsOpen(false)}
            p={5}
            variant={'danger'}
            type={'button'}
          >
            Cancel
          </Style.Button>
        </Style.Box>
      </Style.Box>
    </Form>
  );
};

export default UpdateRecipeDialog;
