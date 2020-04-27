import React, { useState } from 'react';
import { Box, IconButton, Tag, LinkIconButton } from '../../style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faStar,
  faTimes,
  faUser,
  faClock,
  faFlag,
  faMoneyBill,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Card, CardDetails, TagWrapper, DeleteButton } from './styles';
import { PROFILE_VIEW, RECIPE_VIEW } from 'utils/constants.route';
import DeleteModal from 'component/DeleteModal/DeleteModal';
import { toast } from 'react-toastify';
import { useAuthState } from 'utils/auth';
import {
  Recipe,
  useDeleteRecipeMutation,
  Comment,
} from 'model/generated/graphql';

export type Props = ItemCardProps;

export type ItemCardProps = {
  id: string;
  recipe: Recipe;
  color?: string;
  index: number;
  onSwipe: (direction: 'left' | 'right', recipe: Recipe, index: number) => void;
  onRefetch?: any;
};

const RecipeCard: React.FC<Props> = ({
  id,
  recipe,
  onSwipe,
  onRefetch,
  index,
}) => {
  const { user } = useAuthState();
  const [isModalOpen, setModalIsOpen] = useState<boolean>(false);
  const [swipe, setSwipe] = useState<undefined | 'left' | 'right'>();
  const {
    _id,
    name,
    image,
    difficulty,
    time,
    tag,
    user: recipeAuthor,
    comment,
    totalCost,
  } = recipe;

  const loveItHandle = () => {
    setTimeout(() => {
      onSwipe('right', recipe, index);
    }, 300);
    setSwipe('right');
  };

  const quitItHandle = () => {
    setTimeout(() => {
      onSwipe('left', recipe, index);
    }, 300);
    setSwipe('left');
  };

  const totalRating = (comments: Comment[]) => {
    if (comments.length < 1) return 0;

    const rating =
      comments.reduce((acc, curr) => acc + curr.rating, 0) / comments.length;

    return parseFloat(rating.toFixed(1));
  };

  const [deleteRecipe] = useDeleteRecipeMutation({
    onError: (_) => {
      toast.error('Something has failed', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
    onCompleted: (_) => {
      toast.success('Recipe successfully deleted', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
  });

  const handleDelete = () => {
    if (_id)
      deleteRecipe({
        variables: {
          id: _id,
        },
      });
    setModalIsOpen(false);
    onRefetch();
  };

  return (
    <Card
      key={id}
      cursor="pointer"
      height={'70vh'}
      mt={'10%'}
      className={swipe ? 'swipe-' + swipe : undefined}
    >
      <img src={image || '/img/food-404.jpg'} alt={name} />
      {user && user.name === recipeAuthor?.name && (
        <DeleteButton
          type={'button'}
          p={4}
          onClick={() => setModalIsOpen(true)}
        >
          Delete
        </DeleteButton>
      )}
      <CardDetails>
        <Tag m={0} border={'none'} bg={'secondary.600'}>
          {recipeAuthor?.name}
        </Tag>
        <h3>{name}</h3>
        <TagWrapper>
          <Tag bg={'primary.400'}>
            <FontAwesomeIcon icon={faStar} />
            {comment ? totalRating(comment as Comment[]) : 0}
          </Tag>
          <Tag bg={'primary.400'}>
            <FontAwesomeIcon icon={faClock} />
            {time}min
          </Tag>
          <Tag bg={'primary.400'}>
            <FontAwesomeIcon icon={faFlag} />
            {difficulty}
          </Tag>
          <Tag bg={'primary.400'}>
            <FontAwesomeIcon icon={faMoneyBill} />
            {totalCost}$
          </Tag>
          {tag.slice(0, 3).map((it) => (
            <Tag key={Math.random + it.name} bg={'primary.400'}>
              #{it.name}
            </Tag>
          ))}
        </TagWrapper>
        <Box display="flex">
          <LinkIconButton
            to={`${RECIPE_VIEW}/${id}`}
            type="button"
            ml={4}
            mr={4}
          >
            <FontAwesomeIcon size={'1x'} icon={faSignInAlt} />
          </LinkIconButton>
          <IconButton
            id="swipeRight"
            color="secondary.700"
            onClick={loveItHandle}
            width="42px"
            height="42px"
            type="button"
            borderRadius="50%"
            ml={4}
            mr={4}
          >
            <FontAwesomeIcon size={'lg'} icon={faHeart} />
          </IconButton>
          <IconButton
            id="swipeLeft"
            onClick={quitItHandle}
            type="button"
            color="danger.900"
            width="42px"
            height="42px"
            borderRadius="50%"
            ml={4}
            mr={4}
          >
            <FontAwesomeIcon size={'lg'} icon={faTimes} />
          </IconButton>
          <LinkIconButton
            to={`${PROFILE_VIEW}/${recipeAuthor?.name}`}
            type="button"
            ml={4}
            mr={4}
          >
            <FontAwesomeIcon size={'1x'} icon={faUser} />
          </LinkIconButton>
        </Box>
      </CardDetails>
      <DeleteModal
        title="Recipe Delete"
        itemName={name}
        isOpen={isModalOpen}
        closeModal={() => setModalIsOpen(false)}
        onDelete={handleDelete}
      />
    </Card>
  );
};

export default RecipeCard;
