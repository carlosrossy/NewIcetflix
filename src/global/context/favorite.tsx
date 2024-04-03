import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import firestore from "@react-native-firebase/firestore";
import { WatchMovie } from "@global/models/movie";

export interface MovieDetailsContextData {
  id?: number;
  title?: string;
  overview?: string;
  release_date?: string;
  vote_average?: number;
  runtime?: number;
  genres?: Genre[];
  backdrop_path?: string;
  cast?: Cast[];
  providers?: WatchMovie[];
  videos?: Video[];
}

interface Cast {
  id?: number;
  name?: string;
  character?: string;
  profilePath?: string;
}

interface Genre {
  id?: number;
  name?: string;
}

interface Provider {
  provider_id?: number;
  logo_path?: string;
}

interface Video {
  name?: string;
  key?: string;
}

type FavoriteContextData = {
  favoriteMovies: MovieDetailsContextData[];
  addFavoriteMovie: (
    movieId: string,
    movieData: MovieDetailsContextData,
    userId: string
  ) => Promise<void>;
  removeFavoriteMovie: (movieId: string, userId: string) => Promise<void>;
  getAllFavoriteMovies: (userId: string) => Promise<MovieDetailsContextData[]>;
};

interface FavoriteProviderProps {
  children: ReactNode;
}

export const FavoriteContext = createContext({} as FavoriteContextData);

function FavoriteProvider({ children }: FavoriteProviderProps) {
  const [favoriteMovies, setFavoriteMovies] = useState<
    MovieDetailsContextData[]
  >([]);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("favorites")
      .doc(userId)
      .collection("movies")
      .onSnapshot((snapshot) => {
        const movies: MovieDetailsContextData[] = [];
        snapshot.forEach((doc) => {
          movies.push(doc.data() as MovieDetailsContextData);
        });
        setFavoriteMovies(movies);
      });

    return () => unsubscribe();
  }, []);

  const addFavoriteMovie = async (
    movieId: string,
    movieData: MovieDetailsContextData,
    userId: string
  ) => {
    try {
      await firestore()
        .collection("favorites")
        .doc(userId)
        .collection("movies")
        .doc(movieId)
        .set(movieData);

      setUserId(userId);
      console.log("Filme adicionado aos favoritos com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar filme aos favoritos:", error);
    }
  };

  const removeFavoriteMovie = async (movieId: string, userId: string) => {
    try {
      await firestore()
        .collection("favorites")
        .doc(userId)
        .collection("movies")
        .doc(movieId)
        .delete();

      setUserId(userId);

      console.log("Filme removido dos favoritos com sucesso!");
    } catch (error) {
      console.error("Erro ao remover filme dos favoritos:", error);
    }
  };

  const getAllFavoriteMovies = async (userId: string) => {
    try {
      const querySnapshot = await firestore()
        .collection("favorites")
        .doc(userId)
        .collection("movies")
        .get();

      const movies: MovieDetailsContextData[] = [];
      querySnapshot.forEach((doc) => {
        movies.push(doc.data() as MovieDetailsContextData);
      });
      return movies;
    } catch (error) {
      console.error("Erro ao obter todos os filmes favoritos:", error);
      return [];
    }
  };

  return (
    <FavoriteContext.Provider
      value={{
        favoriteMovies,
        addFavoriteMovie,
        removeFavoriteMovie,
        getAllFavoriteMovies,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

function useFavorite() {
  const context = useContext(FavoriteContext);
  return context;
}

export { FavoriteProvider, useFavorite };
