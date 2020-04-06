import styled from 'styled-components';
import { Button } from 'style';
import Rating from 'react-rating';
import { themeGet } from '@styled-system/theme-get';
import { WidthProps, MarginProps, margin } from 'styled-system';

type Props = WidthProps & MarginProps;
export const Input = styled.input<Props>`
  ${margin}
  width: ${props => props.width}px !important;
`;

export const ProfileImage = styled.img`
  object-fit: contain;
  width: 100%;
`;

export const BackgroundImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 60%;
  max-height: 400px;
  min-height: 350px;
`;

export const EditButton = styled(Button)`
  align-self: flex-end;
`;

export const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

export const Textarea = styled.textarea`
  min-height: 130px !important;
`;

export const IngredientsList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 25px;
  li {
    padding: 2px;
    display: list-item;
    justify-content: space-between;
  }
`;

export const AuthorImage = styled.img`
  object-fit: cover;
  width: 100px;
  height: 150px;
`;

export const StyledRating = styled(Rating)`
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 5px;

  .empty {
    color: ${themeGet('colors.grey.200')};
  }

  span {
    margin: 0 1px;
    font-size: 13px;
    color: ${themeGet('colors.primary.200')};
  }
`;
