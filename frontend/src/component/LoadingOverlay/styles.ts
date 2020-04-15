import styled from 'styled-components/macro';

const Wrapper = styled.div<{ width?: string; height?: string }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;

  .loader-holder {
    > :first-child {
      width: ${props => props.width};
      height: ${props => props.height};
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 999999999;
    }
  }
`;

export { Wrapper };
