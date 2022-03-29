import ApiTMDB from './apiTMDB';
import Storage from './storage';
import Pagination from './pagination';

const api = new ApiTMDB();
const genresStorage = new Storage(Storage.KEYS.GENRES);
const moviesStorage = new Storage(Storage.KEYS.MOVIES);
const queuedStorage = new Storage(Storage.KEYS.QUEUED);
const watchedStorage = new Storage(Storage.KEYS.WATCHED);
const themeStorage = new Storage(Storage.KEYS.THEME);
const pagination = new Pagination({});

export { Modal } from './modal';
export { getGenresNames } from './getGenresNames';
export {
  api,
  genresStorage,
  moviesStorage,
  queuedStorage,
  watchedStorage,
  themeStorage,
  pagination,
};
