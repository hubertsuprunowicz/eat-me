import styled from 'styled-components';
import { Box } from 'style';
import { themeGet } from '@styled-system/theme-get';

export const Badge = styled(Box)`
    cursor: pointer;
	position: absolute !important;
	top:-5px;
    right:-10px;
    width: 20px;
    height: 18px;
    line-height:  ${themeGet('space.2')}px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${themeGet('radii.0')}px;
`;
