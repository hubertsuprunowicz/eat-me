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
  padding,
  PaddingProps,
} from 'styled-system';
import { themeGet } from '@styled-system/theme-get';
import { Link, LinkProps } from 'react-router-dom';

export const Main = styled.main`
  background: white;
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;

  .toast-size {
    width: 220px;
    height: 100px;
  }

  > * {
    ::-webkit-input-placeholder {
      font-family: 'Raleway', sans-serif;
      color: red !important;
    }
  }

  * {
    font-family: 'Raleway', sans-serif;
    font-weight: 500;
    outline: none !important;
  }

  *:focus {
    outline: none !important;
  }

  a,
  button {
    font-size: 13px;
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

export const LinkButton = styled(Link)<LinkProps & ButtonProps>`
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
  box-shadow: ${themeGet('shadows.neumorphism')};
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
  ${color}
  ${fontSize}
  ${width}
  ${height}
  ${space}
  ${border}
  ${borderWidth}
  ${borderColor}
  ${boxShadow}
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
  }),
);

export const LinkIconButton = styled(LinkButton)<IconButtonProps>(
  {
    border: 'none',
    backgroundColor: 'white',
    cursor: 'pointer',
    borderRadius: '50%',
    boxShadow:
      'inset 0 0 15px rgba(55, 84, 170,0), inset 0 0 20px rgba(255, 255, 255,0), 7px 7px 15px rgba(55, 84, 170,.15), -7px -7px 20px rgba(255, 255, 255,1), inset 0px 0px 4px rgba(255, 255, 255,.2)',
  },
  color,
  width,
  height,
  space,
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
  }),
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
border-radius: 10px;
margin: 3px 5px 3px 5px;
padding: 8px;
color: white;
font-size: 0.75em;
letter-spacing: 1px;
font-weight: 600;
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

type TextProps = TextAlignProps &
  FontSizeProps &
  FontWeightProps &
  ColorProps &
  PaddingProps &
  MarginProps;

export const Text = styled('span')<TextProps>`
${color}
${textAlign}
${fontSize}
${fontWeight}
${padding}
${margin}
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
