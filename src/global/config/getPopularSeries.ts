import { Movie, PaginatedResponse } from "@global/models/movie";
import api from "./api";

export async function getPopularSeries(): Promise<Movie[]> {
  try {
    const { data } = await api.get<PaginatedResponse<Movie>>(`/tv/popular`);
    return data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
}
