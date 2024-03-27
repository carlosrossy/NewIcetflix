import React from "react";
import * as S from "./styles";

import { Input } from "@global/components/Input";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { StatusBar } from "react-native";

const formSchema = yup.object().shape({
  email: yup
    .string()
    .email("Formato de e-mail inválido")
    .required("Email é obrigatório"),
});

export default function Home() {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  return (
    <S.Container>
      <StatusBar barStyle="light-content" backgroundColor={"#121011"} />
      <Controller
        control={control}
        name="email"
        rules={{ required: "email é obrigatório" }}
        render={({ field: { value, onChange } }) => (
          <Input
            title="Email"
            onChangeText={onChange}
            value={value}
            placeholder="Email"
            autoCapitalize={"none"}
            errors={errors?.email}
            type="email"
          />
        )}
      />
    </S.Container>
  );
}
