import { GlobalVars, runMenu } from "..";
import MovieService from "../services/MovieService";

export async function downloadMovies() {
  const movieService = new MovieService();
  try {
    GlobalVars.movies = await movieService.listAll();
    console.log("Filmes Baixados com sucesso");
    runMenu();
  } catch {
    console.log("Erro ao baixar filmes");
  }
}
