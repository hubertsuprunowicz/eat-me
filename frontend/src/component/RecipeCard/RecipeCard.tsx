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
import { Card, CardDetails, TagWrapper } from './recipe.card.style';
import { Recipe } from 'view/RecipesView/RecipesView';
import { PROFILE_VIEW, RECIPE_VIEW } from 'view/Route/constants.route';

export type Props = ItemCardProps;

export type ItemCardProps = {
  id: string;
  recipe: Recipe;
  color?: string;
  index: number;
  onSwipe: (direction: 'left' | 'right', recipe: any) => void;
};

const RecipeCard: React.FC<Props> = ({ id, recipe, index, onSwipe }) => {
  const [swipe, setSwipe] = useState<undefined | 'left' | 'right'>();
  const {
    name,
    image,
    difficulty,
    time,
    tag,
    user,
    comment,
    totalCost,
  } = recipe;

  const loveItHandle = () => {
    setTimeout(() => {
      onSwipe('right', recipe);
    }, 400);
    setSwipe('right');
  };

  const quitItHandle = () => {
    setTimeout(() => {
      onSwipe('left', recipe);
    }, 400);

    setSwipe('left');
  };

  function totalRating() {
    return (
      comment.reduce(
        (acc: number, curr: { rating: any }) => acc + curr.rating,
        0,
      ) / comment.length
    ).toFixed(1);
  }

  return (
    <Card
      key={id}
      cursor="pointer"
      height={'70vh'}
      className={swipe ? 'swipe-' + swipe : undefined}
    >
      <img src={image || '/img/food-404.jpg'} alt={name} />
      <CardDetails>
        <Tag border={'none'} bg={'secondary.600'} pr={4} pl={4}>
          {user.name}
        </Tag>

        <h3>{name}</h3>
        <TagWrapper>
          <Tag bg={'primary.400'}>
            <FontAwesomeIcon icon={faStar} />
            {totalRating()}
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
          {tag.slice(0, 3).map((it: any) => (
            <Tag key={Math.random + it.name} bg={'primary.400'}>
              #{it.name}
            </Tag>
          ))}
        </TagWrapper>
        <Box>
          <LinkIconButton
            to={`${RECIPE_VIEW}/${id}`}
            color="black"
            width="38px"
            height="38px"
            ml={4}
            mr={4}
          >
            <FontAwesomeIcon size={'sm'} icon={faSignInAlt} />
          </LinkIconButton>
          <IconButton
            id="swipeRight"
            boxShadow="neumorphism"
            onClick={loveItHandle}
            type="button"
            width="38px"
            height="38px"
            color="secondary.600"
            borderRadius="50%"
            ml={4}
            mr={4}
          >
            <FontAwesomeIcon size={'lg'} icon={faHeart} />
          </IconButton>
          <IconButton
            id="swipeLeft"
            boxShadow="neumorphism"
            onClick={quitItHandle}
            type="button"
            width="38px"
            height="38px"
            color="danger.900"
            borderRadius="50%"
            ml={4}
            mr={4}
          >
            <FontAwesomeIcon size={'lg'} icon={faTimes} />
          </IconButton>
          <LinkIconButton
            to={`${PROFILE_VIEW}/${user.name}`}
            width="38px"
            height="38px"
            color="grey.800"
            ml={4}
            mr={4}
          >
            <FontAwesomeIcon size={'sm'} icon={faUser} />
          </LinkIconButton>
        </Box>
      </CardDetails>
    </Card>
  );
};

export default RecipeCard;
