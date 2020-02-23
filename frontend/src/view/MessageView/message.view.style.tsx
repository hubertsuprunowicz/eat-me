import styled from 'styled-components';

export const MessageList = styled.ul`
  text-decoration: none;
  padding: 0;
  overflow-y: auto;
  li {
    display: flex;
    align-content: space-around;
    background-color: transparent;
    margin-bottom: 20px;
  }

  img {
    object-fit: cover;
    border-radius: 50%;

    width: 45px;
    max-width: 45px;
    min-width: 45px;
    height: 45px;
    max-height: 45px;
    min-height: 45px;
  }
`;
