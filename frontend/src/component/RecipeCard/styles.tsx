import styled from 'styled-components';
import { Button, Box } from '../../style';
import { height } from 'styled-system';
import { themeGet } from '@styled-system/theme-get';

type CursorProps = {
  cursor?: string;
};

export const Card = styled(Box)<CursorProps>`
  ${height}
  position: absolute;
  box-shadow: ${themeGet('shadows.neumorphism')};
  cursor: ${(props) => props.cursor};
  max-width: 400px;
  width: 85%;
  border-radius: ${themeGet('radii.1')}px;
  background-color: white;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-content: space-between;
  padding: 10px;
  margin-left: 7%;

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
      transform: translateX(1200px);
    }
  }

  @keyframes swipeLeft {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-1200px);
    }
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
    color: ${(props) => props.color};
  }
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: ${themeGet('space.7')}px;
  right: ${themeGet('space.7')}px;
  letter-spacing: 1px;
  color: white;
  background-color: ${themeGet('colors.danger.700')};

  border: none;
  width: 66px;
  height: 32px;
  cursor: pointer;
  border-radius: ${themeGet('radii.0')}px;
  font-weight: 700;
  letter-spacing: 1px;
  padding: ${themeGet('space.4')}px;
  transition: 250ms;

  :hover {
    background-color: ${themeGet('colors.danger.800')};
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
