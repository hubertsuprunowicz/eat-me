import React from 'react';
import styled from 'styled-components';

export const StyledPage = styled.main<{
  display?: string;
  alignItems?: string;
}>`
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: ${(props) => (props.display ? props.display : undefined)};
  align-items: ${(props) => (props.alignItems ? props.alignItems : undefined)};
`;

const Page: React.FC<{ display?: string; alignItems?: string }> = ({
  children,
  display,
  alignItems,
}) => {
  return (
    <StyledPage display={display} alignItems={alignItems}>
      {children}
    </StyledPage>
  );
};

export default Page;
