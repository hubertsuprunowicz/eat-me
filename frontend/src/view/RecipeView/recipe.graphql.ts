import gql from 'graphql-tag';

export const RECIPE = gql`
	query Recipe($id: String!) {
		Recipe(_id: $id) {
			id
			_id
			name
			difficulty
			time
			totalCost
			image
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
				_id
				id
				name
				avatar
			}
		}
	}
`;

export const COMMENT = gql`
	mutation CreateComment($userID: ID!, $recipeID: ID!, $rating: Int!, $timestamp: Long!, $description: String) {
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

export const RECIPE_UPDATE = gql`
	mutation EditRecipe(
		$id: ID!
		$name: String
		$description: String
		$image: String
		$time: Int
		$totalCost: Float
		$difficulty: Difficulty
		$tag: [TagInput]
		$ingredient: [IngredientInput]
	) {
		editRecipe(
			id: $id
			name: $name
			description: $description
			image: $image
			time: $time
			totalCost: $totalCost
			difficulty: $difficulty
			tag: $tag
			ingredient: $ingredient
		) {
			id
		}
	}
`;

export const GET_WATCH = gql`
	query GetWatch($subscribingUser: ID!, $subscribedUser: ID!) {
		getWatch(subscribingUser: $subscribingUser, subscribedUser: $subscribedUser) {
			subscribed
		}
	}
`;

export const WATCHES = gql`
	mutation CreateWatch($subscribingUser: ID!, $subscribedUser: ID!) {
		createWatchRelationship(subscribingUser: $subscribingUser, subscribedUser: $subscribedUser)
	}
`;

export const UNWATCHES = gql`
	mutation RemoveWatch($subscribingUser: ID!, $subscribedUser: ID!) {
		removeWatchRelationship(subscribingUser: $subscribingUser, subscribedUser: $subscribedUser)
	}
`;
