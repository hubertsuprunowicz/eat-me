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
    width: 45px !important;
    height: 45px !important;
  }
`;
