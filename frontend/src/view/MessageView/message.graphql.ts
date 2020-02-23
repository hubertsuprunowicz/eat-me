import gql from 'graphql-tag';

export const SEND_MESSAGE = gql`
  mutation CreateMessage(
    $addresseeID: Int!
    $senderID: Int!
    $title: String!
    $message: String!
    $timestamp: Long!
  ) {
    createMessage(
      senderID: $senderID
      addresseeID: $addresseeID
      title: $title
      message: $message
      timestamp: $timestamp
    ) {
      _id
    }
  }
`;

export const GET_USER = gql`
  query GetAddressee($name: String!) {
    user(name: $name) {
      _id
    }
  }
`;

export const YOUR_MESSAGES = gql`
  query YourMessages($name: String!) {
    messages(filter: { sender: { name: $name } }) {
      _id
      title
      message
      timestamp
      addressee {
        name
      }
    }
  }
`;
