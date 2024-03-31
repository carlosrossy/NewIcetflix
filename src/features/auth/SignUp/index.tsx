import React, { useState } from "react";
import * as S from "./styles";

import { ScrollView, StatusBar, TouchableOpacity } from "react-native";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { MaterialIcons } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";

import { Input } from "@global/components/Input";
import { Spacer } from "@global/components/Spacer";
import Text from "@global/components/Text";
import Button from "@global/components/Button";
import { useAuth } from "@global/context/auth";
import { useNavigation } from "@react-navigation/native";
import { AuthScreenNavigationProp } from "@global/routes/auth.routes";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import theme from "@global/styles/theme";
import ModalCamera from "@global/components/ModalCamera";

import Camera from "@assets/Camera.svg";

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
  const [showModal, setShowModal] = useState(false);
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

  const closeModal = () => {
    setShowModal(false);
  };

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Desculpe, precisamos das permissões da câmera para fazer isso funcionar!"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result?.assets[0].uri);
      setShowModal(false);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const handleCameraCapture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Desculpe, precisamos das permissões da câmera para fazer isso funcionar!"
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result?.assets[0].uri);
      setShowModal(false);
    }
  };

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

        <Spacer height={40} />

        <S.Form>
          <S.View>
            <S.ContainerPhoto onPress={openModal}>
              {image ? <S.Image source={{ uri: image }} /> : <Camera />}
            </S.ContainerPhoto>
          </S.View>

          <Spacer height={12} />

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

        <Spacer height={20} />

        <S.Footer>
          <Button
            title="Cadastrar"
            onPress={handleSubmit(handleSingUp)}
            activeLoad={isLoading}
          />

          <Spacer height={20} />

          <S.TextRow>
            <Text variant="Inter_500Medium" color="GRAY">
              Já possui uma conta?{" "}
            </Text>
            <TouchableOpacity onPress={navigation.goBack}>
              <Text variant="Inter_500Medium" color="PRIMARY">
                Entrar
              </Text>
            </TouchableOpacity>
          </S.TextRow>
        </S.Footer>

        <ModalCamera
          onClose={closeModal}
          visible={showModal}
          fontSizeTitle={20}
          title="Escolha sua foto de perfil"
          buttonText="Tirar foto"
          onPress={() => {
            handleCameraCapture();
            closeModal();
          }}
          buttonTextsecundary="Selecionar da Galeria"
          onPressSecundary={handleImagePicker}
          onPressTertiary={closeModal}
          textclose={true}
        />
      </S.Container>
    </KeyboardAwareScrollView>
  );
}
