import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUtensils,
  faCommentAlt,
  faEye,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Footer, NavButton, NavList } from './navigate.style';
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
          <Link to={RECIPES_VIEW}>
            <NavButton color={'grey.800'}>
              <FontAwesomeIcon size={'lg'} icon={faUtensils} />
            </NavButton>
          </Link>

          <Link to={WATCHES_VIEW}>
            <NavButton color={'grey.800'}>
              <FontAwesomeIcon size={'lg'} icon={faEye} />
            </NavButton>
          </Link>

          <Link to={MESSAGE_VIEW}>
            <NavButton color={'grey.800'}>
              <FontAwesomeIcon size={'lg'} icon={faCommentAlt} />
            </NavButton>
          </Link>

          <Link to={PROFILE_VIEW}>
            <NavButton color={'grey.800'}>
              <FontAwesomeIcon size={'lg'} icon={faUser} />
            </NavButton>
          </Link>
        </NavList>
      </Footer>
    </>
  );
};

export default Navigate;
