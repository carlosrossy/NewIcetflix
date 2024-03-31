import { MovieDetails, SeriesDetails } from "@global/models/movie";
import api from "./api";

export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
  try {
    const { data } = await api.get<MovieDetails>(`/movie/${movieId}`);
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
}

export async function getSeriesDetails(
  seriesId: number
): Promise<SeriesDetails> {
  try {
    const { data } = await api.get<SeriesDetails>(`/tv/${seriesId}`);
    return data;
  } catch (error) {
    console.error("Error fetching series details:", error);
    throw error;
  }
}
