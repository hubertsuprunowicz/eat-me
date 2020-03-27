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
        _id
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

export const GET_WATCH = gql`
  query GetWatch($subscribingUser: ID!, $subscribedUser: ID!) {
    getWatch(
      subscribingUser: $subscribingUser
      subscribedUser: $subscribedUser
    ) {
      subscribed
    }
  }
`;

export const WATCHES = gql`
  mutation CreateWatch($subscribingUser: ID!, $subscribedUser: ID!) {
    createWatchRelationship(
      subscribingUser: $subscribingUser
      subscribedUser: $subscribedUser
    )
  }
`;

export const UNWATCHES = gql`
  mutation RemoveWatch($subscribingUser: ID!, $subscribedUser: ID!) {
    removeWatchRelationship(
      subscribingUser: $subscribingUser
      subscribedUser: $subscribedUser
    )
  }
`;
