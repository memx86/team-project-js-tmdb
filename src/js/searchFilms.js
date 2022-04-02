import { renderMarkup } from './templates/film_card';
import { api, pagination, moviesStorage, VIEWS } from './services';

const submitForm = document.querySelector('.search__form');
const info = document.querySelector('.gallery-info');
const gallery = document.querySelector('.gallery');
const categories = document.querySelector('.gallery-categories');
const loader = document.querySelector('.loader');
const ERROR_MESSAGE = 'Search is not successful. Enter the correct movie name.';
let canScroll = false;

const handleSearch = async page => {
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
    if (canScroll) gallery.scrollIntoView();
  } catch (error) {
    handleError(error);
  }
};

const handleSuccess = ({ results, total_pages: totalPages }) => {
  info.innerHTML = '';
  gallery.innerHTML = '';
  renderMarkup(results);
  moviesStorage.save(results);
  pagination.callback = handleSearch;
  pagination.page = api.page;
  pagination.totalPages = totalPages;
  loader.classList.add('is-hidden');
  pagination.showPagination();
};
const handleError = err => {
  gallery.innerHTML = '';
  pagination.hidePagination();
  loader.classList.add('is-hidden');
  info.innerHTML = ERROR_MESSAGE;
  VIEWS.CURRENT = VIEWS.HOME;
  if (err) {
    console.error(err);
  }
};
const searchFilms = async e => {
  e.preventDefault();
  canScroll = false;
  const query = e.target.elements.search.value.trim();
  if (!query) {
    return;
  }
  api.query = query;
  await handleSearch(1);
  canScroll = true;
  e.target.reset();
};
const search = () => {
  submitForm.addEventListener('submit', searchFilms);
};
export { handleSearch, search };
