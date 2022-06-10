import inquirer from "inquirer";
import User from "./interfaces/User";
import MovieService from "./services/MovieService";

const user: User = {
  name: "Victor Santos",
  age: 17,
  myList: [],
};

const questions = [
  {
    type: "input",
    name: "option",
    message: "Digite uma opção: \n 1 - Baixar Filmes \n 2 - Sair",
  },
];

const chooseMovieQuestions = [
  {
    type: "input",
    name: "option",
    message: "Qual filme?",
  },
];

const rateQuestions = [
  {
    type: "input",
    name: "option",
    message: "Qual avaliacao de 0 a 5?",
  },
];

const possibleAnswers = {
  DOWNLOAD: "1",
  RATE_MOVIE: "2",
  EXIT: "3",
};

/*
    * Adicionar menu:
    Baixar filmes (Implementado)
    Logar usuário (Escolher por id)
    Dar avaliação (Escolher um filme e avaliacao)
    Listar filmes com média (usar o calculateMoviesWith Average)
*/

let movies = {};

async function run() {
  const answers = await inquirer.prompt(questions);

  const movieService = new MovieService();

  switch (answers.option) {
    case possibleAnswers.DOWNLOAD:
      movies = movieService.listAll();
      run();
      break;
    case possibleAnswers.RATE_MOVIE:
      let movieId;
      let rate;

      const chooseMovieAnswers = await inquirer.prompt(chooseMovieQuestions);
      movieId = chooseMovieAnswers.option;

      const rateAnswers = await inquirer.prompt(rateQuestions);
      rate = rateAnswers.option;

      run();
      break;
    case possibleAnswers.EXIT:
      break;
  }
}

run();
