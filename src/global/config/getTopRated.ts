import { Movie, PaginatedResponse } from "@global/models/movie";
import api from "./api";

export async function getTopRated(): Promise<Movie[]> {
  try {
    const { data } = await api.get<PaginatedResponse<Movie>>(`/movie/top_rated`);
    return data.results;
  } catch (error) {
    console.error("Error fetching top avaliações movies:", error);
    return [];
  }
}
