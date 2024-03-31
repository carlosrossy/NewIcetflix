import { Movie, PaginatedResponse } from "@global/models/movie";
import api from "./api";

export async function getNowPlayingMovies(): Promise<Movie[]> {
  try {
    const { data } = await api.get<PaginatedResponse<Movie>>(`/movie/now_playing?region=BR`);
    return data.results;
  } catch (error) {
    console.error("Error fetching lançamentos movies:", error);
    return [];
  }
}