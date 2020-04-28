import React, { useState, useEffect } from 'react';
import {
  BackgroundImage,
  EditButton,
  IngredientsList,
  AuthorImage,
  TagsHolder,
} from './styles';
import { Box, Button, LinkButton, Text, IconButton, Tag } from 'style';
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
import FormModal from 'component/FormModal/FormModal';
import Comment from 'component/Comment/Comment';
import { PROFILE_VIEW } from 'utils/constants.route';
import UpdateRecipeDialog from './UpdateRecipeDialog';
import CommentDialog from './CommentDialog';
import { toast } from 'react-toastify';
import LoadingOverlay from 'component/LoadingOverlay/LoadingOverlay';
import ErrorRedirect from 'component/ErrorRedirect/ErrorRedirect';
import * as Model from 'model/generated/graphql';

const defaultAvatar = 'img/user-solid.svg';

const RecipeView: React.FC = () => {
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [isRecipeDialogOpen, setIsRecipeDialogOpen] = useState<boolean>(false);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState<boolean>(
    false,
  );
  const { id } = useParams();
  const { user } = useAuthState();

  const [createWatches] = Model.useCreateWatchMutation({
    onError: (_) => {
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

  const [removeWatches] = Model.useRemoveWatchMutation({
    onError: (_) => {
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

  const { loading, error, data } = Model.useRecipeQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: id ?? '',
    },
  });

  useEffect(() => {
    if (data && data.Recipe && user) {
      getWatch({
        variables: {
          subscribingUser: user._id ?? '',
          subscribedUser: data.Recipe[0]?.user._id ?? '',
        },
      });
    }

    // Needs to load just once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const [getWatch] = Model.useGetWatchLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      setSubscribed(data.getWatch.subscribed);
    },
  });

  const alreadyVoted = (comments: Model.Comment[]) => {
    return comments.findIndex((it) => it.user.name === user!.name);
  };

  const totalRating = (comments: Model.Comment[]) => {
    if (comments.length < 1) return 0;

    const rating =
      comments.reduce((acc, curr) => acc + curr.rating, 0) / comments.length;

    return rating.toFixed(1);
  };

  const handleSubscribe = () => {
    if (!data?.Recipe?.[0]) return;

    createWatches({
      variables: {
        subscribingUser: user?._id ?? '',
        subscribedUser: data.Recipe[0].user._id ?? '',
      },
    }).then(() => {
      getWatch({
        variables: {
          subscribingUser: user?._id ?? '',
          subscribedUser: data?.Recipe?.[0]?.user._id ?? '',
        },
      });
    });
  };

  const handleUnsubscribe = () => {
    if (!data?.Recipe?.[0]) return;

    removeWatches({
      variables: {
        subscribingUser: user?._id ?? '',
        subscribedUser: data?.Recipe[0].user._id ?? '',
      },
    }).then(() => {
      getWatch({
        variables: {
          subscribingUser: user?._id ?? '',
          subscribedUser: data?.Recipe?.[0]?.user._id ?? '',
        },
      });
    });
  };

  if (error) return <ErrorRedirect error={error} />;
  if (!data || !data.Recipe) return null;

  // TODO: 404
  if (!data.Recipe[0]) return null;

  const recipe = data.Recipe[0];
  const alreadyVotedData =
    alreadyVoted(recipe?.comment as Model.Comment[]) ?? 0;
  const totalRatingData = totalRating(recipe?.comment as Model.Comment[]) ?? 0;

  return (
    <LoadingOverlay isLoading={loading}>
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        mb={100}
      >
        <BackgroundImage src={recipe.image} alt={recipe.name} />

        <Box
          mt={-70}
          p={5}
          pb={4}
          pt={6}
          borderRadius={0}
          width={'80%'}
          backgroundColor={'white'}
          display={'flex'}
          justifyContent={'space-around'}
          flexDirection={'column'}
          minHeight={'240px'}
          alignContent={'space-around'}
          alignItems={'center'}
          boxShadow={'spread'}
          position={'relative'}
        >
          <Text fontSize="1.5rem" fontWeight={700} textAlign="center">
            {recipe.name}
          </Text>
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
                <Text fontSize={3} fontWeight={700}>
                  {totalRatingData ? totalRatingData + ' / 5.0' : '0 / 5'}
                </Text>
              </div>
            </Box>
            <Box mt={3} display={'flex'} justifyContent={'space-between'}>
              <span>time</span>
              <span>{recipe.time}min</span>
            </Box>
            <Box mt={3} display={'flex'} justifyContent={'space-between'}>
              <span>total cost</span>
              <span>{recipe.totalCost}$</span>
            </Box>
            <Box mt={3} display={'flex'} justifyContent={'space-between'}>
              <span>difficulty</span>
              <span>{recipe.difficulty.toLowerCase()}</span>
            </Box>
            <Text mt={3}>ingredients</Text>
            <Box display={'flex'} justifyContent={'space-between'}>
              <IngredientsList>
                {recipe.ingredient.map((it, index) => (
                  <li key={it._id ?? ''}>
                    <Box display={'flex'} justifyContent={'space-between'}>
                      <span>{it.name}</span>
                      <span>{it.amount}</span>
                    </Box>
                  </li>
                ))}
              </IngredientsList>
            </Box>
          </Box>
          <TagsHolder
            mt={3}
            display={'flex'}
            flexWrap={'wrap'}
            justifyContent={'center'}
            p={4}
          >
            {recipe.tag.map((it) => (
              <Tag bg={'primary.400'} key={it?._id ?? ''}>
                #{it.name}
              </Tag>
            ))}
          </TagsHolder>
        </Box>
        <Box mt={7}>
          {subscribed ? (
            <IconButton
              ml={5}
              variant={'secondary'}
              onClick={handleUnsubscribe}
            >
              <FontAwesomeIcon size={'lg'} icon={faEyeSlash} />
            </IconButton>
          ) : (
            <IconButton ml={5} variant={'secondary'} onClick={handleSubscribe}>
              <FontAwesomeIcon size={'lg'} icon={faEye} />
            </IconButton>
          )}
          <IconButton ml={5} variant={'danger'} onClick={handleSubscribe}>
            <FontAwesomeIcon size={'lg'} icon={faHeart} />
          </IconButton>
          {user && recipe.user.name === user.name && (
            <EditButton ml={5} onClick={() => setIsRecipeDialogOpen(true)}>
              <FontAwesomeIcon size={'lg'} icon={faEdit} />
            </EditButton>
          )}
        </Box>

        <Box p={9}>
          <Box display={'flex'} justifyContent={'center'}>
            <Text
              variant="cursive"
              fontWeight={700}
              fontSize={48}
              mb={7}
              color={'grey.800'}
            >
              How to do it?
            </Text>
          </Box>
          <Text lineHeight={'21px'}>
            {(recipe as Model.Recipe).description ?? ''}
          </Text>
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
              <span>{recipe.user.name}</span>
              <LinkButton
                height={'33px'}
                width={'63px'}
                to={`${PROFILE_VIEW}/${recipe.user.name}`}
                variant={'warn'}
              >
                More
              </LinkButton>
            </Box>
            <AuthorImage
              src={recipe?.user?.avatar ? recipe?.user?.avatar : defaultAvatar}
            />
          </Box>
        </Box>

        {!!alreadyVotedData && alreadyVotedData !== -1 && (
          <Box>
            <span>
              Your rating of this recipe is{' '}
              <Text fontWeight={700}>
                {recipe?.comment?.[alreadyVotedData]?.rating as number} / 5.0
              </Text>
            </span>
          </Box>
        )}
        {!!alreadyVotedData && alreadyVotedData === -1 && (
          <Box display="flex" alignItems="center">
            <Text fontSize="1.5rem" fontWeight={700} textAlign="center">
              Leave your feedback{' '}
            </Text>
            <Button ml={4} onClick={() => setIsCommentDialogOpen(true)}>
              <Text fontSize="1.3rem">here!</Text>
            </Button>
          </Box>
        )}

        <Box
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'center'}
          flexWrap={'wrap'}
          mt={4}
        >
          {!!recipe &&
            !!recipe.comment &&
            recipe.comment.length > 0 &&
            recipe.comment.map((it) => (
              <Comment
                key={it?._id ?? ''}
                rating={it?.rating ?? 0}
                username={it!.user.name}
                timestamp={it!.timestamp}
              >
                {it?.description}
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
              recipe={data.Recipe[0] as Model.Recipe}
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
              userID={user?._id ?? ''}
              recipe={data.Recipe[0] as Model.Recipe}
              setIsOpen={setIsCommentDialogOpen}
            />
          </FormModal>
        )}
      </Box>
    </LoadingOverlay>
  );
};

export default RecipeView;
