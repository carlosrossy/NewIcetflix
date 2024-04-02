import React from "react";
import * as S from "./styles";
import { AppScreenNavigationProp } from "@global/routes/app.routes";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@global/context/auth";

import Text from "@global/components/Text";

import { Ionicons } from "@expo/vector-icons";
import { Spacer } from "@global/components/Spacer";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@global/components/Input";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@global/components/Button";

export const passwordSchema = yup.object().shape({
  currentPassword: yup.string().required("Senha atual é obrigatória"),
  password: yup.string().required("Senha é obrigatória"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "As senhas devem coincidir")
    .required("Confirmação de senha é obrigatória"),
});

export default function UpdatePassword() {
  const navigation = useNavigation<AppScreenNavigationProp>();
  const { isLoading, updatePassword } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  function OnsubmitUpdatePassword(data: {
    password: string;
    currentPassword: string;
  }) {
    const { password, currentPassword } = data;
    updatePassword(password, currentPassword);
  }

  return (
    <S.Container>
      <S.ContainerButton>
        <S.Button onPress={navigation.goBack}>
          <Ionicons name="chevron-back" size={24} color="#FFFF" />
        </S.Button>
      </S.ContainerButton>

      <Spacer height={20} />

      <Controller
        control={control}
        name="currentPassword"
        rules={{ required: "Senha atual é obrigatório" }}
        render={({ field: { value, onChange } }) => (
          <Input
            onChangeText={onChange}
            title="Senha atual"
            value={value}
            isActivePassword
            placeholder="Senha"
            autoCapitalize={"none"}
            errors={errors?.currentPassword}
            type="password"
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

      <Spacer height={20} />

      <Button
        title="Alterar"
        onPress={handleSubmit(OnsubmitUpdatePassword)}
        disabled={isLoading}
        activeLoad={isLoading}
      />
    </S.Container>
  );
}
