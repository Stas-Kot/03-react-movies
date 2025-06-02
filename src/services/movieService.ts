import axios from "axios";
import type { Movie } from "../types/movie";

interface GetMoviesRes {
  results: Movie[];
}
const BASE_URL = "https://api.themoviedb.org/3/search/movie?query=";
const myKey = import.meta.env.VITE_TMDB_TOKEN;

export default async function fetchMovies(query: string) {
  const { data } = await axios.get<GetMoviesRes>(BASE_URL + query, {
    // params: {
    //   // твої параметри
    // },
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
    
    return data.results;
}
