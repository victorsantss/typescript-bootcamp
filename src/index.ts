import inquirer from "inquirer";
import MenuOptions from "./interfaces/MenuOptions";
import Movie from "./interfaces/Movie";
import User from "./interfaces/User";
import MovieService from "./services/MovieService";
import addFilms from "./utils/addFilms";
import calculateMoviesAverage from "./utils/calculateMoviesAverage";

const users: User[] = [
  {
    id: 1,
    name: "Victor Santos",
    age: 24,
    myList: [],
  },
  {
    id: 2,
    name: "Bruno Almeida",
    age: 15,
    myList: [],
  },
  {
    id: 3,
    name: "Julia Silva",
    age: 16,
    myList: [],
  },
];

const menuOptions: MenuOptions[] = [
  {
    id: 1,
    message: "Avaliar Filme",
  },
  {
    id: 2,
    message: "Mostrar com média",
  },
  {
    id: 3,
    message: "Adicionar filmes a lista",
  },
  {
    id: 4,
    message: "Trocar Usuário",
  },
  {
    id: 0,
    message: "Sair",
  },
];

const chooseUserQuestion = [
  {
    type: "number",
    name: "option",
    message: `Digite o código de usuário: 
    ${users.map((users) => "\n" + users.id + " - " + users.name).join("")}`,
  },
];

const menuQuestion = [
  {
    type: "number",
    name: "option",
    message: `Digite uma opção: 
    ${menuOptions
      .map((menuOptions) => "\n" + menuOptions.id + "-" + menuOptions.message)
      .join("")}`,
  },
];

const chooseMovieQuestion = [
  {
    type: "number",
    name: "option",
    message: "Qual filme?",
  },
];

const rateQuestion = [
  {
    type: "list",
    name: "option",
    message: "Qual avaliacao de 0 a 5?",
    choices: [0, 1, 2, 3, 4, 5],
  },
];

const addToListQuestion = [
  {
    type: "input",
    name: "option",
    message:
      "Digite o(s) id(s) do(s) filme(s) que deseja adicionar: (ex: 1,2,3)",
  },
];

const possibleAnswers = {
  RATE_MOVIE: 1,
  SHOW_WITH_AVERAGE: 2,
  ADD_TO_LIST: 3,
  CHOOSE_USER: 4,
  EXIT: 0,
};

/*
    * Adicionar menu:
    Baixar filmes (Implementado) - OK
    Logar usuário (Escolher por id) - OK
    Dar avaliação (Escolher um filme e avaliacao) - OK
    Adicionar a lista do usuário
    Listar filmes com média (usar o calculateMoviesWith Average)
*/

let movies: Movie[] = [];
let loggedUserId: number;

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
      runMenu();
    } else {
      console.log("Filme não encontrado");
      runMenu();
    }
  } catch {
    console.log("Erro ao avaliar filme");
  }
}

function showWithAverage() {
  const moviesWithAverage = calculateMoviesAverage(movies);
  moviesWithAverage.map((movie) =>
    console.log(`${movie.name} - Média: ${movie.average}`)
  );
  runMenu();
}

async function addToList() {
  const chooseMovieAnswer = await inquirer.prompt(addToListQuestion);
  let moviesIds = chooseMovieAnswer.option
    .split(",")
    .map((id: string) => parseInt(id));

  users[loggedUserId] = addFilms(users[loggedUserId], movies, ...moviesIds);
  console.log(users[loggedUserId]);
}

async function runMenu() {
  const answers = await inquirer.prompt(menuQuestion);

  switch (answers.option) {
    case possibleAnswers.RATE_MOVIE:
      rateMovie();
      break;
    case possibleAnswers.SHOW_WITH_AVERAGE:
      showWithAverage();
      break;
    case possibleAnswers.ADD_TO_LIST:
      addToList();
      break;
    case possibleAnswers.CHOOSE_USER:
      chooseUser();
      break;
    case possibleAnswers.EXIT:
      break;
  }
}

chooseUser();
