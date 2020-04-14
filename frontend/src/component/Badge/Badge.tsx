import React from 'react';
import * as Styles from '../Badge/styles';
import { Text } from 'style';

type Props = {
  color?: string;
  backgroundColor?: string;
};

const Badge: React.FC<Props> = ({ color, backgroundColor, children }) => {
  return (
    <Styles.Badge color={color} backgroundColor={backgroundColor}>
      <Text>{children}</Text>
    </Styles.Badge>
  );
};

export default Badge;
