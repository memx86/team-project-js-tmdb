import genres from './genres';
import handleTheme from './theme';
import popularMovies from './popular_movies';
import search from './searchFilms';
import filmModal from './film-modal';
import { myLibrary } from './my_library';
import addUpBtn from './up-btn';
import { Modal } from './services/modal';

export default async function app() {
  handleTheme();
  await genres();
  await popularMovies();
  search();
  filmModal();
  myLibrary();
  addUpBtn();
  new Modal('team');
}
