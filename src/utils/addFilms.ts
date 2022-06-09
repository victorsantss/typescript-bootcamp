import Movie from "../interfaces/Movie";
import User from "../interfaces/User";

function addMovieToUserList(movie: Movie, user: User): void {
  user.myList = [...user.myList, movie];
}

function addFilms(user: User, movies: Movie[], ...ids: number[]): User {
  const newList: Movie[] = [];

  movies.forEach((movie) => {
    const isMovieInList = ids.includes(movie.id);
    if (isMovieInList) {
      addMovieToUserList(movie, user);
    }
    newList.push(movie);
  });

  return {
    ...user,
    myList: [...user.myList, ...newList],
  };
}

export default addFilms;
