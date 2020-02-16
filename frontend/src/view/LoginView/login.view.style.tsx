import styled from 'styled-components';
import { Button } from '../../style';
import { themeGet } from '@styled-system/theme-get';

export const Avatar = styled.img`
  border-radius: 50%;
  width: 50%;
  object-fit: contain;
`;

export const AuthSwitch = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  > :first-child {
    border-radius: 10px 0 0 10px;
  }

  > :last-child {
    border-radius: 0 10px 10px 0;
  }
`;

type Props = {
  active: boolean;
};
export const AuthButton = styled(Button)<Props>`
  width: 40%;
  height: 50px;
  margin-bottom: 20px;
  color: white;
  font-weight: bold;
  letter-spacing: 2px;
  border: 1px solid white;

  ${({ active }) => {
    if (active)
      return {
        backgroundColor: '#79f2d0',
        boxShadow:
          'inset 3px 3px 3px rgba(0,0,0,0.2), inset -3px -4px 4px rgba(255,255,255,0.4)',
      };

    return {
      backgroundColor: 'transparent',
      color: 'black',
      boxShadow:
        '9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.5)',
    };
  }}
`;
