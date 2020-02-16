import styled from 'styled-components';
import { WidthProps, MarginProps, margin } from 'styled-system';

type Props = WidthProps & MarginProps;
export const Input = styled.input<Props>`
  ${margin}
  width: ${props => props.width}px !important;
`;
