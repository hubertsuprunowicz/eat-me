import styled from 'styled-components';
import { Button } from '../../style';
import { themeGet } from '@styled-system/theme-get';
import { Link } from 'react-router-dom';

export const NavList = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  padding: 0;
  margin: 0;
  height: 100%;
`;

export const NavItem = styled.li`
  width: 25%;
`;

export const NavButton = styled(Button)`
  display: inline-block;
  width: 100%;
  height: 100%;
  border-radius: 0;
  font-size: 12px;
  letter-spacing: 0.5px;

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
  bottom: 0;
  left: 0;
  background-color: white;
  height: 80px;
  width: 100%;

  & hr {
    margin: 30px 0;
    border: none;
    border-right: 1px solid lightgray;
  }
`;
