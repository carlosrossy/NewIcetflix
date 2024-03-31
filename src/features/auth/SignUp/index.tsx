import React, { useState } from "react";
import * as S from "./styles";

import { ScrollView, StatusBar, TouchableOpacity } from "react-native";

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

const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().required("Senha é obrigatório"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "As senhas devem coincidir")
    .required("Confirmação de senha é obrigatória"),
});

export default function SignUp() {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const [image, setImage] = useState("");
  const { registerAccount, isLoading } = useAuth();

  function handleSingUp(data: {
    email: string;
    password: string;
    name: string;
  }) {
    const { email, password, name } = data;
    registerAccount(email, password, name, image);
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <S.Container>
        <StatusBar barStyle="default" backgroundColor={"#121011"} />

        <S.Form>
          <Controller
            control={control}
            name="name"
            rules={{ required: "name é obrigatório" }}
            render={({ field: { value, onChange } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                title="Nome"
                placeholder="Nome"
                errors={errors?.name}
                type="user"
              />
            )}
          />
          <Spacer height={12} />

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
          <Spacer height={12} />
          <Controller
            control={control}
            name="password"
            rules={{ required: "Senha é obrigatório" }}
            render={({ field: { value, onChange } }) => (
              <Input
                onChangeText={onChange}
                title="Senha"
                value={value}
                isActivePassword
                placeholder="Senha"
                autoCapitalize={"none"}
                errors={errors?.password}
                type="password"
              />
            )}
          />

          <Spacer height={12} />

          <Controller
            control={control}
            name="confirmPassword"
            rules={{ required: "confirmação é obrigatório" }}
            render={({ field: { value, onChange } }) => (
              <Input
                onChangeText={onChange}
                title="Confirmar senha"
                value={value}
                isActivePassword
                placeholder="Confirmar senha"
                autoCapitalize={"none"}
                errors={errors?.confirmPassword}
                type="password"
              />
            )}
          />

          <Spacer height={10} />
        </S.Form>

        <S.Footer>
          <Button
            title="Cadastrar"
            onPress={handleSubmit(handleSingUp)}
            activeLoad={isLoading}
          />

          <Spacer height={20} />

          <S.TextRow>
            <Text variant="Inter_500Medium" color="GRAY">
              já possui uma conta?{" "}
            </Text>
            <TouchableOpacity onPress={navigation.goBack}>
              <Text variant="Inter_500Medium" color="PRIMARY">
                Entrar
              </Text>
            </TouchableOpacity>
          </S.TextRow>
        </S.Footer>
      </S.Container>
    </ScrollView>
  );
}
