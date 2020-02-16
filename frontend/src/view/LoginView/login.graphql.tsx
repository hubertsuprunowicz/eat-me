import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation Login($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      token
    }
  }
`;
export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $password: String!) {
    createUser(name: $name, password: $password) {
      _id
      token
      userID
    }
  }
`;
