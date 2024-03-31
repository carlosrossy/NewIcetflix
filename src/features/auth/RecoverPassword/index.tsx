import React, { useState } from "react";
import * as S from "./styles";

import { StatusBar, TouchableOpacity } from "react-native";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input } from "@global/components/Input";
import { Spacer } from "@global/components/Spacer";
import Text from "@global/components/Text";
import Button from "@global/components/Button";
import { useAuth } from "@global/context/auth";
import { useNavigation } from "@react-navigation/native";
import { AuthScreenNavigationProp } from "@global/routes/auth.routes";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { MaterialIcons } from "@expo/vector-icons";

import Recover from "@assets/recover.svg";
import theme from "@global/styles/theme";

const schema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
});

export default function RecoverPassword() {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const { islogin, forgotPassword } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleForgot(data: { email: string }) {
    const { email } = data;
    forgotPassword(email);
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{}}
      showsVerticalScrollIndicator={false}
    >
      <S.Container>
        <StatusBar barStyle="default" backgroundColor={"#121011"} />

        <S.Header top={23}>
          <TouchableOpacity
            onPress={navigation.goBack}
            style={{ marginTop: -5 }}
          >
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={theme.colors.WHITE}
            />
          </TouchableOpacity>
        </S.Header>

        <S.Form>
          <S.Logo>
            <Recover />
          </S.Logo>

          <Text
            variant="Inter_500Medium"
            color="WHITE"
            fontSize={20}
            textAlign="center"
          >
            Esqueceu sua senha?
          </Text>

          <Spacer height={12} />

          <Text
            variant="Inter_500Medium"
            color="WHITE"
            fontSize={16}
            textAlign="center"
          >
            Por favor insira seu email cadastrado na plataforma que enviaremos
            um link para o mesmo com as instruções para restauração de sua senha
          </Text>

          <Spacer height={40} />

          <Controller
            control={control}
            name="email"
            rules={{ required: "Email é obrigatório" }}
            render={({ field: { value, onChange } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                title="E-mail"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize={"none"}
                errors={errors?.email}
                type="email"
              />
            )}
          />

          <Spacer height={40} />

          <S.Footer>
            <Button
              title="Enviar"
              onPress={handleSubmit(handleForgot)}
              activeLoad={islogin}
            />
          </S.Footer>
          <Spacer height={30} />
        </S.Form>
      </S.Container>
    </KeyboardAwareScrollView>
  );
}
