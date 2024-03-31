import React from "react";
import {
  ModalProps,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import * as S from "./styles";

import { Spacer } from "../Spacer";
import Text from "../Text";
import Button from "../Button";

type Props = ModalProps & {
  visible: boolean;
  onClose?: () => void;
  title: string;
  description?: string;
  buttonText: string;
  buttonTextsecundary?: string;
  onPress: () => void;
  loading?: boolean;
  onPressSecundary?: () => void;
  onPressTertiary?: () => void;
  fontSizeTitle?: number;
  textclose?: boolean;
};

export default function ModalCamera({
  visible,
  onClose,
  title,
  description,
  fontSizeTitle,
  onPress,
  onPressSecundary,
  onPressTertiary,
  buttonText,
  buttonTextsecundary,
  loading,
  textclose,
  ...rest
}: Props) {
  if (!visible) {
    return null;
  }

  const closeModal = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <S.Container
      transparent
      animationType="fade"
      statusBarTranslucent
      {...rest}
      visible={visible}
    >
      <S.Main>
        <TouchableWithoutFeedback onPress={closeModal}>
          <S.Background>
            <Text
              variant="Inter_400Regular"
              fontSize={fontSizeTitle}
              color="GRAY_400"
              textAlign="center"
            >
              {title}
            </Text>

            <Spacer height={24} />

            <S.ButtonContainer>
              <Button
                title={buttonText}
                type="primary"
                onPress={onPress}
                activeLoad={loading}
              />

              <Spacer height={17} />

              <Button
                title={buttonTextsecundary!}
                type="primary"
                onPress={onPressSecundary}
              />

              <Spacer height={17} />

              {textclose && (
                <TouchableOpacity onPress={onPressTertiary}>
                  <Text variant="Inter_500Medium" color="PRIMARY" textAlign="center">
                    Fechar
                  </Text>
                </TouchableOpacity>
              )}
            </S.ButtonContainer>
          </S.Background>
        </TouchableWithoutFeedback>
      </S.Main>
    </S.Container>
  );
}
