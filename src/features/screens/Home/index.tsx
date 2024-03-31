import React from "react";
import * as S from "./styles";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StatusBar,
} from "react-native";
import Text from "@global/components/Text";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Spacer } from "@global/components/Spacer";
import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "@global/config/getPopularMovies";
import { getNowPlayingMovies } from "@global/config/getNowPlayingMovies";
import { MovieItem } from "@global/components/Movie";
import { getTopRated } from "@global/config/getTopRated";
import { getPopularSeries } from "@global/config/getPopularSeries";
import { useAuth } from "@global/context/auth";

export default function Home() {
  const {User} = useAuth();
  const {
    data: popularMovies,
    isLoading: isLoadingPopularMovies,
    isError: isErrorPopularMovies,
    error: errorPopularMovies,
  } = useQuery({
    queryKey: ["PopularMovies"],
    queryFn: getPopularMovies,
  });

  const {
    data: nowPlayingMovies,
    isLoading: isLoadingNowPlayingMovies,
    isError: isErrorNowPlayingMovies,
    error: errorNowPlayingMovies,
  } = useQuery({
    queryKey: ["NowPlaying"],
    queryFn: getNowPlayingMovies,
  });

  const {
    data: topRatedMovies,
    isLoading: isLoadingTopRatedMovies,
    isError: isErrorTopRatedMovies,
    error: errorTopRatedMovies,
  } = useQuery({
    queryKey: ["TopRated"],
    queryFn: getTopRated,
  });

  const {
    data: popularSeries,
    isLoading: isLoadingPopularSeries,
    isError: isErrorPopularSeries,
    error: errorPopularSeries,
  } = useQuery({
    queryKey: ["popularSeries"],
    queryFn: getPopularSeries,
  });

  return (
    <ScrollView style={{ flex: 1 }}>
      <S.Container>
        <StatusBar barStyle="default" backgroundColor={"#121011"} />
        <S.Header>
          <S.Info>
            <Text variant="Inter_600SemiBold" color="WHITE" fontSize={16}>
              Olá, {User?.name}
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

        {isLoadingPopularMovies ||
        isLoadingNowPlayingMovies ||
        isLoadingTopRatedMovies ||
        isLoadingPopularSeries ? (
          <ActivityIndicator size="large" color="#Ffff" />
        ) : (
          <>
            <Spacer height={20} />

            <Text variant="Inter_600SemiBold" fontSize={16} color="WHITE">
              Lançamentos no brasil
            </Text>
            <Spacer height={15} />
            <FlatList
              data={nowPlayingMovies}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <MovieItem movie={item} onPress={(id) => console.log(id)} />
              )}
              keyExtractor={(item) => item.id.toString()}
            />

            <Spacer height={10} />

            <Text variant="Inter_600SemiBold" fontSize={16} color="WHITE">
              Filmes mais bem avaliados
            </Text>
            <Spacer height={15} />
            <FlatList
              data={topRatedMovies}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <MovieItem movie={item} onPress={(id) => console.log(id)} />
              )}
              keyExtractor={(item) => item.id.toString()}
            />

            <Spacer height={10} />

            <Text variant="Inter_600SemiBold" fontSize={16} color="WHITE">
              Filmes Populares
            </Text>
            <Spacer height={15} />
            <FlatList
              data={popularMovies}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <MovieItem movie={item} onPress={(id) => console.log(id)} />
              )}
              keyExtractor={(item) => item.id.toString()}
            />

            <Spacer height={10} />

            <Text variant="Inter_600SemiBold" fontSize={16} color="WHITE">
              Serie Pouplares
            </Text>
            <Spacer height={15} />
            <FlatList
              data={popularSeries}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <MovieItem movie={item} onPress={(id) => console.log(id)} />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </>
        )}
      </S.Container>
    </ScrollView>
  );
}
