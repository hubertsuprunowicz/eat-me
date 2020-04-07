import React from 'react';
import { FormDefault } from './form.style';

type Props = {
  onSubmit?: (e: React.FormEvent) => void;
  onKeyPress?: (e: any) => void;
  className?: string;
};

const Form: React.FC<Props> = ({
  children,
  onSubmit,
  onKeyPress,
  className,
}) => {
  return (
    <FormDefault
      className={className}
      onSubmit={onSubmit}
      onKeyPress={onKeyPress}
    >
      {children}
    </FormDefault>
  );
};

export default Form;
