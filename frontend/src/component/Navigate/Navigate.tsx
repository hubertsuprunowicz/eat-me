import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUtensils,
  faCommentAlt,
  faEye,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Footer, StyledNavLink, NavList } from './navigate.style';
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
          <StyledNavLink to={RECIPES_VIEW} activeClassName="is-active">
            <FontAwesomeIcon size={'lg'} icon={faUtensils} />
          </StyledNavLink>

          <StyledNavLink to={WATCHES_VIEW} activeClassName="is-active">
            <FontAwesomeIcon size={'lg'} icon={faEye} />
          </StyledNavLink>

          <StyledNavLink to={MESSAGE_VIEW} activeClassName="is-active">
            <FontAwesomeIcon size={'lg'} icon={faCommentAlt} />
          </StyledNavLink>

          <StyledNavLink to={PROFILE_VIEW} activeClassName="is-active">
            <FontAwesomeIcon size={'lg'} icon={faUser} />
          </StyledNavLink>
        </NavList>
      </Footer>
    </>
  );
};

export default Navigate;
