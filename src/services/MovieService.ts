import loadMovies from "../utils/loadMovies";
import BaseService from "./BaseService";

interface MoviesFromApiDTO {
  id: number;
  title: string;
  directed_by: string;
  duration: number;
}

interface MoviesApiResponse {
  data: MoviesFromApiDTO[];
}

class MovieService extends BaseService {
  constructor() {
    super();
  }
  async listAll() {
    const result = await this.getInstance().get<MoviesApiResponse>("/movies");
    const { data } = result.data;
    const movies = data;

    return loadMovies(movies);
  }
}

export default MovieService;
