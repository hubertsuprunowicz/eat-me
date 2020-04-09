import gql from 'graphql-tag';

export const WATCHES_RECIPES = gql`
	query watchesRecipes($id: ID!) {
		watchesRecipes(id: $id) {
			id
			name
			description
			difficulty
			image
			time
			user {
				id
				name
			}
		}
	}
`;

export const RECIPE_DISCOVERD = gql`
	subscription NewRecipeDiscover($id: ID!) {
		newRecipeDiscover(id: $id) {
			id
			name
			description
			difficulty
			image
			time
			user {
				id
				name
			}
		}
	}
`;