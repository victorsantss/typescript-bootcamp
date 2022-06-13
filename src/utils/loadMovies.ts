import Movie from "../interfaces/Movie";

interface MoviesFromApiDTO {
  id: number;
  title: string;
  duration: number;
  directed_by: string;
}

function loadMovies(data: MoviesFromApiDTO[]): Movie[] {
  return data.map((movie: MoviesFromApiDTO) => ({
    id: movie.id,
    name: movie.title,
    directed_by: movie.directed_by,
    duration: movie.duration,
    ratings: [],
  }));
}

export default loadMovies;
