import inquirer from "inquirer";
import { GlobalVars, runMenu } from "..";
import { chooseMovieQuestion, rateQuestion } from "./questionsAndOptions";

export async function rateMovie() {
  GlobalVars.movies.map((movie) => console.log(`${movie.id} - ${movie.name}`));

  try {
    const chooseMovieAnswers = await inquirer.prompt(chooseMovieQuestion);
    let movieId = chooseMovieAnswers.option;
    let movieIndex = GlobalVars.movies.findIndex(
      (movie) => movie.id === movieId
    );
    if (movieIndex !== -1) {
      let movieSelected = GlobalVars.movies[movieIndex];
      const rateAnswers = await inquirer.prompt(rateQuestion);
      let rate = rateAnswers.option;
      movieSelected.ratings.push(rate);
    } else {
      console.log("Filme não encontrado");
    }
  } catch {
    console.log("Erro ao avaliar filme");
  } finally {
    runMenu();
  }
}
