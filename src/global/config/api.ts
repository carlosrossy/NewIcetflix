import axios from "axios";

export const API_KEY = "48fd2f18dae36516242ea93fc15e7f58";
export const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OGZkMmYxOGRhZTM2NTE2MjQyZWE5M2ZjMTVlN2Y1OCIsInN1YiI6IjY1YzI3YzZhYTMzNjEyMDBlNjUzYWU3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bZDYOpVqpPtkzkBhaYYe1lImIIrP-EMhJaCUEx4gWrs";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie",
  params: {
    language: "pt-BR",
    api_key: API_KEY,
    token: API_TOKEN,
  },
});

export default api;
