import loadMovies from "../utils/loadMovies";
import BaseService from "./BaseService";

class MovieService extends BaseService {
  constructor() {
    super();
  }
  async listAll() {
    const result = await this.getInstance().get("/movies");
    const { data } = result.data;
    const movies = data;

    return loadMovies(movies);
  }
}

export default MovieService;
