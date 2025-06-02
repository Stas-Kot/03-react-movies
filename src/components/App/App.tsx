import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import type { Movie } from "../../types/movie";
import fetchMovies from "../../services/movieService";
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleMovieClick = (movie: Movie) => setSelectedMovie(movie);
  const closeModal = () => setSelectedMovie(null);

  const handleSubmit = async (query: string) => {
    try {
      setMovies([]);
      setIsLoading(true);
      setIsError(false);
      const moviesArr = await fetchMovies(query);
      if (moviesArr.length === 0) {
        toast.error("No movies found for your request.");
      }
      setMovies(moviesArr);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.app}>
      <div>
        <Toaster />
      </div>
      <SearchBar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleMovieClick} />
      )}
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal} />}
    </div>
  );
}

export default App;
