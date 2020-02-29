import styled from 'styled-components';

export const MessageList = styled.ul`
  text-decoration: none;
  padding: 0;
  overflow-y: auto;
  padding-bottom: 40px;

  & li {
    display: flex;
    align-content: space-around;
    background-color: transparent;
    margin: 0;
    padding: 20px 15px;
    height: 45px;
  }

  & li:hover {
    background-color: #fdfdfdfd;
    box-shadow: 9px 9px 16px rgb(163, 177, 198, 0.6),
      -9px -9px 16px rgba(255, 255, 255, 0.5);
  }

  img {
    margin-right: 10px;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: 9px 9px 16px rgb(163, 177, 198, 0.6),
      -9px -9px 16px rgba(255, 255, 255, 0.5);

    width: 45px;
    max-width: 45px;
    min-width: 45px;
    height: 45px;
    max-height: 45px;
    min-height: 45px;
  }
`;
