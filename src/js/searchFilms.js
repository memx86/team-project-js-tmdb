import { renderMarkup } from './templates/film_card';
import { api, pagination, moviesStorage } from './services';

const submitForm = document.querySelector('.header-form');
const info = document.querySelector('.gallery-info');
const gallery = document.querySelector('.gallery');
const categories = document.querySelector('.gallery-categories');
const loader = document.querySelector('.loader');
const ERROR_MESSAGE = 'Search is not successful. Enter the correct movie name.';

const paginationCallback = page => {
  api.page = page;
  loader.classList.remove('is-hidden');
  api
    .searchMovies()
    .then(data => {
      handleSuccess(data);
      gallery.scrollIntoView();
    })
    .catch(handleError);
};

const handleSuccess = ({ results, total_pages: totalPages }) => {
  info.innerHTML = '';
  gallery.innerHTML = '';
  renderMarkup(results);
  moviesStorage.save(results);
  pagination.callback = paginationCallback;
  pagination.page = api.page;
  pagination.totalPages = totalPages;
  loader.classList.add('is-hidden');
};
const handleError = err => {
  gallery.innerHTML = '';
  pagination.hidePagination();
  ``;
  loader.classList.add('is-hidden');
  if (err) {
    console.error(err);
    return;
  }
  info.innerHTML = ERROR_MESSAGE;
};
const searchFilms = async e => {
  e.preventDefault();
  const query = e.target.elements.search.value.trim();
  if (!query) {
    return;
  }
  api.page = 1;
  api.query = query;
  try {
    categories.classList.add('is-hidden');
    loader.classList.remove('is-hidden');
    const data = await api.searchMovies();
    if (!data.results.length) {
      handleError();
      return;
    }
    handleSuccess(data);
    pagination.showPagination();
    e.target.reset();
  } catch (error) {
    handleError(error);
  }
};
const search = () => {
  submitForm.addEventListener('submit', searchFilms);
};
export default search;
