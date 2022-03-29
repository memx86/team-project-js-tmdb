import sprite from '../images/sprite.svg';

const refs = {
  header: document.querySelector('#header'),
  footer: document.querySelector('#footer'),
};

const BTN = {
  UP: 'up',
  DOWN: 'down',
  CLASS: 'btn-up',
};

const observer = new IntersectionObserver(handleObserve, { threshold: 0 });

function createBtn(direction) {
  const btn = document.createElement('a');
  const href = direction === BTN.UP ? '#header' : '#footer';
  btn.setAttribute('href', href);
  btn.setAttribute('aria-label', `Scroll page ${direction}`);
  btn.classList.add(`${BTN.CLASS}__btn`, 'is-hidden');
  btn.innerHTML = `
    <svg class="${BTN.CLASS}__svg" width="32" height="32">
      <use href="${sprite}#icon-circle-${direction}"></use>
    </svg>
  `;
  return btn;
}

function renderBtns() {
  refs.upBtn = createBtn(BTN.UP);
  refs.downBtn = createBtn(BTN.DOWN);
  const container = document.createElement('div');
  container.classList.add(BTN.CLASS);
  container.appendChild(refs.upBtn);
  container.appendChild(refs.downBtn);
  document.querySelector('main').appendChild(container);
}

function hideBtn(target) {
  if (target === refs.header) {
    refs.upBtn.classList.add('is-hidden');
  } else {
    refs.downBtn.classList.add('is-hidden');
  }
}
function showBtn(target) {
  if (target === refs.header) {
    refs.upBtn.classList.remove('is-hidden');
  } else {
    refs.downBtn.classList.remove('is-hidden');
  }
}

function handleObserve(entries) {
  entries.forEach(({ isIntersecting, target }) => {
    if (isIntersecting) {
      hideBtn(target);
    } else {
      showBtn(target);
    }
  });
}

function addUpBtn() {
  renderBtns();
  observer.observe(refs.header);
  observer.observe(refs.footer);
}

export default addUpBtn;
