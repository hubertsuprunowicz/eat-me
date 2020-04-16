import styled from 'styled-components';
import { Tag } from 'style';
import { themeGet } from '@styled-system/theme-get';

const CARD_MARGIN = '10px';

export const SubscribeTag = styled(Tag)`
  position: absolute;
  padding: 2px;
  min-width: 15px;
  font-size: 0.8em;
  font-weight: 600;
  top: -5px;
  right: -5px;
`;

export const WatchesList = styled.ul`
	padding: 0;
	display: flex;
	flex-wrap: wrap;
	text-align: center;
	text-decoration: none;

	a:link {
		text-decoration: none;
		color: black;
	}

	a:visited {
		text-decoration: none;
		color: black;
	}

	li {
		display: flex;
		flex-direction: column;
		flex: 0 calc(50% - ${CARD_MARGIN} * 2);
		margin: ${CARD_MARGIN};
		border-radius: ${themeGet('radii.0')}px;
		padding-bottom: ${themeGet('space.3')}px;
		background-color: white;
		position: relative;
		box-shadow: ${themeGet('shadows.neumorphism')};
	}

	img {
		object-fit: cover;
		border-radius: ${themeGet('radii.0')}px;
		height: 160px;
		width: 100%;
	}

	b {
		display: block;
		padding: 5px 0 5px 0;
	}
`;
