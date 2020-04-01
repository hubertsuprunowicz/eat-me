import React, { useState, useEffect } from 'react';
import {
  BackgroundImage,
  TagWrapper,
  EditButton,
  IngredientsList,
  AuthorImage,
} from './recipe.view.style';
import { Box, Button, LinkButton } from 'style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faHeart } from '@fortawesome/free-solid-svg-icons';
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

  const [{ name, image, description, time, tag, ingredient, comment }] =
    data.Recipe || {};

  function alreadyVoted() {
    return comment.findIndex((it: any) => it.user.name === user!.name);
  }

  function totalRating() {
    return (
      comment.reduce(
        (acc: number, curr: { rating: any }) => acc + curr.rating,
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
      {/** KARTA */}
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </span>
        {user && 'user' === user.name && (
          <EditButton
            mt={2}
            mr={40}
            borderRadius={'5px'}
            boxShadow={'neumorphism'}
            onClick={() => setIsRecipeDialogOpen(true)}
          >
            <FontAwesomeIcon size={'lg'} icon={faEdit} />
          </EditButton>
        )}
        <Box display={'flex'} flexDirection={'column'} width={'80%'}>
          <Box mt={6} display={'flex'} justifyContent={'space-between'}>
            <span>rating</span>
            <span>{totalRating()} / 5</span>
          </Box>
          <Box mt={3} display={'flex'} justifyContent={'space-between'}>
            <span>time</span>
            <span>35min</span>
          </Box>
          <Box mt={3} display={'flex'} justifyContent={'space-between'}>
            <span>total cost</span>
            <span>15$</span>
          </Box>
          <Box mt={3} display={'flex'} justifyContent={'space-between'}>
            <span>difficulty</span>
            <span>easy</span>
          </Box>
          <span style={{ marginTop: '4px' }}>ingredients</span>
          <Box display={'flex'} justifyContent={'space-between'}>
            <IngredientsList>
              <li>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <span>liters of milk</span>
                  <span>2l</span>
                </Box>
              </li>
              <li>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <span>spoons of sugar with real vanilla</span>
                  <span>3.5</span>
                </Box>
              </li>
              <li>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <span>vanilla sticks</span>
                  <span>2</span>
                </Box>
              </li>
              <li>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <span>egg yolks</span>
                  <span>2</span>
                </Box>
              </li>
              <li>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <span>tablespoons of potato flour</span>
                  <span>3</span>
                </Box>
              </li>
            </IngredientsList>
          </Box>
        </Box>
        <Box
          display={'flex'}
          flexWrap={'wrap'}
          backgroundColor={'grey.100'}
          justifyContent={'center'}
          // boxShadow={'insetNeo'}
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
          <span style={{ padding: '5px', fontWeight: 600 }}>
            #KuchniaPolska
          </span>
          <span style={{ padding: '5px', fontWeight: 600 }}>#Azjatycka</span>
          <span style={{ padding: '5px', fontWeight: 600 }}>#Azjatycka</span>
          <span style={{ padding: '5px', fontWeight: 600 }}>#Japonska</span>
          <span style={{ padding: '5px', fontWeight: 600 }}>
            #KuchniaPolska
          </span>
        </Box>
      </Box>
      {/** KONIEC - KARTA */}
      <Box p={8}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <span
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            How to do it?
          </span>
          {subscribed ? (
            <Button
              color={'danger.500'}
              borderRadius={'5px'}
              boxShadow={'neumorphism'}
              onClick={handleUnsubscribe}
            >
              Unubscribe {data.Recipe[0].user.name}{' '}
              <FontAwesomeIcon size={'sm'} icon={faHeart} />
            </Button>
          ) : (
            <Button
              color={'danger.500'}
              borderRadius={'5px'}
              boxShadow={'neumorphism'}
              onClick={handleSubscribe}
            >
              Subscribe {data.Recipe[0].user.name}{' '}
              <FontAwesomeIcon size={'sm'} icon={faHeart} />
            </Button>
          )}
        </Box>
        <p style={{ lineHeight: '21px' }}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
          <br /> <br />
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam
          <br /> <br />
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
          ea voluptate velit esse quam nihil molestiae consequatur, vel illum
          qui dolorem eum fugiat quo voluptas nulla pariatur?
        </p>
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
        flexDirection={'row-reverse'}
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
