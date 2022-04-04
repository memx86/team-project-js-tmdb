import { renderMarkup } from './templates/film_card';
import { api, pagination, VIEWS } from './services';
import movies from './movies';

const submitForm = document.querySelector('.search__form');
const info = document.querySelector('.gallery-info');
const gallery = document.querySelector('.gallery');
const categories = document.querySelector('.gallery-categories');
const loader = document.querySelector('.loader');
const ERROR_MESSAGE = 'search is not successful. Enter the correct movie name.';
let canScroll = false;
let timestamp = Date.now();

const searchFilms = async page => {
  VIEWS.CURRENT = VIEWS.SEARCH;
  if (page) {
    api.page = page;
  } else {
    canScroll = false;
  }
  loader.classList.remove('is-hidden');
  categories.classList.add('is-hidden');
  try {
    const data = await api.searchMovies();
    if (!data.results.length) {
      handleError();
      return;
    }
    handleSuccess(data);
    // submitForm.reset();
    if (canScroll) gallery.scrollIntoView();
    canScroll = true;
  } catch (error) {
    handleError(error);
  }
};

const handleSuccess = ({ results, total_pages: totalPages }) => {
  info.innerHTML = '';
  gallery.innerHTML = '';
  renderMarkup(results);
  pagination.callback = searchFilms;
  pagination.page = api.page;
  pagination.totalPages = totalPages;
  loader.classList.add('is-hidden');
  pagination.showPagination();
};
const handleError = err => {
  gallery.innerHTML = '';
  pagination.hidePagination();
  loader.classList.add('is-hidden');
  info.innerHTML = `${api.query} ${ERROR_MESSAGE}`;
  VIEWS.CURRENT = VIEWS.HOME;
  if (err) {
    console.error(err);
  }
};
const handleSearch = async e => {
  e.preventDefault();
  if (Date.now() - timestamp <= 1000) return;
  timestamp = Date.now();
  canScroll = false;
  const query = e.target.elements.search.value.trim();
  if (!query) {
    movies(1);
    return;
  }
  api.query = query;
  await searchFilms(1);
};
const search = () => {
  submitForm.addEventListener('submit', handleSearch);
};
export { searchFilms, search };
