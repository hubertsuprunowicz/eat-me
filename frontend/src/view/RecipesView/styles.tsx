import styled from 'styled-components';
import { WidthProps, MarginProps, margin } from 'styled-system';
import { themeGet } from '@styled-system/theme-get';

type Props = WidthProps & MarginProps;
export const Input = styled.input<Props>`
  ${margin}
  width: ${(props) => props.width}px !important;
`;

export const FileUploadLabel = styled.label`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 40px;
  border-radius: ${themeGet('radii.0')}px;

  font-size: 14px;
  color: ${themeGet('colors.grey.800')};
  box-shadow: ${themeGet('shadows.clearInset')};

  transition: 200ms;

  svg {
    margin-right: ${themeGet('space.4')}px;
  }

  &:hover {
    cursor: pointer;
    background-color: ${themeGet('colors.grey.200')};
  }

  &:disabled {
    opacity: 0.5;
  }
`;

export const FileUploadButton = styled.input`
  display: none;

  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;
