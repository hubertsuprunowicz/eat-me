import React from 'react';
import Loader from 'react-loader-spinner';
import { Wrapper } from './styles';

type Props = {
  isLoading?: boolean;
  width?: string;
  height?: string;
};

const LoadingOverlay: React.FC<Props> = ({
  isLoading,
  children,
  width = '100%',
  height = '100%',
}) => {
  return (
    <Wrapper width={width} height={height}>
      <div className={'loader-holder'}>
        <Loader
          visible={isLoading}
          type="Grid"
          color="#55efc4"
          height={60}
          width={60}
        />
      </div>
      {children}
    </Wrapper>
  );
};

export default LoadingOverlay;
