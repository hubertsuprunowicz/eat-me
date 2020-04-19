import gql from 'graphql-tag';

export const USER = gql`
	query User($name: String!) {
		User(name: $name) {
			_id
			name
			avatar
			email
			description
			recipe {
				tag {
					_id
					name
				}
			}
		}
	}
`;

export const UPDATE_USER = gql`
	mutation UpdateUser(
		$oldName: String!
		$name: String
		$email: String
		$password: String
		$avatar: String
		$description: String
	) {
		updateUser(
			user: {
				oldName: $oldName
				name: $name
				email: $email
				password: $password
				avatar: $avatar
				description: $description
			}
		) {
			_id
			name
			avatar
			email
			description
		}
	}
`;
