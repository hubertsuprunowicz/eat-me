import React, { useState, useEffect } from 'react';
import {
  BackgroundImage,
  TagWrapper,
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
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import FormModal from 'component/FormModal/FormModal';
import { RECIPES_VIEW, PROFILE_VIEW } from 'view/Route/constants.route';
import EditRecipeDialog from './EditRecipeDialog';
import { RECIPE, WATCHES, UNWATCHES, GET_WATCH } from './recipe.graphql';
import Comment from 'component/Comment/Comment';
import CommentDialog from './CommentDialog';
import useForm from 'react-hook-form';
import { toast } from 'react-toastify';

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

  const [getWatch] = useLazyQuery(GET_WATCH, {
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setSubscribed(data.getWatch.subscribed);
    },
  });

  if (loading) return <>loading...</>;

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
    },
  ] = data.Recipe || {};

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

  return (
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
        borderRadius={5}
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
        <span
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {name}
        </span>
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

            {user && 'user' === user.name && (
              <EditButton
                mt={-3}
                mb={2}
                borderRadius={'5px'}
                boxShadow={'neumorphism'}
                onClick={() => setIsRecipeDialogOpen(true)}
              >
                <FontAwesomeIcon size={'lg'} icon={faEdit} />
              </EditButton>
            )}
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
          <span style={{ marginTop: '4px' }}>ingredients</span>
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
      </Box>

      <Box p={8}>
        <Box display={'flex'} justifyContent={'center'}>
          <span
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            How to do it?
          </span>
        </Box>
        <p style={{ lineHeight: '21px' }}>{description}</p>
      </Box>
      <Box p={8}>
        <span
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Author
        </span>
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
            <b style={{ fontWeight: 700 }}>
              {comment[alreadyVoted()].rating}/5
            </b>
          </span>
        </Box>
      )}
      {alreadyVoted() === -1 && (
        <Box display="flex" alignItems="center">
          <span
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Leave your feedback{' '}
          </span>
          <Button
            color={'black'}
            borderRadius={'5px'}
            ml={4}
            p={5}
            boxShadow={'neumorphism'}
            style={{ fontSize: '1.3rem' }}
            onClick={() => setIsCommentDialogOpen(true)}
          >
            here!
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
          <EditRecipeDialog
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
  );
};

export default RecipeView;
