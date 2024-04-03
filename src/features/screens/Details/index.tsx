import React, { useEffect, useState } from "react";
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
import { FontAwesome } from "@expo/vector-icons";
import { AppScreenNavigationProp } from "@global/routes/app.routes";
import Toast from "react-native-toast-message";
import { CardCast } from "@global/components/CardCast";
import { useFavorite } from "@global/context/favorite";
import { useAuth } from "@global/context/auth";

interface IParamsRoutes {
  id: number;
}

export default function Details() {
  const navigation = useNavigation<AppScreenNavigationProp>();
  const route = useRoute();
  const { id } = route.params as IParamsRoutes;
  const [isFavorite, setIsFavorite] = useState(false);
  const { addFavoriteMovie, removeFavoriteMovie, favoriteMovies, getAllFavoriteMovies } = useFavorite();
  const { User } = useAuth();

  const {
    data: movieDetails,
    isLoading: isLoadingMovie,
    isError: isErrorMovie,
  } = useQuery({
    queryKey: [`movieDetails_${id}`],
    queryFn: () => getMovieDetails(id),
  });

  const {
    data: creditsDetails,
    isLoading: isLoadingCredits,
    isError: isErrorCredits,
  } = useQuery({
    queryKey: [`movieCredits_${id}`],
    queryFn: () => getCreditDetails(id),
  });

  const {
    data: watchDetails,
    isLoading: isLoadingWatch,
    isError: isErrorWatch,
  } = useQuery({
    queryKey: [`movieWatch_${id}`],
    queryFn: () => getWatchDetails(id),
  });

  const {
    data: videosDetails,
    isLoading: isLoadingvideos,
    isError: isErrorvideos,
  } = useQuery({
    queryKey: [`movieVideos_${id}`],
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

  const showTrailerToast = () => {
    Toast.show({
      type: "info",
      text1: "Trailer não disponível",
      text2: "Não há trailer disponível para este filme.",
      visibilityTime: 3000,
    });
  };

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
    } else {
      showTrailerToast();
    }
  };

  const allDetails = {
    id: movieDetails?.id,
    title: movieDetails?.title,
    overview: movieDetails?.overview,
    releaseDate: movieDetails?.release_date,
    voteAverage: movieDetails?.vote_average,
    runtime: movieDetails?.runtime,
    genres: movieDetails?.genres,
    backdropPath: movieDetails?.backdrop_path,
    cast: creditsDetails?.cast,
    providers: watchDetails?.results,
    videosDetails: videosDetails,
  };

  useEffect(() => {
    const isMovieFavorite = favoriteMovies.some(
      (movie) => movie.id === movieDetails?.id
    );
    setIsFavorite(isMovieFavorite);
  }, [favoriteMovies]);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        const userId = User?.id!;
        const movies = await getAllFavoriteMovies(userId);
        const isMovieFavorite = movies.some((favMovie) => favMovie.id === movieDetails?.id);
        setIsFavorite(isMovieFavorite);
      } catch (error) {
        console.error("Erro ao obter filmes favoritos:", error);
      }
    };

    fetchFavoriteMovies();
  }, [getAllFavoriteMovies, movieDetails?.id]); 


  const handleHeartClick = () => {
    if (isFavorite) {
      removeFavoriteMovie(movieDetails?.id.toString()!, User?.id!);
    } else {
      addFavoriteMovie(movieDetails?.id.toString()!, allDetails, User?.id!);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#121011" }}>
      <S.Container>
        {isLoadingMovie ||
        isLoadingCredits ||
        isLoadingWatch ||
        isLoadingvideos ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator size="large" color="#Ffff" />
          </View>
        ) : (
          <>
            <S.MovieImage
              source={{
                uri: `https://image.tmdb.org/t/p/original/${movieDetails?.backdrop_path}`,
              }}
            />

            <S.Buttons>
              <S.Button onPress={navigation.goBack}>
                <Ionicons name="chevron-back" size={24} color="#FFFF" />
              </S.Button>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <S.Button onPress={handleHeartClick}>
                  <FontAwesome
                    name={isFavorite ? "heart" : "heart-o"}
                    size={24}
                    color={isFavorite ? "#56AB2F" : "#FFFF"}
                  />
                </S.Button>
              </View>
            </S.Buttons>

            <S.Details>
              <Text variant="Inter_600SemiBold" color="WHITE" fontSize={18}>
                {movieDetails?.title}{" "}
                {movieDetails?.release_date &&
                  `(${new Date(movieDetails.release_date).getFullYear()})`}
              </Text>

              <Spacer height={8} />

              <S.Info>
                <S.Row>
                  <S.Star>
                    <FontAwesome name="star" size={16} color="#41403E" />

                    <Spacer width={5} />

                    <Text variant="Inter_600SemiBold" color="SECONDARY">
                      {Number(movieDetails?.vote_average).toFixed(1)}
                    </Text>
                  </S.Star>

                  <Spacer width={8} />

                  <S.Row>
                    <FontAwesome name="clock-o" size={16} color="white" />

                    <Spacer width={5} />

                    <Text variant="Inter_400Regular" color="WHITE">
                      {Math.floor(movieDetails?.runtime! / 60)}h{""}
                      {movieDetails?.runtime! % 60}min
                    </Text>
                  </S.Row>
                </S.Row>

                <S.ButtonTeaser
                  onPress={() => handlePress(videosDetails?.results[0]?.key)}
                >
                  <FontAwesome name="video-camera" size={20} color={"#FFFF"} />

                  <Spacer width={5} />

                  <Text
                    variant="Inter_600SemiBold"
                    color="WHITE"
                    textAlign="justify"
                  >
                    Ver trailer
                  </Text>
                </S.ButtonTeaser>
              </S.Info>

              <Spacer height={15} />

              <Text
                variant="Inter_600SemiBold"
                color="WHITE"
                textAlign="justify"
                fontSize={18}
              >
                Gênero
              </Text>

              <Spacer height={6} />

              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {movieDetails?.genres.map((genre, index) => (
                  <S.Genre
                    key={genre.id}
                    style={{
                      marginBottom: 8,
                      marginRight: index % 1 === 0 ? 5 : 0,
                    }}
                  >
                    <Text variant="Inter_600SemiBold" color="SECONDARY">
                      {genre.name}
                    </Text>
                  </S.Genre>
                ))}
              </View>

              <Spacer height={10} />

              <Text
                variant="Inter_600SemiBold"
                color="WHITE"
                textAlign="justify"
                fontSize={18}
              >
                Sinopse
              </Text>

              <Spacer height={8} />

              <Text
                variant="Inter_400Regular"
                color="WHITE"
                textAlign="justify"
              >
                {movieDetails?.overview}
              </Text>
              <Spacer height={8} />

              <Text
                variant="Inter_600SemiBold"
                color="WHITE"
                textAlign="justify"
                fontSize={18}
              >
                Elenco
              </Text>

              <Spacer height={8} />

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {creditsDetails?.cast.map((actor) => (
                  <S.ActorContainer key={actor.id}>
                    <CardCast actorDetails={actor} />
                  </S.ActorContainer>
                ))}
              </ScrollView>

              <Spacer height={10} />

              <Text
                variant="Inter_600SemiBold"
                color="WHITE"
                textAlign="justify"
                fontSize={18}
              >
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
                  <Text
                    variant="Inter_400Regular"
                    color="WHITE"
                    textAlign="center"
                    alignItems="center"
                  >
                    Ainda não consta em nenhum catálogo!
                  </Text>
                )}
              </ScrollView>
            </S.Details>
          </>
        )}
      </S.Container>
    </ScrollView>
  );
}
