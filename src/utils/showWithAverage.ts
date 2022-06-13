import { GlobalVars, runMenu } from "..";
import calculateMoviesAverage from "./calculateMoviesAverage";

export function showWithAverage() {
  try {
    const moviesWithAverage = calculateMoviesAverage(GlobalVars.movies);
    moviesWithAverage.map((movie) =>
      console.log(`${movie.name} - Média: ${movie.average}`)
    );
  } catch {
    console.log("Erro ao calcular média");
  } finally {
    runMenu();
  }
}
