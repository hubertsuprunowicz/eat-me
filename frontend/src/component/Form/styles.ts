import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const FormDefault = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;

	&.filter input[type=number] {
		width: 105px;
	}

	input:focus,
	textarea:focus,
	select:focus {
		outline: none;
	}

	input,
	textarea,
	select {
		box-shadow: ${themeGet('shadows.clearInset')};
		height: 35px;
		border: 1px solid darkgray;
		border: white;
		border-radius: ${themeGet('radii.0')}px;
		padding: 5px 8px;
		padding-left: ${themeGet('space.5')}px;
		margin-bottom: 5px;
		font-family: 'Raleway', sans-serif;

		::-webkit-input-placeholder {
			font-family: 'Raleway', sans-serif;
			color: ${themeGet('colors.grey.400')};
			font-weight: 400;
		}
	}

	& label {
		font-weight: 500 !important;
		padding: 5px 0;
		margin-top: 10px;
	}

	& input {
		height: 45px;
		width: 250px;
	}

	& textarea {
		width: 250px;
		min-height: 50px;
		max-height: 360px;
		resize: vertical;
	}

	& select {
		width: 250px;
		height: 45px;

		> option {
			margin: 20px;
			border: none;
			outline: none;
		}
	}
`;
