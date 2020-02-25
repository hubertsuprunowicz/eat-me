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
  mutation EditUser(
    $oldName: String!
    $name: String
    $email: EmailAddress
    $password: String
    $avatar: String
    $description: String
  ) {
    editUser(
      user: {
        oldName: $oldName
        name: $name
        email: $email
        password: $password
        avatar: $avatar
        description: $description
      }
    ) {
      user {
        name
      }
    }
  }
`;
