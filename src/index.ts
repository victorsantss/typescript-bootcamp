import axios from "axios";

import addFilms from "./utils/addFilms";
import filterMoviesByIndicativeRating from "./utils/filterMoviesByIndicativeRating";
import IndicativeRating from "./enums/IndicativeRating";
import Movie from "./interfaces/Movie";
import orderByAverageRate from "./utils/orderByAverageRate";
import loadMovies from "./utils/loadMovies";

const movies: Movie[] = [
  {
    id: 1,
    name: "Spider Man",
    ratings: [1, 5, 3],
    indicativeRating: IndicativeRating.AL,
  },
  {
    id: 2,
    name: "Doctor Strange",
    ratings: [5, 5, 3],
    indicativeRating: IndicativeRating.A18,
  },
  {
    id: 3,
    name: "Avengers",
    ratings: [],
    indicativeRating: IndicativeRating.A12,
  },
];

const user: User = {
  name: "Victor Santos",
  age: 17,
  myList: [],
};

class User {
  name;
  age;
  myList;

  constructor(name: string, age: number, myList: Movie[]) {
    this.name = name;
    this.age = age;
    this.myList = myList;
  }
}

const orderedMovies = orderByAverageRate(movies);

const filteredMoviesByIndicativeRating = filterMoviesByIndicativeRating(
  orderedMovies,
  user
);

const newUserWithNewList = addFilms(user, movies, 3);

const request = axios({
  method: "get",
  url: "https://mcuapi.herokuapp.com/api/v1/movies?page=1&limit=100",
});

request.then((resultado) => {
  const { data } = resultado.data;
  console.log(loadMovies(data));
});
