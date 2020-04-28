import styled from 'styled-components';

export const StyledComment = styled.div`
	position: relative;
	margin: 10px;
	padding: 14px 18px;
	padding-bottom: 15px;
	border-radius: 5px;
	flex: 1;
	max-width: 200px;
	height: 100%;
	word-break: break-all;
	box-shadow: 9px 9px 16px rgb(163, 177, 198, 0.6), -9px -9px 16px rgba(255, 255, 255, 0.5);

	.pre-text {
		white-space: pre !important;
	}

	p {
		font-size: 0.7rem;
	}
`;
