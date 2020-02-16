import gql from 'graphql-tag';

export const LIMIT = 6;

export const RECIPES = gql`
  query Recipes($offset: Int!){
  recipes(first: ${LIMIT}, offset: $offset) {
    name
    difficulty
		user {
      name
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
      ingredient: $ingredient
      userID: $userID
    ) {
      _id
    }
  }
`;
