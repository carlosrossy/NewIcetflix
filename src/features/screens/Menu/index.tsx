import React from "react";
import * as S from "./styles";
import { AppScreenNavigationProp } from "@global/routes/app.routes";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@global/context/auth";

import Text from "@global/components/Text";

import { Ionicons, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { Spacer } from "@global/components/Spacer";

export default function Menu() {
  const navigation = useNavigation<AppScreenNavigationProp>();
  const { User, SingOut } = useAuth();

  return (
    <S.Container>
      <S.ButtonContainer>
        <S.ButtonBack onPress={navigation.goBack}>
          <Ionicons name="chevron-back" size={24} color="#FFFF" />
        </S.ButtonBack>
      </S.ButtonContainer>

      <S.Info>
        {User?.imageUrl ? (
          <S.UserImage source={{ uri: User?.imageUrl }} />
        ) : (
          <S.Button>
            <FontAwesome5 name="user" size={50} color="#FFFF" />
          </S.Button>
        )}

        <Spacer height={10} />

        <Text variant="Inter_600SemiBold" color="WHITE" fontSize={22}>
          {User?.name}
        </Text>
      </S.Info>

      <Spacer height={20} />

      <S.Options>
        <S.OptionButton>
          <S.Row>
            <FontAwesome name="heart" size={24} color="#FFFF" />
            <Text
              variant="Inter_400Regular"
              color="WHITE"
              fontSize={16}
              marginLeft={"md"}
            >
              Favoritos
            </Text>
          </S.Row>

          <Ionicons name="chevron-forward" size={24} color="#FFFF" />
        </S.OptionButton>

        <S.OptionButton>
          <S.Row>
            <FontAwesome5 name="user-edit" size={24} color="#FFFF" />
            <Text
              variant="Inter_400Regular"
              color="WHITE"
              fontSize={16}
              marginLeft={"md"}
            >
              Editar Perfil
            </Text>
          </S.Row>

          <Ionicons name="chevron-forward" size={24} color="#FFFF" />
        </S.OptionButton>

        <S.OptionButton>
          <S.Row>
            <FontAwesome5 name="lock" size={24} color="#FFFF" />
            <Text
              variant="Inter_400Regular"
              color="WHITE"
              fontSize={16}
              marginLeft={"md"}
            >
              Alterar Senha
            </Text>
          </S.Row>

          <Ionicons name="chevron-forward" size={24} color="#FFFF" />
        </S.OptionButton>

        <S.OptionButton onPress={SingOut}>
          <S.Row>
            <FontAwesome5 name="sign-out-alt" size={24} color="#FFFF" />
            <Text
              variant="Inter_400Regular"
              color="WHITE"
              fontSize={16}
              marginLeft={"md"}
            >
              Logout
            </Text>
          </S.Row>

          <Ionicons name="chevron-forward" size={24} color="#FFFF" />
        </S.OptionButton>
      </S.Options>
    </S.Container>
  );
}
