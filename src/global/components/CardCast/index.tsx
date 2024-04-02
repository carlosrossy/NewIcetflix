import React from "react";
import * as S from "./styles";
import Text from "@global/components/Text";
import { Spacer } from "../Spacer";
import { Linking } from "react-native";

interface ActorDetails {
  id: number;
  profile_path: string | null;
  name: string;
  character: string;
}

interface Props {
  actorDetails: ActorDetails;
}
export function CardCast({ actorDetails }: Props) {

  const handleActorClick = () => {
    Linking.openURL(`https://www.google.com/search?q=${actorDetails.name}`);
  };

  return (
    <S.Container onPress={handleActorClick}>
      <S.CastImage
        source={{
          uri: actorDetails.profile_path
            ? `https://image.tmdb.org/t/p/original/${actorDetails.profile_path}`
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png",
        }}
      />
      <S.Info>
        <Text
          variant="Inter_600SemiBold"
          color="SECONDARY"
          fontSize={13}
          textAlign="center"
          textAlignVertical="center"
          numberOfLines={2}
        >
          {actorDetails.name}
        </Text>
        <Text
          variant="Inter_400Regular"
          color="SECONDARY"
          fontSize={11}
          textAlign="center"
          textAlignVertical="center"
        >
          Personagem
        </Text>
        <Text
          variant="Inter_400Regular"
          color="SECONDARY"
          fontSize={11}
          textAlign="center"
          textAlignVertical="center"
        >
          {actorDetails.character}
        </Text>
      </S.Info>
    </S.Container>
  );
}
