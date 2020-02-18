import React from 'react';
import { Box, IconButton, Tag } from '../../style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faStar,
  faTimes,
  faUser,
  faClock,
  faFlag,
  faMoneyBill,
} from '@fortawesome/free-solid-svg-icons';
import { Card, CardDetails, TagWrapper } from './recipe.card.style';
import { Recipe } from 'view/RecipesView/RecipesView';

export type Props = ItemCardProps;

export interface ItemCardProps {
  id: string;
  recipe: Recipe;
  color?: string;
}

const RecipeCard: React.FC<Props> = ({ id, recipe }) => {
  const { name, image, difficulty, time, tag, ingredient, user } = recipe;
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
          <IconButton
            boxShadow="neumorphism"
            color="warn.600"
            width="28px"
            height="28px"
            borderRadius="50%"
            ml={4}
            mr={4}
          >
            <FontAwesomeIcon size={'xs'} icon={faStar} />
          </IconButton>
          <IconButton
            boxShadow="neumorphism"
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
            width="38px"
            height="38px"
            color="danger.900"
            borderRadius="50%"
            ml={4}
            mr={4}
          >
            <FontAwesomeIcon size={'lg'} icon={faTimes} />
          </IconButton>
          <IconButton
            boxShadow="neumorphism"
            width="28px"
            height="28px"
            color="grey.800"
            borderRadius="50%"
            ml={4}
            mr={4}
          >
            <FontAwesomeIcon size={'xs'} icon={faUser} />
          </IconButton>
        </Box>
      </CardDetails>
    </Card>
  );
};

export default RecipeCard;
