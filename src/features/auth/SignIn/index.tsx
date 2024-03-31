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

const schema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().required("Senha é obrigatório"),
});

export default function SignIn() {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <S.Container>
      <StatusBar barStyle="default" backgroundColor={"#121011"} />

      <S.Form>
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

        <S.Row>
          <S.CheckBoxContainer
            onPress={() => setToggleCheckBox((oldValue: boolean) => !oldValue)}
          >
            <S.CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={setToggleCheckBox}
              color="#56AB2F"
              style={{
                borderTopColor: "#5B5B58",
                borderBottomColor: "#5B5B58",
                borderEndColor: "#5B5B58",
                borderStartColor: "#5B5B58",
                marginTop: -3,
              }}
            />
            <Text
              variant="Inter_500Medium"
              color="GRAY"
              fontSize={12}
              marginLeft="sm"
            >
              Manter Conectado
            </Text>
          </S.CheckBoxContainer>

          <TouchableOpacity>
            <Text variant="Inter_500Medium" color="GRAY" fontSize={12}>
              Esqueci minha senha
            </Text>
          </TouchableOpacity>
        </S.Row>
      </S.Form>

      <S.Footer>
        <Button
          title="ENTRAR"
          //   onPress={handleSubmit(handleSingIn)}
          //   activeLoad={islogin}
        />

        <Spacer height={20} />

        <S.TextRow>
          <Text variant="Inter_500Medium" color="GRAY">
            Não tem uma conta?{" "}
          </Text>
          <TouchableOpacity>
            <Text variant="Inter_500Medium" color="PRIMARY">
              Inscrever-se
            </Text>
          </TouchableOpacity>
        </S.TextRow>
      </S.Footer>
    </S.Container>
  );
}
