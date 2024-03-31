import React, { useState } from "react";
import * as S from "./styles";

import { TextInputProps } from "react-native";
import { Control, FieldError, useController } from "react-hook-form";
import Text from "../Text";
import { Spacer } from "../Spacer";

import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from "@expo/vector-icons";

export type TypeIConsInput =
  | "email"
  | "emailError"
  | "password"
  | "passwordError"
  | "search"
  | "searchError"
  | "openEye"
  | "openEyeError"
  | "closeEye"
  | "closeEyeError"
  | "user"
  | "userError"
  ;

interface IconsInput {
  [key: string]: JSX.Element;
}

const iconsInput: IconsInput = {
  email: <MaterialCommunityIcons name="email" size={22} color="#FFFFFF" />,
  emailError: <MaterialCommunityIcons name="email" size={22} color="#FF0000" />,
  password: <FontAwesome5 name="lock" size={20} color="#FFFFFF" />,
  passwordError: <FontAwesome5 name="lock" size={20} color="#FF0000" />,
  search: <FontAwesome5 name="search" size={22} color="#FFFFFF" />,
  searchError: <FontAwesome5 name="search" size={22} color="#FF0000" />,
  openEye: <FontAwesome5 name="eye" size={22} color="#FFFFFF" />,
  openEyeError: <FontAwesome5 name="eye" size={22} color="##FF0000" />,
  closeEye: <FontAwesome5 name="eye-slash" size={22} color="#FFFFFF" />,
  closeEyeError: <FontAwesome5 name="eye-slash" size={22} color="#FF0000" />,
  user: <FontAwesome name="user" size={22} color="#FFFFFF" />,
  userError: <FontAwesome name="user" size={22} color="#FF0000" />,
};

interface Props extends TextInputProps {
  title?: string;
  isActivePassword?: boolean;
  errors?: FieldError;
  type?: TypeIConsInput;
  width?: string;
  height?: string;
  disabled?: boolean;
  placeholderTextColor?: string;
}

export function Input({
  title,
  width,
  height,
  errors,
  isActivePassword,
  type,
  disabled,
  placeholderTextColor,
  ...props
}: Props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <S.Container width={width}>
      <S.ContainerHeader>
        <Text
          variant="Inter_400Regular"
          color="GRAY"
          fontSize={15}
          style={{
            letterSpacing: 0.15,
            marginBottom: 5,
          }}
        >
          {title}
        </Text>
      </S.ContainerHeader>

      <S.ContentInput width={width} height={height} isErrored={!!errors}>
        <S.Icon isErrored={!!errors}>
          {type! && iconsInput[type! + (errors ? "Error" : "")]}
        </S.Icon>

        <S.TextInputNative
          editable={disabled}
          selectTextOnFocus={disabled}
          secureTextEntry={isActivePassword ? isOpen : false}
          placeholderTextColor={placeholderTextColor}
          {...props}
        />

        {isActivePassword && (
          <S.ButtonEye onPress={() => setIsOpen((oldState) => !oldState)}>
            {isOpen
              ? iconsInput[errors ? "closeEyeError" : "closeEye"]
              : iconsInput[errors ? "openEyeError" : "openEye"]}
          </S.ButtonEye>
        )}
      </S.ContentInput>

      <Spacer height={10} />

      {errors && (
        <Text variant="Inter_400Regular" fontSize={12} color="RED">
          {String(errors?.message)}
        </Text>
      )}
    </S.Container>
  );
}
