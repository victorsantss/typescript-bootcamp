import inquirer from "inquirer";
import MenuChoices from "./enums/MenuChoices";
import Movie from "./interfaces/Movie";
import MovieService from "./services/MovieService";
import addFilms from "./utils/addFilms";
import { addToList } from "./utils/addToList";
import calculateMoviesAverage from "./utils/calculateMoviesAverage";
import { chooseUser } from "./utils/chooseUser";
import {
  addToListQuestion,
  chooseMovieQuestion,
  chooseUserQuestion,
  menuQuestion,
  rateQuestion,
  users,
} from "./utils/questionsAndOptions";
import { rateMovie } from "./utils/rateMovie";
import { showWithAverage } from "./utils/showWithAverage";

export class GlobalVars {
  static movies: Movie[] = [];
  static loggedUserId: number = 0;
}

export async function runMenu() {
  const answers = await inquirer.prompt(menuQuestion);

  switch (answers.option) {
    case MenuChoices.RATE_MOVIE:
      rateMovie();
      break;
    case MenuChoices.SHOW_WITH_AVERAGE:
      showWithAverage();
      break;
    case MenuChoices.ADD_TO_LIST:
      addToList();
      break;
    case MenuChoices.CHOOSE_USER:
      chooseUser();
      break;
    case MenuChoices.EXIT:
      break;
  }
}

chooseUser();
