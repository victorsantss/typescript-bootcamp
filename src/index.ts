import inquirer from "inquirer";
import MenuChoices from "./enums/MenuChoices";
import Movie from "./interfaces/Movie";
import MovieService from "./services/MovieService";
import addFilms from "./utils/addFilms";
import calculateMoviesAverage from "./utils/calculateMoviesAverage";
import {
  addToListQuestion,
  chooseMovieQuestion,
  chooseUserQuestion,
  menuQuestion,
  rateQuestion,
  users,
} from "./utils/questionsAndOptions";

let movies: Movie[] = [];
let loggedUserId: number;

async function initApplication() {
  chooseUser();
}

async function chooseUser() {
  try {
    const selectUser = await inquirer.prompt(chooseUserQuestion);
    let userSelectedId = selectUser.option;
    loggedUserId = users.findIndex((users) => users.id === userSelectedId);
    console.log(`Usuário selecionado: ${users[loggedUserId].name}`);
    downloadMovies();
  } catch {
    console.log("Usuário não encontrado");
  }
}

async function downloadMovies() {
  const movieService = new MovieService();
  try {
    movies = await movieService.listAll();
    console.log("Filmes Baixados com sucesso");
    runMenu();
  } catch {
    console.log("Erro ao baixar filmes");
  }
}

async function rateMovie() {
  movies.map((movie) => console.log(`${movie.id} - ${movie.name}`));

  try {
    const chooseMovieAnswers = await inquirer.prompt(chooseMovieQuestion);
    let movieId = chooseMovieAnswers.option;
    let movieIndex = movies.findIndex((movie) => movie.id === movieId);
    if (movieIndex !== -1) {
      let movieSelected = movies[movieIndex];
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

function showWithAverage() {
  try {
    const moviesWithAverage = calculateMoviesAverage(movies);
    moviesWithAverage.map((movie) =>
      console.log(`${movie.name} - Média: ${movie.average}`)
    );
  } catch {
    console.log("Erro ao calcular média");
  } finally {
    runMenu();
  }
}

async function addToList() {
  try {
    const chooseMovieAnswer = await inquirer.prompt(addToListQuestion);
    let moviesIds = chooseMovieAnswer.option
      .split(",")
      .map((id: string) => parseInt(id));

    users[loggedUserId] = addFilms(users[loggedUserId], movies, ...moviesIds);
    console.log("Filmes adicionados a lista com sucesso");
  } catch {
    console.log("Erro ao adicionar filmes para a lista");
  } finally {
    runMenu();
  }
}

async function runMenu() {
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

initApplication();
