import React, { useState, useEffect } from 'react';
import useForm from 'react-hook-form';
import { Box, Button } from 'style';
import Form from 'component/Form/Form';
import { StyledRating, Textarea } from './recipe.view.style';

type CommmentForm = {
  rating: number;
  description: string;
  timestamp: number;
};

type Props = { recipe: any; setIsOpen: (arg: boolean) => void };

const CommentDialog: React.FC<Props> = ({ setIsOpen, recipe }) => {
  const [rating, setRating] = useState<number>(0);
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
  } = useForm<CommmentForm>();

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

  const onSubmit = ({}: CommmentForm) => {
    console.log('Add Comment');
  };

  return (
    <Form>
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
      </Box>
      <Box mb={6} width="100%" display="flex" justifyContent="flex-end">
        <Button
          type="submit"
          p={5}
          color={'secondary.500'}
          boxShadow="neumorphism"
          mr={5}
          onClick={e => {
            e.preventDefault();
            onSubmit(getValues());
          }}
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
