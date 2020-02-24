import gql from 'graphql-tag';

export const USER = gql`
  query User($name: String!) {
    user(name: $name) {
      _id
      name
      email
      avatar
      description
    }
  }
`;

export const EDIT_USER = gql`
  mutation EditUser($name: String!) {
    editUser(name: $name) {
      _id
      name
      email
      avatar
      description
    }
  }
`;
