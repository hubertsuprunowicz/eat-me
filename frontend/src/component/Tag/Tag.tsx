import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TagItem } from './tag.style';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type Props = {
  name?: string;
  icon?: IconDefinition;
  type?: string;
  color: string;
};

const Tag: React.FC<Props> = ({ children, name, icon, type, color }) => {
  return (
    <TagItem color={color}>
      {icon && <FontAwesomeIcon icon={icon} />}
      {children}
    </TagItem>
  );
};

export default Tag;
