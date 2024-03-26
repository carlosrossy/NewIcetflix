import { scale } from "react-native-size-matters";
import { colors } from "./colors";
import { typography } from "./typography";

export const spacing = {
  none: 0,
  xsmall: scale(4),
  small: scale(8),
  medium: scale(16),
  large: scale(24),
  xlarge: scale(40),
  xsm: scale(4),
  sm: scale(8),
  md: scale(16),
  lg: scale(24),
  xlg: scale(40),
};
export default {
  colors: colors,
  spacing: spacing,
  breakpoints: {
    smallPhone: 0,
    phone: 375,
  },
  textVariants: typography,
};
