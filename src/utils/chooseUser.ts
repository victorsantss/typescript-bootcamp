import inquirer from "inquirer";
import { GlobalVars } from "..";

import { downloadMovies } from "./downloadMovies";
import { chooseUserQuestion, users } from "./questionsAndOptions";

export async function chooseUser() {
  try {
    const selectUser = await inquirer.prompt(chooseUserQuestion);
    let userSelectedId = selectUser.option;
    GlobalVars.loggedUserId = users.findIndex(
      (users) => users.id === userSelectedId
    );
    console.log(`Usuário selecionado: ${users[GlobalVars.loggedUserId].name}`);
    downloadMovies();
  } catch {
    console.log("Usuário não encontrado");
  }
}
