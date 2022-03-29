import { renderMarkup } from './templates/film_card';
import { api, pagination, moviesStorage } from './services';

const submitForm = document.querySelector('.header-form');
const info = document.querySelector('.gallery-info');
const gallery = document.querySelector('.gallery');
const ERROR_MESSAGE = 'Search is not successful. Enter the correct movie name.';

const paginationCallback = page => {
  api.page = page;
  api.searchMovies().then(handleSuccess).catch(handleError);
};

const handleSuccess = ({ results, total_pages: totalPages }) => {
  info.innerHTML = '';
  gallery.innerHTML = '';
  renderMarkup(results);
  moviesStorage.save(results);
  pagination.callback = paginationCallback;
  pagination.page = api.page;
  pagination.totalPages = totalPages;
};
const handleError = err => {
  gallery.innerHTML = '';
  pagination.hidePagination();
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
