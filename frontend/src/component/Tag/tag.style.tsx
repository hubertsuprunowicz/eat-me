import styled from 'styled-components';
import {
  WidthProps,
  HeightProps,
  ColorProps,
  FontSizeProps,
  BorderRadiusProps,
  SpaceProps,
  BoxShadowProps,
  variant,
} from 'styled-system';

type Variant = {
  variant?: 'primary' | 'secondary' | 'warn' | 'danger' | 'grey' | undefined;
};

// type TagProps = WidthProps &
//   HeightProps &
//   ColorProps &
//   FontSizeProps &
//   Variant &
//   BorderRadiusProps &
//   SpaceProps &
//   BoxShadowProps;

// export const TagItem = styled('div')<TagProps>(
//   {
//     '> *': {
//       marginLeft: '3px',
//       marginRight: '3px',
//     },
//   },
//   variant({
//     prop: 'variant',
//     scale: 'buttons',
//     variants: {
//       primary: {
//         color: 'white',
//         bg: 'white',
//       },
//       secondary: {
//         color: 'white',
//         bg: 'white',
//       },
//     },
//   })
// );

export const TagItem = styled.div`
  border-radius: 20px;
  margin: 3px 5px 3px 5px;
  padding: 6px;
  color: white;
  font-size: 0.75em;
`;
