import React, { ReactNode } from "react";
import { Text as RNText, TextProps, TextStyle } from "react-native";
import { scale } from "react-native-size-matters";


import { ColorType, SpacingType, TypographyStylesType } from "@global/styles/typesTheme";
import { typography } from "@global/styles/typography";
import { colors } from "@global/styles/colors";
import { spacing } from "@global/styles";

type IStylesProps = TextStyle & TextProps;

interface Props extends IStylesProps {
  children: ReactNode;
  variant: TypographyStylesType;
  color?: ColorType;
  padding?: SpacingType;
  paddingTop?: SpacingType;
  paddingRight?: SpacingType;
  paddingBottom?: SpacingType;
  paddingLeft?: SpacingType;
  paddingHorizontal?: SpacingType;
  marginLeft?: SpacingType;
  marginTop?: SpacingType;
  marginRight?: SpacingType;
  marginBottom?: SpacingType;
}

export default function Text({
  children,
  variant,
  color,
  fontSize,
  textTransform,
  textAlign,
  textDecorationLine,
  padding = "none",
  paddingTop = "none",
  paddingRight = "none",
  paddingBottom = "none",
  paddingLeft = "none",
  marginLeft = "none",
  marginTop = "none",
  marginRight = "none",
  marginBottom = "none",
  paddingHorizontal = "none",
  fontWeight,
  style,
  ...rest
}: Props) {
  return (
    <RNText
      {...rest}
      style={[
        {
          fontSize: fontSize ? scale(fontSize) : typography[variant].fontSize,
          fontFamily: typography[variant].fontFamily,
          color: color ? colors[color] : typography[variant].color,
          textTransform,
          textAlign,
          textDecorationLine,
          padding: spacing[padding],
          paddingTop: spacing[paddingTop],
          paddingRight: spacing[paddingRight],
          paddingBottom: spacing[paddingBottom],
          paddingLeft: spacing[paddingLeft],
          marginLeft: spacing[marginLeft],
          marginTop: spacing[marginTop],
          marginRight: spacing[marginRight],
          marginBottom: spacing[marginBottom],
          paddingHorizontal: spacing[paddingHorizontal],
          fontWeight,
        },
        style && style,
      ]}
    >
      {children}
    </RNText>
  );
}
