import gql from 'graphql-tag';

export const LIMIT = 6;

export const RECIPES = gql`
  query Recipes($offset: Int!, $onlyPerson: Boolean = false, $personName: String) {

    recipes(first: ${LIMIT}, offset: $offset) @skip(if: $onlyPerson) {
      _id
      name
      difficulty
      time
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
      }
    }

    Recipe(filter: {user: {name: $personName}}) @include(if: $onlyPerson) {
      _id
      name
      difficulty
      time
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
