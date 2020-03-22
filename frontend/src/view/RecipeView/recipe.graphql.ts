import gql from 'graphql-tag';

export const RECIPE = gql`
  query Recipe($id: String!) {
    Recipe(_id: $id) {
      _id
      name
      difficulty
      time
      totalCost
      image
      comment {
        rating
        description
        timestamp
        user {
          name
        }
      }
      tag {
        name
      }
      ingredient {
        name
        amount
      }
      user {
        _id
        name
        avatar
      }
    }
  }
`;

export const COMMENT = gql`
  mutation CreateComment(
    $userID: ID!
    $recipeID: ID!
    $rating: Int!
    $timestamp: Long!
    $description: String
  ) {
    createComment(
      input: {
        userID: $userID
        recipeID: $recipeID
        rating: $rating
        timestamp: $timestamp
        description: $description
      }
    ) {
      rating
      description
    }
  }
`;

export const WATCHES = gql`
  mutation CreateWatch($subscribingUser: ID!, $subscribedUser: ID!) {
    createsWatchRelationship(
      subscribingUser: $subscribingUser
      subscribedUser: $subscribedUser
    )
  }
`;
