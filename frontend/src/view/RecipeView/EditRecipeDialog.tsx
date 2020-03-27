import React, { useState, useEffect } from 'react';
import useForm from 'react-hook-form';
import * as Style from 'style';
import Form from 'component/Form/Form';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/react-hooks';
import { useAuthState } from 'utils/auth';
import User from 'model/user';
import { isEmpty } from 'view/MessageView/MessageDialog';
import { Difficulty, Ingredient, Tag } from 'view/RecipesView/AddRecipeForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from './recipe.view.style';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Recipe } from 'view/RecipesView/RecipesView';

type EditRecipeForm = {
  id: number;
  title?: string;
  description?: string;
  image?: string;
  time?: number;
  difficulty?: Difficulty;
  tag?: Tag;
  tags?: Tag[];
  ingredient?: Ingredient;
  ingredients?: Ingredient[];
};

type Props = { recipe: Recipe; setIsOpen: (arg: boolean) => void };

const EditRecipeDialog: React.FC<Props> = ({ setIsOpen, recipe }) => {
  const [, resetComponent] = useState();
  const [paginationForm, setPaginationForm] = useState<1 | 2 | 3>(1);
  const [tags, setTags] = useState<Tag[]>(recipe.tag);
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    recipe.ingredient,
  );
  const {
    handleSubmit,
    getValues,
    formState,
    setValue,
    register,
    setError,
    errors,
    triggerValidation,
    reset,
    clearError,
    watch,
  } = useForm<EditRecipeForm>();

  //   const [editUser] = useMutation(EDIT_USER, {
  //     onError: _ => {
  //       toast.error('Something has failed', {
  //         position: toast.POSITION.BOTTOM_RIGHT,
  //       });
  //     },
  //     onCompleted: () => {
  //       toast.success('Message has been sent', {
  //         position: toast.POSITION.BOTTOM_RIGHT,
  //       });
  //     },
  //   });

  const onSubmit = ({ description }: EditRecipeForm) => {
    console.log('EDIT RECIPE');
    // editUser({
    //   variables: {
    //     oldName: user.name,
    //     name: name,
    //     password: password,
    //     email: email,
    //     avatar: avatar,
    //     description: description,
    //   },
    // }).then(() => {
    //   reset();
    //   setIsOpen(false);
    // });
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

  const handleTags = () => {
    const tag = watch('tag');
    if (!tag) return;

    if (tag.name.length < 4) {
      setError(
        'tags',
        'tooShort',
        'This text should be at least 4 letters long',
      );
    } else if (tags.length >= 6) {
      setError('tags', 'tooMany', 'There is too many tags');
    } else {
      clearError('tags');
      setTags([...tags, tag]);
      setValue('tag', { name: '' });
    }
  };

  const handleIngredients = () => {
    const ingredient = watch('ingredient');
    if (!ingredient) return;

    if (ingredient.name.length < 3) {
      setError(
        'ingredients',
        'tooShort',
        'This text should be at least 3 letters long',
      );
    } else {
      clearError('ingredients');
      setIngredients([...ingredients, ingredient]);
      setValue('ingredient', { name: '', amount: '' });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
          defaultValue={recipe.title}
          ref={register}
        />
        <label htmlFor="image">
          <span>Image Link</span>
        </label>
        <input
          type="text"
          placeholder="Enter Image Link"
          name="image"
          defaultValue={recipe.image}
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
          defaultValue={recipe.time.toString()}
          ref={register}
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
            minLength={4}
            maxLength={20}
          />
          <Style.IconButton
            ml={4}
            boxShadow="insetNeo"
            type="button"
            onClick={handleTags}
          >
            <FontAwesomeIcon size={'1x'} icon={faPlus} />
          </Style.IconButton>
        </Style.Box>
        <Style.Box mt={4} mb={2} display="flex" flexWrap={'wrap'}>
          {tags &&
            tags.map((tag: Tag, index) => (
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
        {errors.tags && errors.tags.message}
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
          <select
            name="difficulty"
            defaultValue={recipe.difficulty}
            ref={register}
          >
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
          defaultValue={recipe.description}
          placeholder="Enter Description"
          name="description"
          ref={register({
            required: true,
          })}
        />
        <label htmlFor="ingredient">
          <span>Ingredients</span>
        </label>
        <Style.Box display="flex">
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
            ref={register}
            maxLength={10}
          />
          <Style.IconButton
            ml={4}
            boxShadow="insetNeo"
            type="button"
            onClick={handleIngredients}
          >
            <FontAwesomeIcon size={'1x'} icon={faPlus} />
          </Style.IconButton>
        </Style.Box>
        {ingredients &&
          ingredients.map(({ name, amount }: Ingredient, index) => {
            return (
              <Style.Box
                width="100%"
                display="flex"
                flexWrap={'wrap'}
                justifyContent="space-between"
                key={name + Math.random() * name.length}
                cursor={'pointer'}
                onClick={() => removeIngredient(index)}
              >
                <Style.Box>{name}</Style.Box>
                <div>
                  <Style.Box>{amount}</Style.Box>
                </div>
              </Style.Box>
            );
          })}

        {errors.tags && errors.tags.message}
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
            color={'grey.700'}
            boxShadow={paginationForm === 1 ? 'insetNeo' : 'neumorphism'}
            mr={4}
            onClick={() => setPaginationForm(1)}
          >
            1
          </Style.Button>
          <Style.Button
            p={5}
            color={'grey.700'}
            boxShadow={paginationForm === 2 ? 'insetNeo' : 'neumorphism'}
            mr={4}
            onClick={() => setPaginationForm(2)}
          >
            2
          </Style.Button>
          <Style.Button
            p={5}
            color={'grey.700'}
            boxShadow={paginationForm === 3 ? 'insetNeo' : 'neumorphism'}
            onClick={() => setPaginationForm(3)}
          >
            3
          </Style.Button>
        </Style.Box>
        <Style.Box display="flex" justifyContent="flex-end">
          <Style.Button
            type="submit"
            p={5}
            color={'secondary.500'}
            boxShadow="neumorphism"
            mr={5}
          >
            Submit
          </Style.Button>
          <Style.Button
            onClick={() => setIsOpen(false)}
            p={5}
            color={'danger.500'}
            boxShadow="neumorphism"
          >
            Cancel
          </Style.Button>
        </Style.Box>
      </Style.Box>
    </Form>
  );
};

export default EditRecipeDialog;
