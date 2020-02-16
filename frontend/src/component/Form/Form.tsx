import React from 'react';
import { FormDefault } from './form.style';

type Props = {
  onSubmit?: (e: React.FormEvent) => void;
};

const Form: React.FC<Props> = ({ children, onSubmit }) => {
  return <FormDefault onSubmit={onSubmit}>{children}</FormDefault>;
};

export default Form;
