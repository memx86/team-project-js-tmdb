import { watchedStorage, queuedStorage, pagination, VIEWS } from './services';
import { renderMarkup } from './templates/film_card';
import movies from './movies';
import { handleSearch } from './searchFilms';

const MARKER = {
  WATCHED: 'watched',
  QUEUE: 'queue',
};

const PER_PAGE = 18;
let page = 1;
let canScroll = false;
const refs = {
  logo: document.querySelector('.header__logo-link'),
  myLib: document.querySelector('[data-nav="myLibrary"]'),
  home: document.querySelector('[data-nav="home"]'),
  watchedBtn: document.querySelector('[data-btn="watched"]'),
  queueBtn: document.querySelector('[data-btn="queue"]'),
  libBtnsContainer: document.querySelector('.buttons__container--header'),
  searchForm: document.querySelector('.search__form'),
  info: document.querySelector('.gallery-info'),
  gallery: document.querySelector('.gallery'),
  categories: document.querySelector('.gallery-categories'),
  header: document.querySelector('.header'),
};

function onClickMyLibBtn() {
  if (refs.myLib.classList.contains('current')) {
    return;
  }
  changeLibClass('current');
  changeClassBtn('btn--on', 'btn--off');
  refs.libBtnsContainer.classList.remove('is-hidden');
  refs.searchForm.classList.add('is-hidden');
  refs.header.classList.add('myLib');
  page = 1;
  refs.categories.classList.add('is-hidden');
  canScroll = false;
  renderWatched();
  canScroll = true;
}

function addMarker(marker) {
  refs.gallery.classList.add(marker);
}
function removeMarker(marker) {
  refs.gallery.classList.remove(marker);
}

function renderWatched(newPage) {
  refs.gallery.innerHTML = '';
  const watched = watchedStorage.get() || [];
  removeMarker(MARKER.QUEUE);
  addMarker(MARKER.WATCHED);
  pagination.callback = renderWatched;
  const watchedPage = preparePage(watched, newPage);
  renderLibrary(watchedPage);
}

function renderQueue(newPage = 1) {
  refs.gallery.innerHTML = '';
  const queue = queuedStorage.get() || [];
  removeMarker(MARKER.WATCHED);
  addMarker(MARKER.QUEUE);
  pagination.callback = renderQueue;
  const queuePage = preparePage(queue, newPage);
  renderLibrary(queuePage);
}

function preparePage(data, newPage) {
  page = newPage ? newPage : page;
  const totalPages = Math.ceil(data.length / PER_PAGE);
  page = page > totalPages ? totalPages : page;
  pagination.page = page;
  pagination.totalPages = totalPages;
  const skip = (page - 1) * PER_PAGE;
  return data.slice(skip, PER_PAGE * page);
}

function renderLibrary(movies) {
  if (!movies || movies.length === 0) {
    refs.info.innerHTML = 'Please add something to library';
    pagination.hidePagination();
    return;
  }
  refs.info.innerHTML = '';
  renderMarkup(movies);
  pagination.showPagination();
  if (canScroll) {
    refs.gallery.scrollIntoView();
  }
}

function onClickMyHomeBtn(e) {
  const target = e.currentTarget;
  if (target.classList.contains('current')) {
    return;
  }
  removeMarker(MARKER.WATCHED);
  removeMarker(MARKER.QUEUE);
  if (!refs.home.classList.contains('current')) changeLibClass('current');
  refs.libBtnsContainer.classList.add('is-hidden');
  refs.searchForm.classList.remove('is-hidden');
  refs.searchForm.elements.search.value = '';
  refs.header.classList.remove('myLib');
  refs.info.innerHTML = '';
  refs.categories.classList.remove('is-hidden');
  if (target === refs.home) {
    goBack();
    return;
  }
  movies(1);
}

function goBack() {
  switch (VIEWS.CURRENT) {
    case VIEWS.HOME:
      movies();
      return;
    case VIEWS.SEARCH:
      handleSearch();
      return;
    default:
      return;
  }
}

function onClickMyWatchedBtn() {
  changeClassBtn('btn--on', 'btn--off');
  page = 1;
  canScroll = false;
  renderWatched();
  canScroll = true;
}

function onClickMyQueueBtn() {
  changeClassBtn('btn--off', 'btn--on');
  page = 1;
  canScroll = false;
  renderQueue();
  canScroll = true;
}

function changeClassBtn(add, remove) {
  refs.watchedBtn.classList.add(add);
  refs.watchedBtn.classList.remove(remove);
  refs.queueBtn.classList.add(remove);
  refs.queueBtn.classList.remove(add);
}

function changeLibClass(className) {
  refs.myLib.classList.toggle(className);
  refs.home.classList.toggle(className);
}

function myLibrary() {
  refs.logo.addEventListener('click', onClickMyHomeBtn);
  refs.myLib.addEventListener('click', onClickMyLibBtn);
  refs.home.addEventListener('click', onClickMyHomeBtn);
  refs.watchedBtn.addEventListener('click', onClickMyWatchedBtn);
  refs.queueBtn.addEventListener('click', onClickMyQueueBtn);
}

export { MARKER, myLibrary, renderWatched, renderQueue };
