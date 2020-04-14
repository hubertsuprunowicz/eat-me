import styled from 'styled-components';
import { Button } from '../../style';
import { HeightProps, height } from 'styled-system';
import { themeGet } from '@styled-system/theme-get';

const CARD_PADDING = '10px';
const CARD_MARGIN = '25px';

type CursorProps = {
  cursor?: string;
};

type Props = HeightProps & CursorProps;

export const Card = styled.div<Props>`
  ${height}
  position: absolute;
  box-shadow: ${themeGet('shadows.neumorphism')};
  cursor: ${props => props.cursor};
  max-width: 400px;
  width: calc(100% - ${CARD_PADDING} * 2 - ${CARD_MARGIN} * 2);
  border-radius: ${themeGet('radii.1')}px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  padding: ${CARD_PADDING};
  margin: ${CARD_MARGIN};

  &.swipe-left {
    animation: swipeLeft 0.4s ease-out forwards;
  }

  &.swipe-right {
    animation: swipeRight 0.4s ease-out forwards;
  }

  @keyframes swipeRight {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(1000px);
    }
  }

  @keyframes swipeLeft {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-1000px);
    }
  }

  & button {
    padding: 0;
  }

  > img {
    width: 100%;
    min-height: 60%;
    height: 60%;
    border-radius: ${themeGet('radii.0')}px;
    object-fit: cover;
  }
`;

export const CardDetails = styled.div`
  margin: 0;
  padding: 0;
  text-align: center;
  height: 100%;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  > :first-child {
    position: absolute;
    top: -15px;
  }
`;

export const RoundButton = styled(Button)`
  border-radius: 50%;
  background-color: white;
  margin-left: 10px;
  margin-right: 10px;

  -webkit-box-shadow: 3px 4px 25px -4px rgba(0, 0, 0, 0.36);
  -moz-box-shadow: 3px 4px 25px -4px rgba(0, 0, 0, 0.36);
  box-shadow: 3px 4px 25px -4px rgba(0, 0, 0, 0.36);

  :active {
    transform: scale(0.85);
  }

  > :first-child {
    color: ${props => props.color};
  }
`;

export const TagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin-top: -15px;
`;
