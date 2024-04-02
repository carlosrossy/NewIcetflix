import React, { useEffect, useState } from "react";
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

import ModalCamera from "@global/components/ModalCamera";

import Camera from "@assets/Camera.svg";

import * as ImagePicker from "expo-image-picker";

export const Schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
});

export default function UpdateProfile() {
  const navigation = useNavigation<AppScreenNavigationProp>();
  const [showModal, setShowModal] = useState(false);
  const { isLoading, updateUser, User } = useAuth();
  const [image, setImage] = useState(User?.imageUrl || "");

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
    defaultValues: {
      name: User?.name || "",
    },
  });

  useEffect(() => {
    setValue("name", User?.name || "");
  }, [User?.name, setValue]);

  useEffect(() => {
    if (User?.imageUrl) {
      setImage(User.imageUrl);
    }
  }, [User?.imageUrl]);

  function OnSubmitUpdateProfile(data: { name: string }) {
    const { name } = data;

    console.log(name)
    console.log(image)
    console.log(User?.id!)
    updateUser(User?.id!, name, image);
  }

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

  const closeModal = () => {
    setShowModal(false);
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
    <S.Container>
      <S.ContainerButton>
        <S.Button onPress={navigation.goBack}>
          <Ionicons name="chevron-back" size={24} color="#FFFF" />
        </S.Button>
      </S.ContainerButton>

      <Spacer height={20} />

      <S.ContainerPhoto>
        <S.CameraButton onPress={openModal}>
          <Camera height={60} width={60} />
        </S.CameraButton>
        {image ? <S.Image source={{ uri: image }} /> : <Camera />}
      </S.ContainerPhoto>

      <Spacer height={12} />

      <Controller
        control={control}
        name="name"
        rules={{ required: "Nome é obrigatório" }}
        render={({ field: { value, onChange } }) => (
          <Input
            onChangeText={onChange}
            title="Nome"
            value={value}
            autoCapitalize={"none"}
            errors={errors?.name}
            type="user"
          />
        )}
      />

      <Spacer height={12} />

      <Button
        title="Alterar"
        onPress={handleSubmit(OnSubmitUpdateProfile)}
        disabled={isLoading}
        activeLoad={isLoading}
      />

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
  );
}
