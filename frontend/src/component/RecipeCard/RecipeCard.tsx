import React from 'react';
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
  faSign,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Card, CardDetails, TagWrapper } from './recipe.card.style';
import { Recipe } from 'view/RecipesView/RecipesView';
import { Redirect, Link, useParams } from 'react-router-dom';
import { PROFILE_VIEW, RECIPE_VIEW } from 'view/Route/constants.route';

export type Props = ItemCardProps;

export type ItemCardProps = {
  id: string;
  recipe: Recipe;
  color?: string;
  index: number;
  setCurrentIndex: (index: number) => void;
};

const RecipeCard: React.FC<Props> = ({
  id,
  recipe,
  index,
  setCurrentIndex,
}) => {
  const { name, image, difficulty, time, tag, ingredient, user } = recipe;

  const loveItHandle = () => {
    console.log('LOVE IT');
    setCurrentIndex(index + 1);
  };

  const quitItHandle = () => {
    console.log('QUIT IT');
    setCurrentIndex(index + 1);
  };

  return (
    <Card key={id} cursor="pointer" height={'70vh'}>
      <img src={image} alt={name} />
      <CardDetails>
        <Tag bg={'secondary.600'} pr={4} pl={4}>
          {user.name}
        </Tag>

        <h3>{name}</h3>
        <TagWrapper>
          <Tag bg={'primary.400'}>
            <FontAwesomeIcon icon={faStar} />
            3.50
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
            $20.50
          </Tag>
          {tag.map((it: any) => (
            <Tag key={Math.random + it.name} bg={'primary.400'}>
              #{it.name}
            </Tag>
          ))}
        </TagWrapper>
        <Box>
          <LinkIconButton
            to={`${RECIPE_VIEW}/${id}`}
            boxShadow="neumorphism"
            color="black"
            width="38px"
            height="38px"
            borderRadius="50%"
            ml={4}
            mr={4}
          >
            <FontAwesomeIcon size={'sm'} icon={faSignInAlt} />
          </LinkIconButton>
          <IconButton
            boxShadow="neumorphism"
            onClick={loveItHandle}
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
            boxShadow="neumorphism"
            onClick={quitItHandle}
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
            boxShadow="neumorphism"
            width="38px"
            height="38px"
            color="grey.800"
            borderRadius="50%"
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
