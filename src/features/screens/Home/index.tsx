import React from "react";
import * as S from "./styles";

import { Input } from "@global/components/Input";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ActivityIndicator, StatusBar } from "react-native";
import Text from "@global/components/Text";

import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Spacer } from "@global/components/Spacer";
import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "@global/config/getPopularMovies";

export default function Home() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['PopularMovies'],
    queryFn: getPopularMovies,
  });

  console.log(data);

  return (
    <S.Container>
      <StatusBar barStyle="default" backgroundColor={"#121011"} />
      <S.Header>
        <S.Info>
          <Text variant="Inter_600SemiBold" color="WHITE" fontSize={16}>
            Olá, Carlos
          </Text>
        </S.Info>

        <S.Buttons>
          <S.Button>
            <FontAwesome name="search" size={24} color="#FFFF" />
          </S.Button>

          <Spacer width={13} />

          <S.Button>
            <FontAwesome5 name="user" size={24} color="#FFFF" />
          </S.Button>
        </S.Buttons>
      </S.Header>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text variant="Inter_600SemiBold" fontSize={16} color="WHITE">
          Popular
        </Text>
      )}
    </S.Container>
  );
}
