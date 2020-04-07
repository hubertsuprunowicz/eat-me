import gql from 'graphql-tag';

export const RECIPES = gql`
  query Recipes($offset: Int, $limit: Int, $filter: _RecipeFilter) {
    Recipe(first: $limit, offset: $offset, filter: $filter) {
      _id
      id
      name
      difficulty
      totalCost
      time
      image
      tag {
        id
        name
      }
      ingredient {
        id
        name
        amount
      }
      user {
        id
        name
      }
      comment {
        _id
        id
        rating
        description
        timestamp
        user {
          name
        }
      }
    }
  }
`;

export const RECIPE_CREATE = gql`
  mutation CreateRecipe(
    $name: String!
    $description: String!
    $image: String!
    $time: Int!
    $difficulty: Difficulty!
    $tag: [TagInput!]
    $totalCost: Float!
    $ingredient: [IngredientInput!]!
    $userID: Int!
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
