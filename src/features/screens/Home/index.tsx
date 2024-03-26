import React from "react";
import * as S from "./styles";

import Text from "@global/components/Text";
import { ActivityIndicator } from "react-native";

export default function Home() {
  return (
    <S.Container>
      <Text variant="Inter_400Regular" fontSize={20} color="GREEN_LIGHT">
        Hello world!!
      </Text>
      <Text variant="Inter_500Medium" fontSize={20} color="PRIMARY">
        Hello world!!
      </Text>
      <Text variant="Inter_600SemiBold" fontSize={20} color="GRAY_900">
        Hello world!!
      </Text>
      <Text variant="Inter_700Bold" fontSize={20} color="GRAY_900">
        Hello world!!
      </Text>
    </S.Container>
  );
}
