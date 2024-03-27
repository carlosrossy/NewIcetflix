import { Movie, PaginatedResponse } from "@global/models/movie";
import api from "./api";

export async function getPopularMovies(): Promise<Movie[]> {
  try {
    const { data } = await api.get<PaginatedResponse<Movie>>(`/popular`);
    return data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
}
