import styled from 'styled-components';
import { Text } from 'style';
import { themeGet } from '@styled-system/theme-get';

export const ProfileImage = styled.img`
  object-fit: contain;
  width: 100%;
`;

export const BackgroundImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 55%;
  max-height: 400px;
  min-height: 350px;
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

export const TagText = styled(Text)`
  opacity: 0.5;
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
