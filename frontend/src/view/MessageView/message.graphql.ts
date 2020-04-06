import gql from 'graphql-tag';

export const SEND_MESSAGE = gql`
	mutation CreateMessage($addresseeID: Int!, $senderID: Int!, $title: String!, $message: String!, $timestamp: Long!) {
		createMessage(
			senderID: $senderID
			addresseeID: $addresseeID
			title: $title
			message: $message
			timestamp: $timestamp
		) {
			_id
		}
	}
`;

export const GET_USER = gql`
	query GetAddressee($name: String!) {
		user(name: $name) {
			_id
			id
		}
	}
`;

export const YOUR_MESSAGES = gql`
	query YourMessages($name: String!, $message: String) {
		messages(filter: { addressee: { name: $name }, message_contains: $message }, orderBy: timestamp_desc) {
			_id
			title
			message
			timestamp
			sender {
				id
				_id
				name
			}
		}
	}
`;

export const MESSAGE_RECIVED = gql`
	subscription onMessageRecived($id: ID!) {
		messageRecived(id: $id) {
			_id
			title
			message
			timestamp
			sender {
				id
				_id
				name
			}
		}
	}
`;
