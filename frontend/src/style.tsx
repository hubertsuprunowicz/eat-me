import styled from 'styled-components';
import {
  variant,
  space,
  layout,
  flex,
  typography,
  ColorProps,
  SizeProps,
  FontSizeProps,
  FlexProps,
  DisplayProps,
  flexDirection,
  FlexDirectionProps,
  AlignItemsProps,
  alignItems,
  SpaceProps,
  BorderRadiusProps,
  BoxShadowProps,
  borderRadius,
  boxShadow,
  WidthProps,
  width,
  HeightProps,
  height,
  color,
  fontSize,
  TextAlignProps,
  textAlign,
  AlignContentProps,
  alignContent,
  JustifyContentProps,
  JustifyItemsProps,
  justifyContent,
  justifyItems,
  MinHeightProps,
  MinWidthProps,
  minHeight,
  minWidth,
  MaxHeightProps,
  MaxWidthProps,
  maxHeight,
  MarginProps,
  margin,
  BorderColorProps,
  BorderWidthProps,
  borderColor,
  borderWidth,
  border,
  BorderProps,
  fontWeight,
  FontWeightProps,
  flexWrap,
  FlexWrapProps,
  PositionProps,
  position,
} from 'styled-system';
import { themeGet } from '@styled-system/theme-get';

export const Main = styled.main`
  background: white;
  /* background: rgb(247, 247, 247); */
  /* background: linear-gradient(
    180deg,
    rgba(247, 247, 247, 1) 1%,
    rgba(240, 240, 240, 1) 52%,
    rgba(232, 232, 232, 1) 100%
  ); */

  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;

  * {
    font-family: 'Raleway', sans-serif;
    font-weight: 500;
  }
`;

type Variant = {
  variant?: 'primary' | 'secondary' | 'warn' | 'danger' | 'grey' | undefined;
};

type ButtonProps = ColorProps &
  SpaceProps &
  WidthProps &
  HeightProps &
  BoxShadowProps &
  FontSizeProps &
  Variant &
  BorderRadiusProps &
  BorderColorProps &
  BorderWidthProps &
  BorderProps &
  FontWeightProps;

export const Button = styled('button')<ButtonProps>`
  cursor: pointer;
  border: none;
  outline: none;
  text-decoration: none;
  text-align: center;
  font-weight: 700;
  color: ${themeGet('colors.grey.700')};
  background-color: white;
  border-radius: ${themeGet('radii.0')}px;
  padding: 8px;
  letter-spacing: 1px;
  /* text-shadow: 4px 4px 8px rgb(163,177,198,1), -4px -4px 8px rgba(255,255,255, 1); */

  & svg {
    margin-left: 2px;
    margin-right: 2px;
  }

  :hover {
    /* TODO: hover background color via variant */
  };

  :focus {
    /* box-shadow: ${themeGet('shadows.insetNeo')}; */
  };
  ${fontWeight}
  ${boxShadow}
  ${color}
  ${fontSize}
  ${width}
  ${height}
  ${space}
  ${border}
  ${borderWidth}
  ${borderColor}
  ${borderRadius}
  ${variant({
    prop: 'variant',
    scale: 'buttons',
    variants: {
      primary: {
        color: 'white',
        bg: 'white',
      },
      secondary: {
        color: 'white',
        bg: 'white',
      },
    },
  })}
`;

type IconButtonProps = WidthProps &
  HeightProps &
  ColorProps &
  FontSizeProps &
  Variant &
  BorderRadiusProps &
  SpaceProps &
  BoxShadowProps;

export const IconButton = styled(Button)<IconButtonProps>(
  {
    border: 'none',
    backgroundColor: 'white',
    cursor: 'pointer',
  },
  color,
  width,
  height,
  space,
  boxShadow,
  borderRadius,
  variant({
    prop: 'variant',
    scale: 'buttons',
    variants: {
      primary: {
        color: 'white',
        bg: 'white',
      },
      secondary: {
        color: 'white',
        bg: 'white',
      },
    },
  })
);

type Props = ColorProps &
  WidthProps &
  MinHeightProps &
  MaxHeightProps &
  MinWidthProps &
  MaxWidthProps &
  HeightProps &
  SizeProps &
  SpaceProps &
  DisplayProps &
  FontSizeProps &
  FlexProps &
  FlexDirectionProps &
  JustifyContentProps &
  JustifyItemsProps &
  AlignItemsProps &
  AlignContentProps &
  BorderRadiusProps &
  BoxShadowProps &
  WidthProps &
  PositionProps &
  MarginProps &
  FlexWrapProps &
  TextAlignProps & { cursor?: 'pointer' | 'none' };

export const Box = styled.div<Props>`
  ${flexWrap}
  ${textAlign}
  ${position}
  ${margin}
  ${alignContent}
  ${justifyContent}
  ${justifyItems}
  ${height}
  ${minHeight}
  ${maxHeight}
  ${width}
  ${minWidth}
  ${maxHeight}
  ${space}
  ${layout}
  ${typography}
  ${color}
  ${flex}
  ${flexDirection}
  ${alignItems}
  ${borderRadius}
  ${boxShadow}
  ${width}
  cursor: ${props => props.cursor}
`;

type TagProps = WidthProps &
  HeightProps &
  ColorProps &
  FontSizeProps &
  Variant &
  BorderRadiusProps &
  SpaceProps &
  BoxShadowProps & { cursor?: 'pointer' | 'none' };

export const Tag = styled('div')<TagProps>`
${color}
${width}
${height}
${space}
${boxShadow}
${borderRadius}
cursor: ${props => props.cursor};
border-radius: 20px;
margin: 3px 5px 3px 5px;
padding: 8px;
color: white;
font-size: 0.75em;
/* border: 4px solid #eee; */
/* box-shadow: inset 3px 3px 3px rgba(0,0,0,0.2), inset -3px -4px 4px rgba(255,255,255,0.4); */
box-shadow: inset 3px 3px 3px rgba(0,0,0,0.2);

> * {
  margin-left: 3px;
  margin-right: 3px;
}

${variant({
  prop: 'variant',
  scale: 'tags',
  variants: {
    primary: {
      color: 'white',
      bg: 'white',
    },
    secondary: {
      color: 'white',
      bg: 'white',
    },
  },
})}
`;

type TextProps = TextAlignProps & FontSizeProps & FontWeightProps & ColorProps;

export const Text = styled('span')<TextProps>`
${color}
${textAlign}
${fontSize}
${fontWeight}
`;

// (
//   {
//     borderRadius: '20px',
//     margin: '3px 5px 3px 5px',
//     padding: '7px',
//     color: 'white',
//     fontSize: '0.75em',
//     boxShadow: `${themeGet('shadows.insetNeo')}`,

//     '> *': {
//       marginLeft: '3px',
//       marginRight: '3px',
//     },
//   },
//   color,
//   width,
//   height,
//   space,
//   boxShadow,
//   borderRadius,
//   variant({
//     prop: 'variant',
//     scale: 'tags',
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

// TODO: <Text />
// TODO: <LinkButton />
