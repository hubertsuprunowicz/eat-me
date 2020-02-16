import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const FormDefault = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

  & label {
    font-weight: 500 !important;
    padding: 5px 0;
    margin-top: 10px;
  }

  & input {
    background-color: ${themeGet('colors.grey.100')};
    box-shadow: ${themeGet('shadows.insetNeo')};
    width: 250px;
    height: 35px;
    border: 1px solid darkgray;
    border: white;
    border-radius: ${themeGet('radii.0')}px;
    padding: 5px 8px;
    margin-bottom: 5px;
  }

  & textarea {
    background-color: ${themeGet('colors.grey.100')};
    box-shadow: ${themeGet('shadows.insetNeo')};
    width: 250px;
    height: 35px;
    border: 1px solid darkgray;
    border: white;
    border-radius: ${themeGet('radii.0')}px;
    padding: 5px 8px;
    margin-bottom: 5px;
  }
`;
