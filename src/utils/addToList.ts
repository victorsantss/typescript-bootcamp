import inquirer from "inquirer";
import { GlobalVars, runMenu } from "..";
import addFilms from "./addFilms";
import { addToListQuestion, users } from "./questionsAndOptions";

export async function addToList() {
  try {
    const chooseMovieAnswer = await inquirer.prompt(addToListQuestion);
    let moviesIds = chooseMovieAnswer.option
      .split(",")
      .map((id: string) => parseInt(id));

    users[GlobalVars.loggedUserId] = addFilms(
      users[GlobalVars.loggedUserId],
      GlobalVars.movies,
      ...moviesIds
    );
    console.log("Filmes adicionados a lista com sucesso");
  } catch {
    console.log("Erro ao adicionar filmes para a lista");
  } finally {
    runMenu();
  }
}
