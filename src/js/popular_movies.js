import { renderMarkup } from './templates/film_card';
import { api, pagination } from './services';

const refs = {
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
};

async function popularMovies() {
  try {
    const totalPages = await renderMovies();
    pagination.page = api.page;
    pagination.totalPages = totalPages;
    pagination.callback = moreMovies;
    pagination.showPagination();
  } catch (error) {
    console.log(error);
  }
}

async function renderMovies() {
  refs.loader.classList.remove('is-hidden');
  const { results, total_pages: totalPages } = await api.getTrending();
  refs.gallery.innerHTML = ' ';
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

export default popularMovies;
