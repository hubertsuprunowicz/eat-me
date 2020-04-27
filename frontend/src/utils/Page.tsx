import React from 'react';
import styled from 'styled-components';

export const StyledPage = styled.main`
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

const Page: React.FC = ({ children }) => {
  return <StyledPage>{children}</StyledPage>;
};

export default Page;
