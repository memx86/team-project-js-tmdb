import { renderMarkup } from './templates/film_card';
import { api, pagination, ApiTMDB } from './services';

const refs = {
  gallery: document.querySelector('.gallery'),
  categories: document.querySelector('.gallery-categories'),
  loader: document.querySelector('.loader'),
};

refs.categories.addEventListener('click', onChangeCategory);

function onChangeCategory(e) {
  if (e.target === e.currentTarget) {
    return;
  }

  const newEndpoint = e.target.dataset.endpoint;
  if (ApiTMDB.ENDPOINTS[newEndpoint]) {
    api.endpoint = ApiTMDB.ENDPOINTS[newEndpoint];
  }
  resetView();
  getMovies();

  const activeBtn = e.currentTarget.querySelector('.btn--on');
  activeBtn?.classList.replace('btn--on', 'btn--off');
  e.target.classList.replace('btn--off', 'btn--on');
}
const resetView = () => {
  api.resetPage();
  refs.gallery.innerHTML = '';
};

async function getMovies() {
  try {
    const totalPages = await renderMovies();
    pagination.page = api.page;
    pagination.totalPages = totalPages;
    pagination.callback = moreMovies;
    pagination.showPagination();
  } catch (error) {
    console.log(error.message);
    refs.loader.classList.add('is-hidden');
  }
}

async function renderMovies() {
  refs.loader.classList.remove('is-hidden');
  const { results, total_pages: totalPages } = await api.getCategory();
  refs.gallery.innerHTML = ' ';
  refs.categories.classList.remove('is-hidden');
  renderMarkup(results);
  refs.loader.classList.add('is-hidden');
  return totalPages;
}

async function moreMovies() {
  try {
    api.page = pagination.page;
    await renderMovies();
    refs.gallery.scrollIntoView();
  } catch (error) {
    console.log(error);
  }
}

export default getMovies;
