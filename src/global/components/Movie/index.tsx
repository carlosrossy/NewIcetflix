import React from "react";
import * as S from "./styles";
import Text from "@global/components/Text";
import { Spacer } from "../Spacer";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
}

interface Props {
  movie: Movie;
  onPress: (id: number) => void;
}

export function MovieItem({ movie, onPress }: Props) {
  const handlePress = () => {
    onPress(movie.id);
  };

  return (
    <S.Container onPress={handlePress}>
      <S.MovieImage
        source={{
          uri: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`,
        }}
      />
    </S.Container>
  );
}
