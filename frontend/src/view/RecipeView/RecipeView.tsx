import React, { useState, useEffect } from 'react';
import {
  BackgroundImage,
  EditButton,
  IngredientsList,
  AuthorImage,
} from './recipe.view.style';
import { Box, Button, LinkButton, Text, IconButton } from 'style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faHeart,
  faStar,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { useAuthState } from 'utils/auth';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import FormModal from 'component/FormModal/FormModal';
import { PROFILE_VIEW } from 'view/Route/constants.route';
import UpdateRecipeDialog from './UpdateRecipeDialog';
import { RECIPE, WATCHES, UNWATCHES, GET_WATCH } from './recipe.graphql';
import Comment from 'component/Comment/Comment';
import CommentDialog from './CommentDialog';
import { toast } from 'react-toastify';
import LoadingOverlay from 'component/LoadingOverlay/LoadingOverlay';
import ErrorRedirect from 'component/ErrorRedirect/ErrorRedirect';

const RecipeView: React.FC = () => {
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [isRecipeDialogOpen, setIsRecipeDialogOpen] = useState<boolean>(false);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState<boolean>(
    false,
  );
  const { id } = useParams();
  const { user } = useAuthState();

  const [addWatches] = useMutation(WATCHES, {
    onError: _ => {
      toast.error('Something has failed', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
    onCompleted: () => {
      toast.success('Subscibed successfully', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
  });

  const [removeWatches] = useMutation(UNWATCHES, {
    onError: _ => {
      toast.error('Something has failed', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
    onCompleted: () => {
      toast.success('Unsubscibed successfully', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
  });

  const { loading, error, data } = useQuery(RECIPE, {
    fetchPolicy: 'cache-and-network',
    variables: {
      id: id,
    },
  });

  useEffect(() => {
    if (data) {
      getWatch({
        variables: {
          subscribingUser: user!._id,
          subscribedUser: data.Recipe[0].user._id || 0,
        },
      });
    }

    // Needs to load just once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const [getWatch] = useLazyQuery(GET_WATCH, {
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setSubscribed(data.getWatch.subscribed);
    },
  });

  function alreadyVoted() {
    return comment.findIndex((it: any) => it.user.name === user!.name);
  }

  // TODO: return number, solution: add model with graphql:codegen
  function totalRating() {
    return (
      comment.reduce(
        (acc: number, curr: { rating: number }) => acc + curr.rating,
        0,
      ) / comment.length
    ).toFixed(1);
  }

  const handleSubscribe = () => {
    addWatches({
      variables: {
        subscribingUser: user!._id,
        subscribedUser: data.Recipe[0].user._id || 0,
      },
    }).then(() => {
      getWatch({
        variables: {
          subscribingUser: user!._id,
          subscribedUser: data.Recipe[0].user._id || 0,
        },
      });
    });
  };

  const handleUnsubscribe = () => {
    removeWatches({
      variables: {
        subscribingUser: user!._id,
        subscribedUser: data.Recipe[0].user._id || 0,
      },
    }).then(() => {
      getWatch({
        variables: {
          subscribingUser: user!._id,
          subscribedUser: data.Recipe[0].user._id || 0,
        },
      });
    });
  };

  if (error) return <ErrorRedirect error={error} />;
  if (!data) return null;

  const [
    {
      name,
      image,
      description,
      time,
      tag,
      ingredient,
      comment,
      difficulty,
      totalCost,
      user: recipeAuthor,
    },
  ] = data.Recipe || {};

  return (
    <LoadingOverlay isLoading={loading}>
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        mb={100}
      >
        <BackgroundImage src={image} alt={name} />

        <Box
          mt={-70}
          p={5}
          pb={4}
          borderRadius={0}
          width={'80%'}
          backgroundColor={'white'}
          display={'flex'}
          justifyContent={'space-around'}
          flexDirection={'column'}
          minHeight={'240px'}
          alignContent={'space-around'}
          alignItems={'center'}
          boxShadow={'neumorphism'}
          position={'relative'}
        >
          <Text fontSize="1.5rem" fontWeight={700} textAlign="center">
            {name}
          </Text>
          {/* TODO: change 'user' to name of recipe author */}

          <Box display={'flex'} flexDirection={'column'} width={'80%'}>
            <Box
              mt={6}
              display={'flex'}
              justifyContent={'space-between'}
              color={'primary.500'}
            >
              <div>
                <FontAwesomeIcon icon={faStar} />
                {'  '}
                {totalRating() ? (
                  <Text fontSize={3} fontWeight={700}>
                    {totalRating()} / 5
                  </Text>
                ) : (
                  <Text fontSize={3} fontWeight={700}>
                    No ratings, be first!
                  </Text>
                )}
              </div>
            </Box>
            <Box mt={3} display={'flex'} justifyContent={'space-between'}>
              <span>time</span>
              <span>{time}min</span>
            </Box>
            <Box mt={3} display={'flex'} justifyContent={'space-between'}>
              <span>total cost</span>
              <span>{totalCost}$</span>
            </Box>
            <Box mt={3} display={'flex'} justifyContent={'space-between'}>
              <span>difficulty</span>
              <span>{difficulty.toLowerCase()}</span>
            </Box>
            <Text mt={3}>ingredients</Text>
            <Box display={'flex'} justifyContent={'space-between'}>
              <IngredientsList>
                {ingredient.map((it: any, index: number) => (
                  <li key={index}>
                    <Box display={'flex'} justifyContent={'space-between'}>
                      <span>{it.name}</span>
                      <span>{it.amount}</span>
                    </Box>
                  </li>
                ))}
              </IngredientsList>
            </Box>
          </Box>
          <Box
            mt={3}
            display={'flex'}
            flexWrap={'wrap'}
            justifyContent={'center'}
            style={{
              borderBottomLeftRadius: '5px',
              borderBottomRightRadius: '5px',
              fontSize: '0.8rem',
            }}
            p={4}
          >
            <span
              style={{
                position: 'absolute',
                fontSize: '5rem',
                fontWeight: 'bold',
                left: 15,
                bottom: -10,
                opacity: 0.05,
              }}
            >
              #
            </span>
            {tag.map((it: any, index: number) => (
              <span key={index} style={{ padding: '5px', fontWeight: 600 }}>
                {it.name}
              </span>
            ))}
          </Box>
        </Box>
        <Box mt={7}>
          {subscribed ? (
            <IconButton
              ml={5}
              color={'secondary.500'}
              boxShadow={'neumorphism'}
              onClick={handleUnsubscribe}
            >
              <FontAwesomeIcon size={'lg'} icon={faEyeSlash} />
            </IconButton>
          ) : (
            <IconButton
              ml={5}
              color={'secondary.500'}
              boxShadow={'neumorphism'}
              onClick={handleSubscribe}
            >
              <FontAwesomeIcon size={'lg'} icon={faEye} />
            </IconButton>
          )}
          <IconButton
            ml={5}
            color={'danger.500'}
            boxShadow={'neumorphism'}
            onClick={handleSubscribe}
          >
            <FontAwesomeIcon size={'lg'} icon={faHeart} />
          </IconButton>
          {user && recipeAuthor.name === user.name && (
            <EditButton
              ml={5}
              boxShadow={'neumorphism'}
              onClick={() => setIsRecipeDialogOpen(true)}
            >
              <FontAwesomeIcon size={'lg'} icon={faEdit} />
            </EditButton>
          )}
        </Box>

        <Box p={8}>
          <Box display={'flex'} justifyContent={'center'}>
            <Text
              variant="cursive"
              fontWeight={700}
              fontSize={5}
              color={'grey.800'}
            >
              How to do it?
            </Text>
          </Box>
          <Text lineHeight={'21px'}>{description}</Text>
        </Box>
        <Box p={8}>
          <Text fontSize="1.5rem" fontWeight={700} textAlign="center">
            Author
          </Text>
          <Box display={'flex'} mt={3}>
            <Box
              mr={7}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'space-between'}
            >
              <span>{data.Recipe[0].user.name}</span>
              <LinkButton
                to={`${PROFILE_VIEW}/${data.Recipe[0].user.name}`}
                color={'warn.600'}
              >
                More
              </LinkButton>
            </Box>
            <AuthorImage src={data.Recipe[0].user.avatar} />
          </Box>
        </Box>
        {alreadyVoted() !== -1 && (
          <Box>
            <span>
              Your rating of this recipe is{' '}
              <Text fontWeight={700}>{comment[alreadyVoted()].rating}/5</Text>
            </span>
          </Box>
        )}
        {alreadyVoted() === -1 && (
          <Box display="flex" alignItems="center">
            <Text fontSize="1.5rem" fontWeight={700} textAlign="center">
              Leave your feedback{' '}
            </Text>
            <Button
              color={'grey.900'}
              ml={4}
              p={5}
              boxShadow={'neumorphism'}
              onClick={() => setIsCommentDialogOpen(true)}
            >
              <Text fontSize="1.3rem">here!</Text>
            </Button>
          </Box>
        )}

        <Box
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'center'}
          flexWrap={'wrap'}
          p={8}
        >
          {comment.map(({ timestamp, description, rating, user, _id }: any) => (
            <Comment
              key={_id}
              rating={rating}
              username={user.name}
              timestamp={timestamp}
            >
              {description}
            </Comment>
          ))}
        </Box>
        {isRecipeDialogOpen && user && (
          <FormModal
            title="Edit Recipe"
            allRequired={false}
            isOpen={isRecipeDialogOpen}
            closeModal={() => setIsRecipeDialogOpen(false)}
          >
            <UpdateRecipeDialog
              recipe={data.Recipe[0]}
              setIsOpen={setIsCommentDialogOpen}
            />
          </FormModal>
        )}

        {isCommentDialogOpen && user && (
          <FormModal
            title="Add Comment"
            allRequired={false}
            isOpen={isCommentDialogOpen}
            closeModal={() => setIsCommentDialogOpen(false)}
          >
            <CommentDialog
              userID={user._id}
              recipe={data.Recipe[0]}
              setIsOpen={setIsCommentDialogOpen}
            />
          </FormModal>
        )}
      </Box>
    </LoadingOverlay>
  );
};

export default RecipeView;
