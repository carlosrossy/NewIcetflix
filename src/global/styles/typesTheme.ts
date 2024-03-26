import { colors } from "./colors";
import { spacing } from "./theme";
import { typography } from "./typography";

export type ColorType = keyof typeof colors;

export interface IStyleFontVariant {
  fontFamily: string;
  fontSize: number;
  color: string;
}
export type TypographyStylesType = keyof typeof typography;
export type SpacingType = keyof typeof spacing;
