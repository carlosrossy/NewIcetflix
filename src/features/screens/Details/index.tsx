import React from "react";
import * as S from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  ActivityIndicator,
  Linking,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import {
  getCreditDetails,
  getMovieDetails,
  getVideo,
  getWatchDetails,
} from "@global/config/getDetails";

import Text from "@global/components/Text";
import { Spacer } from "@global/components/Spacer";

import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AppScreenNavigationProp } from "@global/routes/app.routes";

interface IParamsRoutes {
  id: number;
}

export default function Details() {
  const navigation = useNavigation<AppScreenNavigationProp>();
  const route = useRoute();
  const { id } = route.params as IParamsRoutes;

  const {
    data: movieDetails,
    isLoading: isLoadingMovie,
    isError: isErrorMovie,
  } = useQuery({
    queryKey: ["movieDetails"],
    queryFn: () => getMovieDetails(id),
  });

  const {
    data: creditsDetails,
    isLoading: isLoadingCredits,
    isError: isErrorCredits,
  } = useQuery({
    queryKey: ["movieCredits"],
    queryFn: () => getCreditDetails(id),
  });

  const {
    data: watchDetails,
    isLoading: isLoadingWatch,
    isError: isErrorWatch,
  } = useQuery({
    queryKey: ["movieWatch"],
    queryFn: () => getWatchDetails(id),
  });

  const {
    data: videosDetails,
    isLoading: isLoadingvideos,
    isError: isErrorvideos,
  } = useQuery({
    queryKey: ["movieVideos"],
    queryFn: () => getVideo(id),
  });

  if (isErrorMovie || isErrorCredits || isErrorWatch) {
    return (
      <Text variant="Inter_400Regular" color="WHITE">
        Erro ao buscar os detalhes
      </Text>
    );
  }

  const flatrateProviders = watchDetails?.results?.BR?.flatrate;

  const handlePress = () => {
    let videoKey;

    const trailerDublado = videosDetails?.results.find(
      (video: any) => video.name === "Trailer Oficial [Dublado]"
    );

    if (trailerDublado) {
      videoKey = trailerDublado.key;
    } else {
      videoKey = videosDetails?.results[0]?.key;
    }

    if (videoKey) {
      const youtubeUrl = `https://www.youtube.com/watch?v=${videoKey}`;
      Linking.openURL(youtubeUrl);
    }
  };

  return (
    <S.Container>
      {isLoadingMovie ||
      isLoadingCredits ||
      isLoadingWatch ||
      isLoadingvideos ? (
        <ActivityIndicator size="large" color="#Ffff" />
      ) : (
        <>
          <S.MovieImage
            source={{
              uri: `https://image.tmdb.org/t/p/original/${movieDetails?.poster_path}`,
            }}
          />

          <S.Buttons>
            <S.Button onPress={navigation.goBack}>
              <Ionicons name="chevron-back" size={24} color="#FFFF" />
            </S.Button>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <S.Button
                onPress={() => handlePress(videosDetails?.results[0]?.key)}
              >
                <FontAwesome5 name="play" size={20} color="#FFFF" />
              </S.Button>
              <Spacer width={10} />
              <S.Button>
                <FontAwesome name="heart-o" size={24} color="#FFFF" />
              </S.Button>
            </View>
          </S.Buttons>

          <S.Details>
            <Text variant="Inter_600SemiBold" color="WHITE" fontSize={14}>
              {movieDetails?.title}{" "}
              {movieDetails?.release_date &&
                `(${new Date(movieDetails.release_date).getFullYear()})`}
            </Text>

            <Text variant="Inter_400Regular" color="WHITE">
              Lançamento:{" "}
              {movieDetails?.release_date.split("-").reverse().join("/")}
            </Text>

            <Spacer height={8} />

            <Text variant="Inter_400Regular" color="WHITE">
              Duração: {Math.floor(movieDetails?.runtime! / 60)}h{""}
              {movieDetails?.runtime! % 60}min
            </Text>

            <Spacer height={8} />

            <Spacer height={8} />

            <Text variant="Inter_400Regular" color="WHITE">
              Classificação: {Number(movieDetails?.vote_average).toFixed(1)}
            </Text>

            <Spacer height={8} />

            <Text variant="Inter_400Regular" color="WHITE">
              Gêneros:{" "}
              {movieDetails?.genres.map((genre) => genre.name).join(", ")}
            </Text>

            <Spacer height={8} />
            <Text variant="Inter_400Regular" color="WHITE" textAlign="justify">
              Sinopse: {movieDetails?.overview}
            </Text>
            <Spacer height={8} />
            <Text variant="Inter_400Regular" color="WHITE">
              Elenco:
            </Text>
            <Spacer height={10} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {creditsDetails?.cast.map((actor) => (
                <S.ActorContainer key={actor.id}>
                  <S.CastImage
                    source={{
                      uri: `https://image.tmdb.org/t/p/original/${actor.profile_path}`,
                    }}
                  />
                  <Text
                    variant="Inter_400Regular"
                    color="WHITE"
                    fontSize={12}
                    textAlign="center"
                    textAlignVertical="center"
                    numberOfLines={2}
                  >
                    {actor.name.length > 12
                      ? actor.name.replace(" ", "\n")
                      : actor.name}
                  </Text>
                  <Text
                    variant="Inter_400Regular"
                    color="WHITE"
                    fontSize={10}
                    textAlign="center"
                    textAlignVertical="center"
                  >
                    {actor.character.length > 18
                      ? actor.character.replace(" ", "\n")
                      : actor.character}
                  </Text>
                </S.ActorContainer>
              ))}
            </ScrollView>
            <Spacer height={8} />
            <Text variant="Inter_400Regular" color="WHITE">
              Onde assistir:
            </Text>

            <Spacer height={10} />

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {flatrateProviders && flatrateProviders.length > 0 ? (
                flatrateProviders.map((provider) => (
                  <S.ActorContainer key={provider.provider_id}>
                    <S.CastImage
                      source={{
                        uri: `https://image.tmdb.org/t/p/original/${provider.logo_path}`,
                      }}
                    />
                    <Text
                      variant="Inter_400Regular"
                      color="WHITE"
                      textAlign="center"
                      alignItems="center"
                    >
                      {provider.provider_name.replace(" ", "\n")}
                    </Text>
                  </S.ActorContainer>
                ))
              ) : (
                <Text variant="Inter_400Regular" color="WHITE">
                  Ainda não consta em nenhum catálogo!
                </Text>
              )}
            </ScrollView>
          </S.Details>
        </>
      )}
    </S.Container>
  );
}
