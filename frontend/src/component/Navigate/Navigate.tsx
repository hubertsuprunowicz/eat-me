import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUtensils,
  faCommentAlt,
  faEye,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Footer, NavButton, NavItem, NavList } from './navigate.style';
import { Link } from 'react-router-dom';
import {
  PROFILE_VIEW,
  RECIPES_VIEW,
  WATCHES_VIEW,
  MESSAGE_VIEW,
} from 'view/Route/constants.route';

const Navigate: React.FC = ({ children }) => {
  return (
    <>
      {children}
      <Footer>
        <NavList>
          <NavItem>
            <Link to={RECIPES_VIEW}>
              <NavButton color={'grey.800'}>
                <FontAwesomeIcon size={'sm'} icon={faUtensils} />
                <span>RECIPES</span>
              </NavButton>
            </Link>
          </NavItem>
          <hr />
          <NavItem>
            <Link to={WATCHES_VIEW}>
              <NavButton color={'grey.800'}>
                <FontAwesomeIcon size={'sm'} icon={faEye} />
                <span>WATCHES</span>
              </NavButton>
            </Link>
          </NavItem>
          <hr />
          <NavItem>
            <Link to={MESSAGE_VIEW}>
              <NavButton color={'grey.800'}>
                <FontAwesomeIcon size={'sm'} icon={faCommentAlt} />
                <span>MESSAGE</span>
              </NavButton>
            </Link>
          </NavItem>
          <hr />
          <NavItem>
            <Link to={PROFILE_VIEW}>
              <NavButton color={'grey.800'}>
                <FontAwesomeIcon size={'sm'} icon={faUser} />
                <span>PROFILE</span>
              </NavButton>
            </Link>
          </NavItem>
        </NavList>
      </Footer>
    </>
  );
};

export default Navigate;
