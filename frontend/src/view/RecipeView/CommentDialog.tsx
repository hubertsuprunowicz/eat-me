import React, { useState } from 'react';
import useForm from 'react-hook-form';
import { Box, Button } from 'style';
import Form from 'component/Form/Form';
import { StyledRating } from './recipe.view.style';
import { useMutation } from '@apollo/react-hooks';
import { COMMENT } from './recipe.graphql';
import { toast } from 'react-toastify';

type CommmentForm = {
  rating: number;
  description: string;
  timestamp: number;
};

type Props = { userID: number; recipe: any; setIsOpen: (arg: boolean) => void };

const CommentDialog: React.FC<Props> = ({ setIsOpen, recipe, userID }) => {
  const [rating, setRating] = useState<number>(0);
  const { handleSubmit, register, setError, errors, reset } = useForm<
    CommmentForm
  >();

  const [addComment] = useMutation(COMMENT, {
    onError: _ => {
      toast.error('Something has failed', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
    onCompleted: () => {
      toast.success('Comment has been added', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
  });

  const onSubmit = ({ description }: CommmentForm) => {
    if (!rating) {
      setError('description', 'empty', 'Rating should be provided');
      return;
    }

    addComment({
      variables: {
        userID: userID,
        recipeID: recipe._id,
        rating: rating,
        description: description,
        timestamp: Date.now(),
      },
    }).then(() => {
      reset();
      setIsOpen(false);
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Box display={'flex'} flexDirection="column" alignItems="center" p={20}>
        <label htmlFor="description" style={{ alignSelf: 'flex-end' }}>
          <StyledRating
            emptySymbol={'fas fa-star fa-1x empty'}
            fullSymbol={'fas fa-star fa-1x full'}
            onChange={value => setRating(value)}
          />
        </label>
        <textarea
          placeholder="Enter Description"
          name="description"
          ref={register}
        />
        {errors.description && errors.description.message}
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
