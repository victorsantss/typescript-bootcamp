import MenuOptions from "../interfaces/MenuOptions";
import User from "../interfaces/User";

export const users: User[] = [
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

export const chooseUserQuestion = [
  {
    type: "number",
    name: "option",
    message: `Digite o código de usuário: 
    ${users.map((users) => "\n" + users.id + " - " + users.name).join("")}`,
  },
];

export const menuQuestion = [
  {
    type: "number",
    name: "option",
    message: `Digite uma opção: 
    ${menuOptions
      .map((menuOptions) => "\n" + menuOptions.id + "-" + menuOptions.message)
      .join("")}`,
  },
];

export const chooseMovieQuestion = [
  {
    type: "number",
    name: "option",
    message: "Qual filme?",
  },
];

export const rateQuestion = [
  {
    type: "list",
    name: "option",
    message: "Qual avaliacao de 0 a 5?",
    choices: [0, 1, 2, 3, 4, 5],
  },
];

export const addToListQuestion = [
  {
    type: "input",
    name: "option",
    message:
      "Digite o(s) id(s) do(s) filme(s) que deseja adicionar: (ex: 1, 2, 3)",
  },
];
