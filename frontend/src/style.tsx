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
  lineHeight,
  LineHeightProps,
  ZIndexProps,
  zIndex,
} from 'styled-system';
import { themeGet } from '@styled-system/theme-get';
import { Link, LinkProps } from 'react-router-dom';

// TODO: move all to separete components

type Variant = {
  variant?: 'primary' | 'secondary' | 'warn' | 'danger' | 'regular' | undefined;
};

const styleButton = (name: string) => ({
  outline: 'none',
  border: 'none',
  boxShadow: 'neumorphism',
  color: name !== 'regular' ? `${name}.500` : 'grey.800',
  fill: name !== 'regular' ? `${name}.500` : 'grey.800',
  '&:hover, &:active': {
    transition: 'box-shadow 250ms ease-in-out',
    color: name !== 'regular' ? `${name}.700` : 'black',
    cursor: 'pointer',
    boxShadow: 'clearInset',
  },
  '&:disabled': {
    opacity: 0.5,
  },
});

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
  position: relative;
  text-decoration: none;
  text-align: center;
  font-weight: 700;
  background-color: white;
  border-radius: ${themeGet('radii.0')}px;
  padding: 8px;
  letter-spacing: 1px;
  & svg {
      margin-left: 2px;
      margin-right: 2px;
    };
  ${variant({
    variants: {
      primary: styleButton('primary'),
      secondary: styleButton('secondary'),
      danger: styleButton('danger'),
      success: styleButton('success'),
      warn: styleButton('warn'),
      regular: styleButton('regular'),
    },
  })}
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
`;

Button.defaultProps = {
  variant: 'regular',
  height: '38px',
};

export const LinkButton = styled(Link)<LinkProps & ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  text-align: center;
  font-weight: 700;
  background-color: white;
  border-radius: ${themeGet('radii.0')}px;
  padding: 8px;
  letter-spacing: 1px;
  & svg {
      margin-left: 2px;
      margin-right: 2px;
    };
  ${variant({
    variants: {
      primary: styleButton('primary'),
      secondary: styleButton('secondary'),
      danger: styleButton('danger'),
      success: styleButton('success'),
      warn: styleButton('warn'),
      regular: styleButton('regular'),
    },
  })}
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
`;

LinkButton.defaultProps = {
  variant: 'regular',
  height: '38px',
};

type IconButtonProps = WidthProps &
  HeightProps &
  ColorProps &
  FontSizeProps &
  Variant &
  BorderRadiusProps &
  SpaceProps &
  BoxShadowProps;

export const IconButton = styled(Button)<IconButtonProps>(
  variant({
    variants: {
      primary: styleButton('primary'),
      secondary: styleButton('secondary'),
      danger: styleButton('danger'),
      success: styleButton('success'),
      warn: styleButton('warn'),
      regular: styleButton('regular'),
    },
  }),
  color,
  width,
  height,
  space,
  boxShadow,
  borderRadius,
);

IconButton.defaultProps = {
  variant: 'regular',
  width: '38px',
  height: '38px',
};

export const LinkIconButton = styled(LinkButton)<IconButtonProps>(
  {
    borderRadius: '50%',
  },
  variant({
    variants: {
      primary: styleButton('primary'),
      secondary: styleButton('secondary'),
      danger: styleButton('danger'),
      success: styleButton('success'),
      warn: styleButton('warn'),
      regular: styleButton('regular'),
    },
  }),
  color,
  width,
  height,
  space,
);

LinkIconButton.defaultProps = {
  variant: 'regular',
  width: '38px',
  height: '38px',
};

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
  ZIndexProps &
  TextAlignProps & { cursor?: 'pointer' | 'none' };

export const Box = styled.div<Props>`
  ${flexWrap}
  ${textAlign}
  ${position}
  ${zIndex}
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
  cursor: ${(props) => props.cursor}
`;

type TagProps = WidthProps &
  HeightProps &
  ColorProps &
  FontSizeProps &
  Variant &
  BorderRadiusProps &
  SpaceProps &
  BoxShadowProps & { cursor?: 'pointer' | 'none' } & {
    border?: 'double' | 'none';
  };

export const Tag = styled.div<TagProps>`
cursor: ${(props) => props.cursor};
border-radius: 10px;
border: ${(props) =>
  props.border === 'none' ? undefined : '5px double white'};
margin: 3px 5px;
padding: 8px;
color: white;
font-size: 0.75em;
letter-spacing: 1px;
font-weight: 600;
> * {
  margin-left: 3px;
  margin-right: 3px;
}

${color}
${width}
${height}
${space}
${boxShadow}
${borderRadius}
`;

type TextProps = TextAlignProps &
  FontSizeProps &
  FontWeightProps &
  ColorProps &
  LineHeightProps &
  WidthProps &
  PaddingProps &
  MarginProps & { variant?: 'cursive' };

export const Text = styled.span<TextProps>`
  font-family: ${(props) =>
    props.variant === 'cursive' ? 'Caveat, cursive' : undefined};
  ${color} 
  ${lineHeight}
  ${width}
  ${textAlign} 
  ${fontSize} 
  ${fontWeight} 
  ${padding}
  ${margin}
`;
