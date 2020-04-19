import gql from 'graphql-tag';

export const RECIPES = gql`
  query Recipes($offset: Int, $filter: _RecipeFilter) {
    Recipe(first: 10, offset: $offset, filter: $filter) {
      _id
      name
      difficulty
      totalCost
      time
      image
      tag {
        _id
        name
      }
      ingredient {
        _id
        name
        amount
      }
      user {
        _id
        name
      }
      comment {
        _id
        rating
        description
        timestamp
        user {
          _id
          name
        }
      }
    }
  }
`;

export const CREATE_RECIPE = gql`
  mutation CreateRecipe(
    $name: String!
    $description: String!
    $image: String!
    $time: Int!
    $difficulty: Difficulty!
    $tag: [TagInput!]
    $totalCost: Float!
    $ingredient: [IngredientInput!]!
    $userID: ID!
  ) {
    createRecipe(
      name: $name
      description: $description
      image: $image
      time: $time
      difficulty: $difficulty
      tag: $tag
      totalCost: $totalCost
      ingredient: $ingredient
      userID: $userID
    ) {
      _id
    }
  }
`;
