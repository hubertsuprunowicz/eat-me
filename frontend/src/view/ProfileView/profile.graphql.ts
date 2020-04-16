import gql from 'graphql-tag';

export const USER = gql`
	query User($name: String!) {
		User(name: $name) {
			_id
			name
			avatar
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

export const EDIT_USER = gql`
	mutation EditUser($oldName: String!, $name: String, $password: String, $avatar: String, $description: String) {
		editUser(
			user: { oldName: $oldName, name: $name, password: $password, avatar: $avatar, description: $description }
		) {
			_id
			name
			avatar
			description
		}
	}
`;
