import React from 'react';
import { FormDefault } from './form.style';

type Props = {
  onSubmit?: (e: React.FormEvent) => void;
  onKeyPress?: (e: any) => void;
};

const Form: React.FC<Props> = ({ children, onSubmit, onKeyPress }) => {
  return (
    <FormDefault onSubmit={onSubmit} onKeyPress={onKeyPress}>
      {children}
    </FormDefault>
  );
};

export default Form;
