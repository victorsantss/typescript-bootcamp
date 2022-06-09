import Movie from "../interfaces/Movie";

interface MoviesFromApiDTO {
  id: number;
  title: string;
  duration: number;
  directedBy: string;
}

function loadMovies(moviesFromApi: MoviesFromApiDTO[]): Partial<Movie>[] {
  return moviesFromApi.map((movie) => ({
    id: movie.id,
    name: movie.title,
    durations: movie.duration,
    directedBy: movie.directedBy,
  }));
}

export default loadMovies;
