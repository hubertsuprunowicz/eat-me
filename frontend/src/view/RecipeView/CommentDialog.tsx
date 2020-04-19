import React, { useState } from 'react';
import { useForm, FieldError } from 'react-hook-form';
import { Box, Button } from 'style';
import Form from 'component/Form/Form';
import { StyledRating } from './recipe.view.style';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_COMMENT } from './recipe.graphql';
import { toast } from 'react-toastify';
import ErrorMessage from 'component/ErrorMessage/ErrorMessage';

type CommmentForm = {
  rating: number;
  description: string;
  timestamp: number;
  mutationError?: FieldError;
};

type Props = { userID: number; recipe: any; setIsOpen: (arg: boolean) => void };

const CommentDialog: React.FC<Props> = ({ setIsOpen, recipe, userID }) => {
  const [rating, setRating] = useState<number>(0);
  const { handleSubmit, register, setError, errors, reset } = useForm<
    CommmentForm
  >();

  const [createComment] = useMutation(CREATE_COMMENT, {
    onError: error => {
      setError(
        'mutationError',
        'mutationError',
        error.graphQLErrors[0].message,
      );
    },
    onCompleted: () => {
      reset();
      setIsOpen(false);
      toast.success('Comment has been added', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
  });

  const onSubmit = ({ description }: CommmentForm) => {
    if (rating < 1) {
      setError('rating', 'empty', 'Rating should be provided');
      return;
    }

    createComment({
      variables: {
        userID: userID,
        recipeID: recipe._id,
        rating: rating,
        description: description,
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Box display={'flex'} flexDirection="column" alignItems="center" p={20}>
        <StyledRating
          initialRating={rating}
          emptySymbol={'fas fa-star fa-1x empty'}
          fullSymbol={'fas fa-star fa-1x full'}
          onChange={value => setRating(value)}
        />

        <ErrorMessage errors={errors} name={'rating'} />
        <textarea
          placeholder="Enter Description"
          name="description"
          ref={register({
            minLength: {
              value: 6,
              message: 'Description needs to be at least 6 characters long',
            },
          })}
        />
        <ErrorMessage errors={errors} name={'description'} />
        <ErrorMessage errors={errors} name={'mutationError'} />
      </Box>
      <Box mb={6} width="100%" display="flex" justifyContent="flex-end">
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
          type="button"
          color={'danger.500'}
          boxShadow="neumorphism"
        >
          Cancel
        </Button>
      </Box>
    </Form>
  );
};

export default CommentDialog;
