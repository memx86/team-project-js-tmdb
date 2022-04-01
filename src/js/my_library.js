import { watchedStorage, queuedStorage, pagination } from './services';
import { renderMarkup } from './templates/film_card';
import popularMovies from './popular_movies';

const MARKER = {
  WATCHED: 'watched',
  QUEUE: 'queue',
};
const PER_PAGE = 18;
let page = 1;
let canScroll = false;
const refs = {
  myLibBtn: document.querySelector('[data-btn="myLibrary"]'),
  myLibA: document.querySelector('[data-a="myLibrary"]'),
  homeBtn: document.querySelector('[data-btn="home"]'),
  homeA: document.querySelector('[data-a="home"]'),
  watchedBtn: document.querySelector('[data-btn="watched"]'),
  queueBtn: document.querySelector('[data-btn="queue"]'),
  libBtnsContainer: document.querySelector('.buttons__container--header'),
  inputForm: document.querySelector('.header-form'),
  info: document.querySelector('.gallery-info'),
  gallery: document.querySelector('.gallery'),
  header: document.querySelector('.header'),
};

function onClickMyLibBtn() {
  if (refs.myLibA.classList.contains('current')) {
    return;
  }
  changeClassA('current');
  changeClassBtn('btn--on', 'btn--off');
  refs.libBtnsContainer.classList.remove('is-hidden');
  refs.inputForm.classList.add('is-hidden');
  refs.header.classList.add('myLib');
  page = 1;
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
  console.log(canScroll);
  if (canScroll) {
    refs.gallery.scrollIntoView();
  }
}

function onClickMyHomeBtn() {
  if (refs.homeA.classList.contains('current')) {
    return;
  }
  removeMarker(MARKER.WATCHED);
  removeMarker(MARKER.QUEUE);
  changeClassA('current');
  refs.libBtnsContainer.classList.add('is-hidden');
  refs.inputForm.classList.remove('is-hidden');
  refs.header.classList.remove('myLib');
  refs.info.innerHTML = '';
  popularMovies();
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

function changeClassA(classA) {
  refs.myLibA.classList.toggle(classA);
  refs.homeA.classList.toggle(classA);
}

function myLibrary() {
  refs.myLibBtn.addEventListener('click', onClickMyLibBtn);
  refs.homeBtn.addEventListener('click', onClickMyHomeBtn);
  refs.watchedBtn.addEventListener('click', onClickMyWatchedBtn);
  refs.queueBtn.addEventListener('click', onClickMyQueueBtn);
}

export { MARKER, myLibrary, renderWatched, renderQueue };
