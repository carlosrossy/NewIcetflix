import {
  MovieCredits,
  MovieDetails,
  SeriesDetails,
  WatchMovie,
} from "@global/models/movie";
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

export async function getCreditDetails(movieId: number): Promise<MovieCredits> {
  try {
    const { data } = await api.get<MovieCredits>(`/movie/${movieId}/credits`);
    return data;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    throw error;
  }
}

export async function getWatchDetails(movieId: number): Promise<WatchMovie> {
  try {
    const { data } = await api.get<WatchMovie>(`/movie/${movieId}/watch/providers`);
    return data;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    throw error;
  }
}

export async function getVideo(movieId: number): Promise<WatchMovie> {
  try {
    const { data } = await api.get<WatchMovie>(`/movie/${movieId}/videos`);
    return data;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
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
