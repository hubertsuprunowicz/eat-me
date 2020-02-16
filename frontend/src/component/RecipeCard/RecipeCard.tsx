import React, { CSSProperties } from 'react';
import {
  FaSymbol,
  FlipProp,
  PullProp,
  RotateProp,
  SizeProp,
  Transform,
} from '@fortawesome/fontawesome-svg-core';
import User from '../../model/user';
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

export type Props = ItemCardProps;

export interface ItemCardProps {
  id: string;
  author?: User;
  title?: string;
  color?: string;
  listItem?: boolean;
  flip?: FlipProp;
  size?: SizeProp;
  pull?: PullProp;
  rotation?: RotateProp;
  transform?: string | Transform;
  symbol?: FaSymbol;
  style?: CSSProperties;
}

const RecipeCard: React.FC<Props> = ({ id }) => {
  return (
    <Card key={id} cursor="pointer" height={'70vh'}>
      <img
        src="https://www.dietaeliminacyjna.pl/wp-content/uploads/2017/02/tofucznica.jpg"
        alt="food"
      />
      <CardDetails>
        <Tag bg={'secondary.600'} pr={4} pl={4}>
          Username{id}
        </Tag>

        <h3>Tatar wołowy z majonezem truflowym, oliwą i i pikl</h3>
        <TagWrapper>
          <Tag bg={'primary.400'}>
            <FontAwesomeIcon icon={faStar} />
            3.50
          </Tag>
          <Tag bg={'primary.400'}>
            <FontAwesomeIcon icon={faClock} />
            120min
          </Tag>
          <Tag bg={'primary.400'}>
            <FontAwesomeIcon icon={faFlag} />
            Medium
          </Tag>
          <Tag bg={'primary.400'}>
            <FontAwesomeIcon icon={faMoneyBill} />
            $20.50
          </Tag>
          <Tag bg={'primary.400'}>Kuchnia Staropolska</Tag>
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
