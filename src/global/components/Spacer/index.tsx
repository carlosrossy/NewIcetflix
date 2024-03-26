import React from "react";
import { View } from "react-native";
import { scale } from "react-native-size-matters";

interface Props {
  width?: number;
  height?: number;
}
export function Spacer({ width = 0, height = 0 }: Props) {
  return (
    <View
      style={{
        width: scale(width),
        height: scale(height),
      }}
    />
  );
}