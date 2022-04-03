import { renderMarkup } from './templates/film_card';
import { api, pagination, ApiTMDB, VIEWS } from './services';

const refs = {
  gallery: document.querySelector('.gallery'),
  info: document.querySelector('.gallery-info'),
  categories: document.querySelector('.gallery-categories'),
  loader: document.querySelector('.loader'),
  defaultBtn: document.querySelector('[data-endpoint="TRENDING"]'),
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
  resetPage();
  movies();
  toggleActiveBtn(e.target);
}

function resetPage() {
  api.resetPage();
  refs.gallery.innerHTML = '';
}
function toggleActiveBtn(target) {
  const activeBtn = refs.categories.querySelector('.btn--on');
  activeBtn?.classList.replace('btn--on', 'btn--off');
  target.classList.replace('btn--off', 'btn--on');
}

async function movies(page) {
  VIEWS.CURRENT = VIEWS.HOME;
  refs.info.innerHTML = '';
  if (page) {
    api.page = page;
    api.endpoint = ApiTMDB.ENDPOINTS.TRENDING;
    toggleActiveBtn(refs.defaultBtn);
  }
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

async function moreMovies(page) {
  try {
    api.page = page;
    await renderMovies();
    refs.gallery.scrollIntoView();
  } catch (error) {
    console.log(error);
  }
}

export default movies;
