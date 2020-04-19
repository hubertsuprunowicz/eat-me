import styled from 'styled-components';
import { IconButton } from '../../style';
import { width, WidthProps, PaddingProps, padding } from 'styled-system';

export const CloseButton = styled(IconButton)`
  width: 40px;
  height: 40px;
`;

export const modalStyle = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		fontFamily: 'Raleway, sans-serif',
		fontWeight: 500,
		border: 'black',
		borderRadius: '10px',
		boxShadow: '9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.5)'
	}
};

type Props = WidthProps & PaddingProps;
export const DeleteModalStyle =
	styled.div <
	Props >
	`
  ${width}
  ${padding}
  display: flex;
  flex-direction: column;
`;
