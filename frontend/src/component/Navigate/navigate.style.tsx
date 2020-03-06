import styled from 'styled-components';
import { Button } from '../../style';
import { themeGet } from '@styled-system/theme-get';
import { Link } from 'react-router-dom';

export const NavList = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  list-style-type: none;
  padding: 10px;
  margin: 0;
  height: 100%;
  width: 60%;
  background-color: white;
  border-radius: 10px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  box-shadow: 9px 9px 16px rgb(163, 177, 198, 0.6),
    -9px -9px 16px rgba(255, 255, 255, 0.5);
`;

export const NavButton = styled(Button)`
  display: inline-block;
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 10px;
  font-size: 12px;
  letter-spacing: 0.5px;
  margin: 0 10px;
  box-shadow: ${themeGet('shadows.neumorphism')};

  :focus {
    color: #55efc4;
    box-shadow: ${themeGet('shadows.neumorphism')};
  }

  :active {
    box-shadow: ${themeGet('shadows.neumorphism')};
  }

  :hover {
    color: #55efc4;
    box-shadow: ${themeGet('shadows.neumorphism')};
  }

  & span {
    display: block;
    padding-top: 5px;
  }
`;

export const Footer = styled.div`
  position: fixed;
  background-color: transparent;

  max-height: 70px;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: center;

  & hr {
    margin: 30px 0;
    border: none;
    border-right: 1px solid lightgray;
  }
`;
