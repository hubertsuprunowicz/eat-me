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
      tag {
        name
      }
      ingredient {
        name
        amount
      }
      user {
        name
        avatar
      }
    }
  }
`;
