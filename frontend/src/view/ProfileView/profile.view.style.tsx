import styled from 'styled-components';
import { Button } from 'style';

export const ProfileImage = styled.img`
  object-fit: contain;
  width: 100%;
`;

export const BackgroundImage = styled.img<{ src: string }>`
  object-fit: cover;
  width: 100%;
  height: 60%;
  max-height: 400px;
  min-height: 350px;
`;

export const EditButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
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
