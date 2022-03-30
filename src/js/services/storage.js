/** Ожидает при создании экземпляра строку с ключом локального хранилища.
 ** В статическом свойстве Storage.KEYS хранятся возможные ключи.
 ** .save(data) - сохранить данные в хранилище
 ** .get() - считать данные из хранилища
 ** .remove() - удалить запись из хранилища
 ** .saveMovie(movie) - сохранить один фильм (добавить в масиив)
 ** .deleteMovie(id) - удалить один фильм, по id (удалить из массива)
 ** .checkMovie(id) - проверить, есть ли фильм в хранилище, по id
 */
export default class Storage {
  static KEYS = {
    MOVIES: 'filmoteka/movies',
    WATCHED: 'filmoteka/watched',
    QUEUED: 'filmoteka/queued',
    GENRES: 'filmoteka/genres',
    THEME: 'filmoteka/theme',
  };
  constructor(key) {
    this.key = key;
  }
  save = data => {
    try {
      window.localStorage.setItem(this.key, JSON.stringify(data));
    } catch (error) {
      return null;
    }
  };
  get = () => {
    try {
      return JSON.parse(window.localStorage.getItem(this.key));
    } catch (error) {
      return null;
    }
  };
  remove = () => {
    try {
      return localStorage.removeItem(this.key);
    } catch (error) {
      return null;
    }
  };
  saveMovie = item => {
    const movies = this.get() || [];
    const updatedMovies = [item, ...movies];
    this.save(updatedMovies);
  };
  deleteMovie = id => {
    const movies = this.get();
    const updatedMovies = movies?.filter(movie => movie.id !== id);
    this.save(updatedMovies);
  };
  checkMovie = id => {
    const movies = this.get();
    const movie = movies?.find(movie => movie.id === id);
    return !!movie;
  };
}
