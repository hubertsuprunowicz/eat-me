import styled from 'styled-components';
import { LinkIconButton } from 'style';

export const ListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
`;

export const MessageList = styled.ul`
	overflow-y: auto;
	width: 100%;
	position: absolute;
	height: 80vh;

	text-decoration: none;
	padding: 0;
	overflow-y: auto;

	& ${LinkIconButton} {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	& li {
		display: flex;
		align-content: space-around;
		align-items: flex-start;
		background-color: transparent;
		overflow: hidden;
		margin: 0;
		padding: 20px 25px;
	}

	& li:hover {
		background-color: #fdfdfdfd;
		box-shadow: 9px 9px 16px rgb(163, 177, 198, 0.6), -9px -9px 16px rgba(255, 255, 255, 0.5);
	}

	img {
		object-fit: contain;
		border-radius: 50%;
		box-shadow: 9px 9px 16px rgb(163, 177, 198, 0.6), -9px -9px 16px rgba(255, 255, 255, 0.5);

		width: 45px;
		max-width: 45px;
		min-width: 45px;
		height: 45px;
		max-height: 45px;
		min-height: 45px;
	}
`;
